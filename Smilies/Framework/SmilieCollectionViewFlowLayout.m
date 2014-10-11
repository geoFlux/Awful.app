//  SmilieCollectionViewFlowLayout.m
//
//  Copyright 2014 Awful Contributors. CC BY-NC-SA 3.0 US https://github.com/Awful/Awful.app

#import "SmilieCollectionViewFlowLayout.h"

@interface SmilieCollectionViewFlowLayout () <UIGestureRecognizerDelegate>

@property (strong, nonatomic) UILongPressGestureRecognizer *longPressGestureRecognizer;
@property (strong, nonatomic) UIPanGestureRecognizer *panGestureRecognizer;

@property (strong, nonatomic) NSIndexPath *draggedItemIndexPath;
@property (strong, nonatomic) UIView *dragView;
@property (assign, nonatomic) CGPoint initialDragViewCenter;

@end

@implementation SmilieCollectionViewFlowLayout

#pragma mark - Configuration

- (void)configureCollectionView
{
    for (UIGestureRecognizer *recognizer in self.collectionView.gestureRecognizers) {
        if ([recognizer isKindOfClass:[UILongPressGestureRecognizer class]]) {
            [recognizer requireGestureRecognizerToFail:self.longPressGestureRecognizer];
        }
        if ([recognizer isKindOfClass:[UIPanGestureRecognizer class]]) {
            [recognizer requireGestureRecognizerToFail:self.panGestureRecognizer];
        }
    }
    
    [self.collectionView addGestureRecognizer:self.longPressGestureRecognizer];
    [self.collectionView addGestureRecognizer:self.panGestureRecognizer];
}

- (void)setDragReorderingEnabled:(BOOL)dragReorderingEnabled
{
    _dragReorderingEnabled = dragReorderingEnabled;
    _longPressGestureRecognizer.enabled = dragReorderingEnabled;
    _panGestureRecognizer.enabled = dragReorderingEnabled;
}

#pragma mark - Dragging

- (void)startDraggingCell:(UICollectionViewCell *)cell fromIndexPath:(NSIndexPath *)indexPath
{
    self.draggedItemIndexPath = indexPath;
    
    BOOL wasHighlighted = cell.highlighted;
    cell.highlighted = YES;
    UIView *highlightedSnapshot = [cell snapshotViewAfterScreenUpdates:YES];
    cell.highlighted = NO;
    UIView *normalSnapshot = [cell snapshotViewAfterScreenUpdates:YES];
    cell.highlighted = wasHighlighted;
    
    self.dragView = [[UIView alloc] initWithFrame:cell.frame];
    highlightedSnapshot.frame = (CGRect){.size = cell.frame.size};
    [self.dragView addSubview:highlightedSnapshot];
    normalSnapshot.frame = highlightedSnapshot.frame;
    [self.dragView addSubview:normalSnapshot];
    self.initialDragViewCenter = self.dragView.center;
    [self.collectionView addSubview:self.dragView];
    
    normalSnapshot.alpha = 0;
    [UIView animateWithDuration:0.3 delay:0 usingSpringWithDamping:1 initialSpringVelocity:0 options:UIViewAnimationOptionBeginFromCurrentState animations:^{
        self.dragView.transform = CGAffineTransformMakeScale(1.1, 1.1);
        highlightedSnapshot.alpha = 0;
        normalSnapshot.alpha = 1;
    } completion:^(BOOL completed) {
        [highlightedSnapshot removeFromSuperview];
    }];
    
    [self invalidateLayout];
}

- (void)moveDraggedItemIfNecessary
{
    NSIndexPath *oldIndexPath = self.draggedItemIndexPath;
    NSIndexPath *newIndexPath = [self.collectionView indexPathForItemAtPoint:self.dragView.center];
    if (!newIndexPath || [newIndexPath isEqual:oldIndexPath]) return;
    
    self.draggedItemIndexPath = newIndexPath;
    
    id<SmilieCollectionViewFlowLayoutDataSource> dataSource = (id<SmilieCollectionViewFlowLayoutDataSource>)self.collectionView.dataSource;
    if ([dataSource respondsToSelector:@selector(collectionView:moveItemAtIndexPath:toIndexPath:)]) {
        [dataSource collectionView:self.collectionView moveItemAtIndexPath:oldIndexPath toIndexPath:newIndexPath];
    }
    
    [self.collectionView performBatchUpdates:^{
        [self.collectionView deleteItemsAtIndexPaths:@[oldIndexPath]];
        [self.collectionView insertItemsAtIndexPaths:@[newIndexPath]];
    } completion:nil];
}

- (void)endDragging
{
    NSIndexPath *indexPath = self.draggedItemIndexPath;
    self.draggedItemIndexPath = nil;
    self.initialDragViewCenter = CGPointZero;
    
    UICollectionViewLayoutAttributes *attributes = [self layoutAttributesForItemAtIndexPath:indexPath];
    [UIView animateWithDuration:0.3 delay:0 usingSpringWithDamping:1 initialSpringVelocity:0 options:UIViewAnimationOptionBeginFromCurrentState animations:^{
        self.dragView.center = attributes.center;
        self.dragView.transform = CGAffineTransformIdentity;
    } completion:^(BOOL finished) {
        [self.dragView removeFromSuperview];
        self.dragView = nil;
        
        [self invalidateLayout];
        
        id<SmilieCollectionViewFlowLayoutDataSource> dataSource = (id<SmilieCollectionViewFlowLayoutDataSource>)self.collectionView.dataSource;
        if ([dataSource respondsToSelector:@selector(collectionView:didFinishDraggingItemToIndexPath:)]) {
            [dataSource collectionView:self.collectionView didFinishDraggingItemToIndexPath:indexPath];
        }
    }];
}

