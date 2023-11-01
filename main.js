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

const root = new Directory("/");
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
addDirectories(root, directoryNames);
const superman = new Directory("superman");
root.contents.get("home").addDirectory("superman");

const fileSystem = root;
let currentDirectory = fileSystem;

const mkdir = (name) => {
  if (currentDirectory.contents.has(name)) {
    return `mkdir: cannot create directory '${name}': File exists`;
  }
  else{
    currentDirectory.addDirectory(name);
    return "";
  } 

};

const clear = () => {
  document.getElementById("output").innerHTML = "";
  return "";
};

const touch = (name) => {
  if (currentDirectory.contents.has(name)) {
    return `touch: cannot create file '${name}': File exists`;
  }
  else {
    currentDirectory.addFile(name);
    return "";
  }
};

const cd = (currentDir, targetDir) => {
  if (targetDir === "..") {
    return currentDir.parent || currentDir;
  } else if (targetDir === ".") {
    return currentDir;
  } else if (targetDir.startsWith("/")) {
    return navigateToAbsolutePath(targetDir);
  } else if (targetDir.includes("/")) {
    const pathParts = targetDir.split("/").filter((part) => part !== "");
    return navigateToRelativePath(currentDir, pathParts);
  } else if (
    currentDir.contents.has(targetDir) &&
    currentDir.contents.get(targetDir).type === "directory"
  ) {
    return currentDir.contents.get(targetDir);
  }

  return currentDir;
};

const navigateToAbsolutePath = (targetDir) => {
  const parts = targetDir.split("/").filter((part) => part !== "");
  let current = root;
  for (const part of parts) {
    if (
      current.contents.has(part) &&
      current.contents.get(part).type === "directory"
    ) {
      current = current.contents.get(part);
    } else {
      return current;
    }
  }
  return current;
};

const navigateToRelativePath = (currentDir, pathParts) => {
  let current = currentDir;
  for (const part of pathParts) {
    if (part === "..") {
      current = current.parent || current;
    } else {
      if (
        current.contents.has(part) &&
        current.contents.get(part).type === "directory"
      ) {
        current = current.contents.get(part);
      } else {
        return current;
      }
    }
  }
  return current;
};

const pwd = (currentDir) => {
  const path = [];
  while (currentDir) {
    if (currentDir.parent) {
      path.unshift(currentDir.name);
    }
    currentDir = currentDir.parent;
  }
  return "/" + path.join("/");
};

const ls = (currentDir) => {
  if (currentDir.type === "directory") {
    return currentDir.getContents();
  }
  return [];
};


const executeCommand = (command) => {
  const parts = command.trim().split(" ");

  if (parts[0] === "mkdir") {
    return mkdir(parts[1]);
  } else if (parts[0] === "cd") {
    currentDirectory = cd(currentDirectory, parts[1]);
    return "";
  } else if (parts[0] === "touch") {
    return touch(parts[1]);
  } else if (parts[0] === "mv") {
    return mv(parts[1], parts[2]);
  } else if (parts[0] === "rm") {
    return rm(parts[1]);
  } else if (parts[0] === "cp") {
    return cp(parts[1], parts[2]);
  }

  switch (parts[0]) {
    case "ls":
      return ls(currentDirectory).join(" ");
    case "date":
      return new Date().toString();
    case "clear":
      return clear();
    case "pwd":
      return pwd(currentDirectory);
    case "":
      return "";
    default:
      return `-jssh: ${parts[0]}: command not found`;
  }
};

// const commands = ["cd", "ls", "touch", "mkdir", "mv", "cp", "rm", "pwd", "clear"];
// let currentMatches = [];
// let currentSuggestion = 0;

// const suggestCommands = (input) => {
//   const matches = [];
//   const currentDir = pwd();

//   console.log('Input:', input);

//   if (currentDir === '/home') {
//       // Suggest directories in the current directory
//       const dirContents = getDirectoryContents(currentDir);

//       console.log('Directory Contents:', dirContents);

//       for (const dir of dirContents) {
//           if (dir.startsWith(input)) {
//               matches.push(dir);
//           }
//       }
//   } else {
//       // Suggest available commands
//       for (const command of commands) {
//           if (command.startsWith(input)) {
//               matches.push(command);
//           }
//       }
//   }

//   console.log('Matches:', matches);

//   return matches;
// };

const handleInput = (event) => {
  if (event.key === "Enter") {
    input.style.width = "10px";
    const userInput = document.getElementById("userInput").value;
    document.getElementById("userInput").value = "";
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML += `<div><span class="prompt">[superman@jssh]$</span> ${userInput}</div>`;
    const output = executeCommand(userInput);
    outputDiv.innerHTML += `<div>${output}</div>`;
    document.getElementById("userInput").value = "";
    document.getElementById("userInput").focus();
    // } else if (event.key === 'Tab') {
    //   event.preventDefault(); // Prevent the default tab behavior
    //   const userInput = document.getElementById('userInput');
    //   const inputText = userInput.value;

    //   if (inputText) {
    //     if (currentMatches.length > 0) {
    //       userInput.value = currentMatches[currentSuggestion];
    //       currentSuggestion = (currentSuggestion + 1) % currentMatches.length;
    //     } else {
    //       // Call suggestCommands to get the matches
    //       currentMatches = suggestCommands(inputText);
    //       if (currentMatches.length > 0) {
    //         userInput.value = currentMatches[currentSuggestion];
    //         currentSuggestion = (currentSuggestion + 1) % currentMatches.length;
    //       }
    //     }
    //   }
  }
};

// index.html tweaks

const input = document.getElementById("userInput");
input.addEventListener("input", function () {
  if (input.scrollWidth > input.clientWidth) {
    input.style.width = input.scrollWidth + "px";
  }
});

const focusInput = () => {
  document.getElementById("userInput").focus();
};
