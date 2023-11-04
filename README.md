<!-- center the header h1 -->
<h1 align="center">
    playserverless.jssh
</h1>

<p align="center">
    <img src="images/jssh.svg" width="300px" height="400px">
</p>

jssh is a ***serverless, web-based playground*** that simulates a Linux-like command line interface. It allows users to interact with a virtual file system using common Linux commands. This project is designed to provide a fun and educational way to learn and practice Linux command-line operations.

### jssh currently supports the following Linux commands:


- [x] cd - Change current directory
- [x] ls - List directory contents
- [x] pwd - Print working directory
- [x] mkdir - Create directories
- [x] touch - Create files
- [ ] cp - Copy files or directories
- [ ] mv - Move or rename files and directories 
- [ ] rm - Remove files or directories 
- [ ] cat - Concatenate files and print on the standard output
- [x] clear - Clear terminal screen
- [x] whoami - Print effective userid
 

 ### features:

- [x] Arrow key Up and down through history
- [ ] Tab key to auto-complete commands
- [ ] nano - file editor
- [ ] bat
- [x] pfetch - system info

### file structure:

- `fileSystem.js` - contains the file system 
- `inputHadler.js` - contains the handlers for each command
- `htmlTweaker.js` - contains the functions that change the html
- `keywordCheck.js` - contains all the keyword management
- `linuxCmd.js` - contains the linux commands