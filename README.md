# a1-stash

Command line executable to compress a folder, encrypt and distribute to an external server or to a backup folder.



## Usage as npm package

Installation: `npm install a1-stash`

Usage: `await a1-stash.run(folder)`




## Usage as terminal command (CLI)

Installation:
- drop the index.js file into /usr/bin and rename it to `stash` (no need to npm install, just the file)
- make sure the file has execution permisions (chmod u+x index.js)
- make sure the node executable location is the same as the index.js #hashbang line

Usage:
- In a terminal window, go to folder /foo 
- to stash subfolder /bar, type `stash bar`


