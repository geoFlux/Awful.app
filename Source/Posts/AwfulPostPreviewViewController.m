//  AwfulPostPreviewViewController.m
//
//  Copyright 2014 Awful Contributors. CC BY-NC-SA 3.0 US https://github.com/Awful/Awful.app

#import "AwfulPostPreviewViewController.h"
#import "AwfulAlertView.h"
#import "AwfulComposeTextView.h"
#import "AwfulForumsClient.h"
#import "AwfulImageURLProtocol.h"
#import "AwfulLoadingView.h"
#import "AwfulPostViewModel.h"
#import "AwfulSettings.h"
#import "AwfulTextAttachment.h"
#import "AwfulUIKitAndFoundationCategories.h"
#import <GRMustache/GRMustache.h>

@interface AwfulPostPreviewViewController () <UIWebViewDelegate>

@property (strong, nonatomic) UIBarButtonItem *postButtonItem;

@property (copy, nonatomic) NSString *previewHTML;

@property (readonly, strong, nonatomic) UIWebView *webView;
@property (strong, nonatomic) AwfulLoadingView *loadingView;

@property (weak, nonatomic) NSOperation *networkOperation;

@property (strong, nonatomic) AwfulPost *fakePost;
@property (strong, nonatomic) NSManagedObjectContext *managedObjectContext;

@property (copy, nonatomic) NSArray *imageURLs;

@end

@implementation AwfulPostPreviewViewController
{
    BOOL _webViewDidLoadOnce;
}

- (void)dealloc
{
    for (NSURL *URL in _imageURLs) {
        [AwfulImageURLProtocol stopServingImageAtURL:URL];
    }
}

- (id)initWithPost:(AwfulPost *)post BBcode:(NSAttributedString *)BBcode
{
    if ((self = [super initWithNibName:nil bundle:nil])) {
        _editingPost = post;
        _BBcode = [BBcode copy];
        CommonInit(self);
        self.postButtonItem.title = @"Save";
    }
    return self;
}

- (id)initWithThread:(AwfulThread *)thread BBcode:(NSAttributedString *)BBcode
{
    if ((self = [super initWithNibName:nil bundle:nil])) {
        _thread = thread;
        _BBcode = [BBcode copy];
        CommonInit(self);
    }
    return self;
}

static void CommonInit(AwfulPostPreviewViewController *self)
{
    self.title = @"Post Preview";
    self.navigationItem.rightBarButtonItem = self.postButtonItem;
    self.navigationItem.backBarButtonItem = [UIBarButtonItem awful_emptyBackBarButtonItem];
}

- (UIBarButtonItem *)postButtonItem
{
    if (_postButtonItem) return _postButtonItem;
    _postButtonItem = [[UIBarButtonItem alloc] initWithTitle:@"Post" style:UIBarButtonItemStylePlain target:nil action:nil];
    __weak __typeof__(self) weakSelf = self;
    _postButtonItem.awful_actionBlock = ^(UIBarButtonItem *item) {
        __typeof__(self) self = weakSelf;
        self.submitBlock();
    };
    return _postButtonItem;
}

- (UIWebView *)webView
{
    return (UIWebView *)self.view;
}

- (void)loadView
{
    UIWebView *webView = [UIWebView awful_nativeFeelingWebView];
    webView.delegate = self;
    self.view = webView;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    [self renderPreview];
}

- (AwfulTheme *)theme
{
    AwfulThread *thread = self.thread ?: self.editingPost.thread;
    return [AwfulTheme currentThemeForForum:thread.forum];
}

- (void)themeDidChange
{
    [super themeDidChange];
    
    AwfulTheme *theme = self.theme;
    self.view.backgroundColor = theme[@"backgroundColor"];
    self.webView.scrollView.indicatorStyle = theme.scrollIndicatorStyle;
    
    [self renderPreview];
}

