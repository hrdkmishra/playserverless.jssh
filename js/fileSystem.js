class File {
  constructor(name, content) {
    this.name = name;
    this.type = "file";
    this.content = content;
  }
}

class Directory {
  constructor(name) {
    this.name = name;
    this.type = "directory";
    this.contents = new Map();
    this.parent = null;
  }

  addDirectory(name) {
    const directory = new Directory(name);
    directory.parent = this;
    this.contents.set(name, directory);
  }

  addFile(name, content) {
    const file = new File(name, content);
    this.contents.set(name, file);
  }

  getContents() {
    return Array.from(this.contents.keys());
  }

  getItem(name) {
    return this.contents.get(name);
  }
}

function addDirectories(parentDir, directoryNames) {
  for (const name of directoryNames) {
    parentDir.addDirectory(name);
  }
}

const directoryNames = [
  "bin",
  "boot",
  "dev",
  "etc",
  "home",
  "init",
  "lib",
  "lib64",
  "lost+found",
  "mnt",
  "opt",
  "proc",
  "root",
  "run",
  "sbin",
  "srv",
  "sys",
  "tmp",
  "usr",
  "var",
];
const root = new Directory("/");

addDirectories(root, directoryNames);
const superman = new Directory("superman");
root.contents.get("home").addDirectory("superman");

const home = root.contents.get("home").contents.get("superman");

const fileSystem = home

let currentDirectory = fileSystem;