#pragma mark - Hide the cell being dragged

- (void)adjustCellLayoutAttributes:(UICollectionViewLayoutAttributes *)attributes
{
    if ([attributes.indexPath isEqual:self.draggedItemIndexPath]) {
        attributes.hidden = YES;
    }
}

#pragma mark - Internals

- (instancetype)init
{
    if ((self = [super init])) {
        CommonInit(self);
    }
    return self;
}

- (id)initWithCoder:(NSCoder *)coder
{
    if ((self = [super initWithCoder:coder])) {
        CommonInit(self);
    }
    return self;
}

static void CommonInit(SmilieCollectionViewFlowLayout *self)
{
    [self addObserver:self forKeyPath:@"collectionView" options:NSKeyValueObservingOptionOld context:KVOContext];
}

- (void)dealloc
{
    [self removeObserver:self forKeyPath:@"collectionView" context:KVOContext];
}

static void * KVOContext = &KVOContext;

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if (context == KVOContext) {
        UICollectionView *oldCollectionView = change[NSKeyValueChangeOldKey];
        if (![oldCollectionView isEqual:[NSNull null]]) {
            [oldCollectionView removeGestureRecognizer:self.longPressGestureRecognizer];
            [oldCollectionView removeGestureRecognizer:self.panGestureRecognizer];
        }
        [self configureCollectionView];
    } else {
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    }
}

- (UILongPressGestureRecognizer *)longPressGestureRecognizer
{
    if (!_longPressGestureRecognizer) {
        _longPressGestureRecognizer = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(didLongPress:)];
        _longPressGestureRecognizer.delegate = self;
        _longPressGestureRecognizer.enabled = self.dragReorderingEnabled;
    }
    return _longPressGestureRecognizer;
}

- (UIPanGestureRecognizer *)panGestureRecognizer
{
    if (!_panGestureRecognizer) {
        _panGestureRecognizer = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(didPan:)];
        _panGestureRecognizer.delegate = self;
        _panGestureRecognizer.enabled = self.dragReorderingEnabled;
    }
    return _panGestureRecognizer;
}

- (void)didLongPress:(UILongPressGestureRecognizer *)sender
{
    switch (sender.state) {
        case UIGestureRecognizerStateBegan: {
            CGPoint pressedPoint = [sender locationInView:self.collectionView];
            NSIndexPath *indexPath = [self.collectionView indexPathForItemAtPoint:pressedPoint];
            if (!indexPath) break;
            UICollectionViewCell *cell = [self.collectionView cellForItemAtIndexPath:indexPath];
            if (cell) {
                [self startDraggingCell:cell fromIndexPath:indexPath];
            }
            break;
        }
            
        case UIGestureRecognizerStateCancelled:
        case UIGestureRecognizerStateEnded: {
            [self endDragging];
            break;
        }
            
        default: break;
    }
}

- (void)didPan:(UIPanGestureRecognizer *)sender
{
    switch (sender.state) {
        case UIGestureRecognizerStateBegan:
        case UIGestureRecognizerStateChanged: {
            CGPoint translation = [sender translationInView:self.collectionView];
            self.dragView.center = CGPointMake(self.initialDragViewCenter.x + translation.x, self.initialDragViewCenter.y + translation.y);
            [self moveDraggedItemIfNecessary];
            break;
        }
            
        default: break;
    }
}

#pragma mark - UICollectionViewLayout

- (NSArray *)layoutAttributesForElementsInRect:(CGRect)rect
{
    NSArray *layoutAttributes = [super layoutAttributesForElementsInRect:rect];
    for (UICollectionViewLayoutAttributes *attributes in layoutAttributes) {
        if (attributes.representedElementCategory == UICollectionElementCategoryCell) {
            [self adjustCellLayoutAttributes:attributes];
        }
    }
    return layoutAttributes;
}

- (UICollectionViewLayoutAttributes *)layoutAttributesForItemAtIndexPath:(NSIndexPath *)indexPath
{
    UICollectionViewLayoutAttributes *attributes = [super layoutAttributesForItemAtIndexPath:indexPath];
    [self adjustCellLayoutAttributes:attributes];
    return attributes;
}

#pragma mark - UIGestureRecognizerDelegate

- (BOOL)gestureRecognizerShouldBegin:(UIGestureRecognizer *)gestureRecognizer
{
    if ([gestureRecognizer isEqual:self.panGestureRecognizer]) {
        return self.draggedItemIndexPath != nil;
    } else {
        return YES;
    }
}

- (BOOL)gestureRecognizer:(UIGestureRecognizer *)gestureRecognizer shouldRecognizeSimultaneouslyWithGestureRecognizer:(UIGestureRecognizer *)otherGestureRecognizer
{
    if ([gestureRecognizer isEqual:self.longPressGestureRecognizer]) {
        return [otherGestureRecognizer isEqual:self.panGestureRecognizer];
    } else if ([gestureRecognizer isEqual:self.panGestureRecognizer]) {
        return [otherGestureRecognizer isEqual:self.longPressGestureRecognizer];
    } else {
        return NO;
    }
}

@end