- (void)renderPreview
{
    _webViewDidLoadOnce = NO;
    if (self.previewHTML) {
        [self render:self.previewHTML];
    } else if (!self.networkOperation) {
        __weak __typeof__(self) weakSelf = self;
        void (^callback)() = ^(NSError *error, NSString *postHTML) {
            __typeof__(self) self = weakSelf;
            if (error) {
                [AwfulAlertView showWithTitle:@"Network Error" error:error buttonTitle:@"OK"];
            } else {
                self.previewHTML = postHTML;
                [self render:postHTML];
            }
        };
        self.loadingView = [AwfulLoadingView loadingViewForTheme:self.theme];
        [self.view addSubview:self.loadingView];
        
        // Serve image attachments so the UIWebView can handle it.
        NSString *basePath = [[NSUUID UUID] UUIDString];
        NSMutableArray *imageURLs = [NSMutableArray new];
        NSMutableAttributedString *BBcode = [self.BBcode mutableCopy];
        [BBcode enumerateAttribute:NSAttachmentAttributeName
                           inRange:NSMakeRange(0, BBcode.length)
                           options:NSAttributedStringEnumerationLongestEffectiveRangeNotRequired
                        usingBlock:^(NSTextAttachment *attachment, NSRange range, BOOL *stop)
        {
            if (!attachment) return;
            
            NSString *t = @"";
            CGSize imageSize = attachment.image.size;
            if (imageSize.width > RequiresThumbnailImageSize.width || imageSize.height > RequiresThumbnailImageSize.height) {
                t = @"t";
            }
            
            UIImage *image = attachment.image;
            if ([attachment isKindOfClass:[AwfulTextAttachment class]]) {
                image = ((AwfulTextAttachment *)attachment).thumbnailImage;
            }
            NSURL *imageURL = [AwfulImageURLProtocol serveImage:image atPath:[basePath stringByAppendingPathComponent:@(imageURLs.count).stringValue]];
            [imageURLs addObject:imageURL];
            
            // SA: The [img] BBcode seemingly only matches if the URL starts with "http[s]://" or it refuses to actually turn it into an <img> element, so we'll prefix it with http:// and then remove that later.
            NSString *replacement = [NSString stringWithFormat:@"[%@img]http://%@[/%@img]", t, imageURL.absoluteString, t];
            [BBcode replaceCharactersInRange:range withString:replacement];
        }];
        self.imageURLs = imageURLs;
        
        if (self.editingPost) {
            self.networkOperation = [[AwfulForumsClient client] previewEditToPost:self.editingPost withBBcode:BBcode.string andThen:callback];
        } else {
            self.networkOperation = [[AwfulForumsClient client] previewReplyToThread:self.thread withBBcode:BBcode.string andThen:callback];
        }
    }
}

- (void)render:(NSString *)postHTML
{
    NSMutableDictionary *context = [NSMutableDictionary new];
    context[@"userInterfaceIdiom"] = UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad ? @"ipad" : @"iphone";
    context[@"stylesheet"] = self.theme[@"postsViewCSS"];
    context[@"post"] = [[AwfulPostViewModel alloc] initWithPost:self.fakePost];
    int fontScalePercentage = [AwfulSettings settings].fontScale;
    if (fontScalePercentage != 100) {
        context[@"fontScalePercentage"] = @(fontScalePercentage);
    }
    
    NSError *error;
    NSString *HTML = [GRMustacheTemplate renderObject:context fromResource:@"PostPreview" bundle:nil error:&error];
    if (!HTML) {
        NSLog(@"%s error loading post preview HTML: %@", __PRETTY_FUNCTION__, error);
    }
    [self.webView loadHTMLString:HTML baseURL:[AwfulForumsClient client].baseURL];
}

- (AwfulPost *)fakePost
{
    if (!_fakePost) {
        _fakePost = [AwfulPost insertInManagedObjectContext:self.managedObjectContext];
        AwfulUser *loggedInUser = [AwfulUser firstOrNewUserWithUserID:[AwfulSettings settings].userID
                                                             username:[AwfulSettings settings].username
                                               inManagedObjectContext:self.managedObjectContext];
        if (self.editingPost) {
            
            // Create a copy of the post we're editing. We'll later change the properties we care about previewing.
            for (NSPropertyDescription *property in self.editingPost.entity) {
                if ([property isKindOfClass:[NSAttributeDescription class]]) {
                    id actualValue = [self.editingPost valueForKey:property.name];
                    [_fakePost setValue:actualValue forKey:property.name];
                } else if ([property isKindOfClass:[NSRelationshipDescription class]]) {
                    NSManagedObject *actualValue = [self.editingPost valueForKey:property.name];
                    if ([[NSNull null] isEqual:actualValue]) continue;
                    NSManagedObjectID *objectID = actualValue.objectID;
                    if (objectID) {
                        [_fakePost setValue:[self.managedObjectContext objectWithID:objectID] forKey:property.name];
                    }
                }
            }
            
            _fakePost.editor = loggedInUser;
        } else {
            _fakePost.postDate = [NSDate date];
            _fakePost.author = loggedInUser;
        }
    }
    _fakePost.innerHTML = self.previewHTML;
    return _fakePost;
}

- (NSManagedObjectContext *)managedObjectContext
{
    if (_managedObjectContext) return _managedObjectContext;
    _managedObjectContext = [[NSManagedObjectContext alloc] initWithConcurrencyType:NSMainQueueConcurrencyType];
    _managedObjectContext.parentContext = self.editingPost.managedObjectContext ?: self.thread.managedObjectContext;
    return _managedObjectContext;
}

#pragma mark - UIWebViewDelegate

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
    // YouTube embeds can take over the frame when someone taps the video title. Here we try to detect that and treat it as if a link was tapped.
    if (navigationType != UIWebViewNavigationTypeLinkClicked && [request.URL.host.lowercaseString hasSuffix:@"www.youtube.com"] && [request.URL.path.lowercaseString hasPrefix:@"/watch"]) {
        navigationType = UIWebViewNavigationTypeLinkClicked;
    }
    
    return navigationType != UIWebViewNavigationTypeLinkClicked;
}

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
    if (!_webViewDidLoadOnce) {
        _webViewDidLoadOnce = YES;
        [self.loadingView removeFromSuperview];
        self.loadingView = nil;
    }
}

@end