const executeCommand = (command) => {
  const parts = command.trim().split(" ");
  const cmd = parts[0];
  const args = parts.slice(1);

  switch (cmd) {
    case "mkdir":
      return mkdir(args[0]);
    case "cd":
      currentDirectory = cd(currentDirectory, args[0]);
      return "";
    case "touch":
      return touch(args[0]);
    case "mv":
      return mv(args[0], args[1]);
    case "rm":
      return rm(args[0]);
    case "cp":
      return cp(args[0], args[1]);
    case "ls":
      return ls(currentDirectory).join(" ");
    case "date":
      return new Date().toString();
    case "clear":
      return clear();
    case "pwd":
      return pwd(currentDirectory);
    case "whoami":
      return whoami();
    case "pfetch":
      return pfetch();
    case "":
      return "";
    default:
      return `-jssh: ${cmd}: command not found`;
  }
};
