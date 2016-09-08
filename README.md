Awful
=====

[Awful][App Store] is an iOS 9 app that's *Better Than Safari* for browsing the [Something Awful Forums][forums]. Its story is told in [its thread][current thread] (and [its older thread][second thread] (and [its first thread][first thread])).

Development talk usually ends up in the [project.log][] thread, but we're not fussy. There's also a [todo list](TODO.taskpaper).

<p align="center">
  <img src="Screenshots/iPhone 4.7in retina.png" width="375" height="667" alt="Screenshot of Awful as it appears on an iPhone">
</p>

[App Store]: https://itunes.apple.com/app/awful-unofficial-something/id567936609
[forums]: http://forums.somethingawful.com
[current thread]: http://forums.somethingawful.com/showthread.php?threadid=3510131
[second thread]: http://forums.somethingawful.com/showthread.php?threadid=3381510
[first thread]: http://forums.somethingawful.com/showthread.php?threadid=3483760
[project.log]: http://forums.somethingawful.com/showthread.php?threadid=3564303

An unofficial app
-----------------

This app is not endorsed by Something Awful.

Build
-----

1. Clone the repository: `git clone --recursive https://github.com/Awful/Awful.app Awful-app`
2. Open Xcode project and build away: `open Awful-app/Awful.xcworkspace`

There are no *required* dependencies for building Awful; all third-party libraries are included, and files generated by other utilities are included in the repository. The only submodule is the [thread-tags][] repository, which is not strictly needed for building; if you don't need it, you can leave off the `--recursive` part from step one.

There are *optional* dependencies for building Awful. You only need them if you're working on the relevant part of the app.

* [CocoaPods][] manages dependencies. If you're updating, adding, or removing a dependency, please [install CocoaPods][CocoaPods].
    * **Even if you add a dependency directly to the Xcode project**, please update `Source/Settings/Acknowledgements.mustache` with the name and license of the dependency. We do not use the CocoaPods-generated acknowledgements.
