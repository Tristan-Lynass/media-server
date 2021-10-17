1. SEARCH!
3. Re-do the upload component, putting it up near the search bar, either as a badge on the menu hamburger, OR as a standalone button
4. Fullscreen page
5. Refine tagging

### Start Client
`npm run start`

### Client POC To Do
1. ~~Get file upload working (Drag and drop on top the results table)~~
    - ~~Send files in form data under (media)~~
2. ~~Get results table performing~~
    - ~~Dynamic resizing~~
    - ~~Infinite scrolling~~
    - ~~Virtual scrolling~~
3. Add feature to cycle through images to manage tags
   - Clicking an image on the results page will open the image full size
   - This page will contain a method of managing tags (undo and redo buttons would be great)
   - Left and right buttons for traversing the results
   - Ideally a horizontal infinite scroll thing at the bottom to display image previews
   - A play button to automatically cycle through the images in fullscreen cover
4. Get search bar generating tags to send the server

### Later To Do
- Searching
  - Put search tags in url, so reload will retain tags
  - Clear all tags / backspace to delete a tag (see how annoying this is)
  - Click tag to toggle include/exclude
  - Sort and search by various media props
    - Untagged, filetype, length, filesize, dimensions, num tags
  - Save searches
  - Suggest tags
- Support video
- Implement a play feature
- Support media deletion and restoration
- Support duplicate detection through file hash
- Add upload progress bars
- Parse media metadata with ffmpeg


### Server
The server folder contains the old server code. The server-poc folder contains the mock server to establish a POC client. We might stick with it, but I think after we're done with the POC, re-write it with Spring Boot + SQLite.

Doing it in Spring Boot will be a better option because it comes with so much opinionated tools out of the box. We can also leverage threading and Java's performance and maturity when it comes to file processing and transcoding down the track.


### Development notes
When you're just starting a new project, so you don't lose motivation or steam, just do commits to develop and once you have a 1.0 version of the app, start doing feature branches, and a ticketed approach. I tried the latter from the get-go and all the overhead of Jira tickets and that stuff really bogged me down and I lost motivation.


### Infinite + Virtual scrolling grid investigation

#### Requirements
* Dynamic viewport size support
* Virtual / recycler scroll capability
* Infinite scroll
* Image support
* Multi-column support

#### Candidates
* **ngx-ui-scroll**           - This doesn't have obvious support for a grid layout
* **ngx-infinite-scroll**     - This doesn't support virtual scrolling natively. This is definitely something we could build out, but would be out of scope for an MVP
* **ngx-virtual-scroller**    - So far this is the *WINNER* as it supports virtual scrolling and a grid layout. The infinite scrolling part is fairly trivial. ~~(I hope...)~~ It was

### File Drag and Drop investigation

#### Requirements
* Not triggered by on screen elements being dragged
* Provide a whole screen, invisible drop zone that becomes opaque when a drag event occurs

#### Candidates           
* **ngx-file-drop** - So this is a load of crap. No
* **ngx-dropzone** - Also doesn't work
Ended up implementing my own.


## Research and Best Practices
- https://github.com/sgoeschl/java-image-processing-survival-guide
