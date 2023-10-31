const fileSystem = {
  "/": {
    type: "directory",
    contents: {
      home: {
        type: "directory",
        contents: {
          superman: {
            type: "directory",
            contents: {
              Documents: {
                type: "directory",
                contents: {
                  "resume.txt": {
                    type: "file",
                    contents: "My resume contents",
                  },
                },
              },
              Pictures: {
                type: "directory",
                contents: {
                  "me.png": {
                    type: "file",
                    contents: "PNG image",
                  },
                },
              },
              Videos: {
                type: "directory",
                contents: {},
              },
              Downloads: {
                type: "directory",
                contents: {
                  "nodejs.exe": {
                    type: "file",
                    contents: "Windows executable",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

let currentDirectory = "/";

cd_cmd = (targetDir) => {
  if (targetDir === ".") {
    return "";
  } else if (targetDir === "..") {
    if (currentDirectory !== "/") {
      const parts = currentDirectory.split("/").filter((part) => part !== "");
      parts.pop();
      currentDirectory = parts.length > 0 ? `/${parts.join("/")}` : "/";
      return "";
    } else {
      return "cd: cannot access '..': No such file or directory";
    }
  } else {
    if (
      fileSystem[currentDirectory] &&
      fileSystem[currentDirectory].contents[targetDir] &&
      fileSystem[currentDirectory].contents[targetDir].type === "directory"
    ) {
      currentDirectory = `${currentDirectory}/${targetDir}`;
      return "";
    } else {
      return `cd: ${targetDir}: No such file or directory`;
    }
  }
};

ls_cmd = () => {
  const currentDirInfo = fileSystem[currentDirectory];
  const currentDirContents = currentDirInfo.contents;
  const contentsList = [];

  if (currentDirContents) {
    for (const item in currentDirContents) {
      contentsList.push(item);
    }
  }

  return contentsList.join(" ");
};

pwd_cmd = () => {
  if (currentDirectory === "/") {
    return currentDirectory;
  } else {
    return currentDirectory.replace(/\/+/g, "/");
  }
};

clear_cmd = () => {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";
  return "";
};

executeCommand = (command) => {
  const parts = command.trim().split(" ");

  if (parts[0] === "mkdir") {
    return mkdir_cmd(parts[1]);
  } else if (parts[0] === "cd") {
    return cd_cmd(parts[1]);
  }

  switch (parts[0]) {
    case "ls":
      return ls_cmd();
    case "date":
      return new Date().toString();
    case "clear":
      return clear_cmd();
    case "pwd":
      return pwd_cmd();
    default:
      return `Command not found: ${parts[0]}`;
  }
};


handleInput = (event) => {
  if (event.key === "Enter") {
    const userInput = document.getElementById("userInput").value;
    document.getElementById("userInput").value = "";
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML += `<div><span class="prompt">[superman@jssh:~]$</span> ${userInput}</div>`;
    const output = executeCommand(userInput);
    outputDiv.innerHTML += `<div>${output}</div>`;
    document.getElementById("userInput").value = "";
    document.getElementById("userInput").focus();
  }
};