* [LESS][] helps us write CSS. If you're modifying the themes for displaying posts (these are files like `posts-view*.less`), please [install LESS][LESS]:
    1. [Install homebrew](http://mxcl.github.com/homebrew/).
    2. Open Terminal and install node: `brew install node` (prepend `sudo` to avoid permissions errors).
    3. In Terminal, install less: `npm install less -g` (prepend `sudo` to avoid permissions errors).
    4. Now build the Xcode project and the CSS files will be regenerated.

Awful uses an App Group to communicate and share data with the Smilie Keyboard. Unfortunately, App Group identifiers must be unique, so I can't simply set it up and have everything work. By default, Awful builds without an App Group configured, which means that the Smilie Keyboard won't be able to download new smilies, remember recent smilies, or store favourite smilies. If you like, you can create an App Group in your iOS Developer account, then simply place the identifier in a file called `app-group` in the root of the repository. After a build and run, full keyboard functionality should be yours.

There are unit tests for the HTML scraping, to help us find problems when markup changes, running continuously via [Travis CI][].

[![Build Status](https://travis-ci.org/Awful/Awful.app.png)](https://travis-ci.org/Awful/Awful.app)

[CocoaPods]: http://cocoapods.org/
[HTMLReader]: https://github.com/nolanw/HTMLReader
[LESS]: http://lesscss.org/#usage
[thread-tags]: https://github.com/Awful/thread-tags
[Travis CI]: https://travis-ci.org/Awful/Awful.app

Contribute
----------

You can help! Head over to [Awful's thread][current thread] and tell us about any issues you're having. Send in some lovingly crafted [thread tags][]. Or [fork the code][fork] and send [pull requests][]. Once a pull request is accepted, you get the commit bit!

If you're curious about anything at all, stop by the [thread][current thread] and say hi.

[thread tags]: https://github.com/Awful/thread-tags#readme
[fork]: https://github.com/Awful/Awful.app/fork_select
[pull requests]: https://github.com/Awful/Awful.app/pulls

Project Structure
-----------------

Awful is broken down somewhat:

* `Awful` is the iOS app.
* `AwfulCore` is a framework that does the scraping and networking with the Forums. It's meant to be compatible with both iOS and OS X, but nobody's actually tried on OS X.
* `Smilies` is a framework that downloads smilies and presents them as a keyboard. It's meant to be compatible with both iOS and OS X, but nobody's actually tried on OS X.

Data Flow
---------

The [HTTP client][] connects to the Something Awful Forums and parses its contents, saving those contents as [entities in a Core Data store][entities]. Various screens show the [forums][], [threads][], [posts][], [private messages][], and [users][] saved to the Core Data store.

Awful's Core Data store is a cache of content from the Forums. Any user info specific to the app is stored in [user defaults][]. The Core Data store may be (and can be, since it's stored in the application's Caches directory) deleted at any time.

[HTTP client]: Core/Networking/AwfulForumsClient.h
[entities]: Core/Models
[forums]: Source/Forums
[threads]: Source/Threads
[posts]: Source/Posts
[private messages]: Source/Private%20Messages
[users]: Source/Users
[user defaults]: Source/Settings/AwfulSettings.h

Theming
-------

Awful's [posts view][] is fully customizable using CSS. There's a [default theme][], as well as themes for specific forums such as [YOSPOS][YOSPOS CSS theme] and [FYAD][FYAD CSS theme]. Internally, we use LESS to generate our CSS, so if you are editing built-in themes please edit the `.less` files. (LESS installation instructions are above.) Then commit both the modified `.less` files and any resulting changes to `.css` files, so others don't need LESS to build Awful.

The rest of Awful is themed in a a [big plist][theme plist]. If you can't find a theme key you'd like to use, ask and we'll add it!

[posts view]: App/Posts/AwfulPostsView.h
[default theme]: App/Theming/posts-view.css
[YOSPOS CSS theme]: App/Theming/posts-view-219.less
[FYAD CSS theme]: App/Theming/posts-view-26.less
[AwfulTheme]: App/Theming/AwfulTheme.h
[theme plist]: App/Theming/Themes.plist

Thread Tags
-----------

[Diabolik900][] and [The Dave][] have fashioned Awful with its own [set of thread tags][thread tags] that look great on the iPhone and the iPad. They're distributed with the app. New thread tags can also [appear in Awful][AwfulThreadTags] without us having to send an update through the App Store. This is done by hosting the icons via [GitHub Pages][awfulapp.com.git].

To add a new thread tag you just made:

1. Add it to the [thread tags repository][Thread Tags.git] and push.
2. Update the [awfulapp.com repository][awfulapp.com.git] repository per [its README][awfulapp.com.git README].
3. In this (Awful.app) repository, update the `Resources/Thread Tags` submodule and push:
    
    ```bash
    cd path/to/awful-app/repo
    cd Resources/Thread\ Tags
    git pull origin master
    cd ..
    git commit -am "Updated thread tags."
    git push
    ```

[AwfulThreadTags]: Source/Networking/AwfulThreadTags.m
[awfulapp.com.git]: https://github.com/Awful/awful.github.io
[awfulapp.com.git README]: https://github.com/Awful/awful.github.io/blob/master/README.md#thread-tags
[Thread Tags.git]: https://github.com/Awful/thread-tags

Assembling the AwfulPostsView
-----------------------------

The posts view uses [zepto.js][]. Awful uses the *Touch* module which is not part of a standard build, so a custom build is required. (It also uses the *Core*, *Event*, and *Ajax* modules.)

[zepto.js]: http://zeptojs.com/

URL schemes
-----------

Awful answers to a couple URL schemes:

* `awful:` opens Awful directly to various screens. This URL scheme is documented at http://handleopenurl.com and at [Launch Center Pro](http://actions.contrast.co).
    * `awful://forums` opens the Forums tab.
    * `awful://forums/:forumid` opens the Forums tab to the identified forum.
    * `awful://threads/:threadid` opens the first page of the identified thread. For example, `awful://threads/3510131` opens Awful's thread.
    * `awful://threads/:threadid/pages/:page` opens the given page of the identified thread. For example, `awful://threads/3510131/pages/15` opens the fifteenth page of Awful's thread.
    * `awful://posts/:postid` opens the identified post's page of its thread and jumps to it. For example, `awful://posts/408179339` opens the OP of Awful's thread.
    * `awful://bookmarks` opens the Bookmarks tab.
    * `awful://messages` opens the Messages tab.
    * `awful://messages/:messageid` opens the identified private message. (I guess the idea is to handle a link from one message to another? )
    * `awful://settings` opens the Settings tab.
    * `awful://users/:userid` opens the identified user's profile. For example, `awful://users/106125` opens pokeyman's profile.
    * `awful://banlist` opens the Leper's Colony.
    * `awful://banlist/:userid` opens the identified user's rap sheet. For example, `awful://banlist/106125` opens pokeyman's rap sheet.
* `awfulhttp:` and `awfulhttps:` handle Forums website URLs to any screens that have a corresponding `awful:` URL described above.
    * The idea is you take your `https://forums.somethingawful.com/…` URL, put `awful` in front, and now it opens in Awful.

License
-------

[Creative Commons Attribution-NonCommercial-ShareAlike 3.0 United States License](http://creativecommons.org/licenses/by-nc-sa/3.0/us/)

Credit
------

Awful development is led by [pokeyman][] aka [Nolan Waite](https://github.com/nolanw).

Awful includes contributions from:

- [Diabolik900][]
- [enigma105](http://forums.somethingawful.com/member.php?action=getinfo&userid=51258)
- [Froist](http://forums.somethingawful.com/member.php?action=getinfo&userid=56411)
- [hardstyle](http://forums.somethingawful.com/member.php?action=getinfo&userid=51070)
- [JamesOff](http://forums.somethingawful.com/member.php?action=getinfo&userid=32221)
- [Jose Valasquez](http://forums.somethingawful.com/member.php?action=getinfo&userid=77039)
- [Malcolm XML](http://forums.somethingawful.com/member.php?action=getinfo&userid=154586)
- [OHIO](http://forums.somethingawful.com/member.php?action=getinfo&userid=82915)
- [pokeyman][]
- [Subjunctive](http://forums.somethingawful.com/member.php?action=getinfo&userid=103253)
- [The Dave][]
- [ultramiraculous](http://forums.somethingawful.com/member.php?action=getinfo&userid=44504)
- [xzzy](http://forums.somethingawful.com/member.php?action=getinfo&userid=148096)

[Diabolik900]: http://forums.somethingawful.com/member.php?action=getinfo&userid=113215
[pokeyman]: http://forums.somethingawful.com/member.php?action=getinfo&userid=106125
[The Dave]: http://forums.somethingawful.com/member.php?action=getinfo&userid=41741
