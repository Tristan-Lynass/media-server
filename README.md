### Start Client
`npm run start`

### Client POC To Do
- Get results table performing
  - Dynamic resizing
  - Infinite scrolling
  - Virtual scrolling
- Get search bar generating tags to send the server
- Get file upload working (Drag and drop on top the results table)
  - Send files in form data under (media)
- Add feature to cycle through images to manage tags

### Later To Do
- Searching
  - Put search tags in url, so reload will retain tags
  - Clear all tags
  - Click tag to toggle include/exclude
  - Sort by various media props
  - Search by other props like filetype
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
When you're just starting a new project, so you don't loose movitiation or steam, just do commits to develop and once you have a 1.0 version of the app, start doing feature branches, and a ticketed approach. I tried the latter from the get-go and all the overhead of Jira tickets and that stuff really bogged me down and I lost motivation.
