const mkdir = (name) => {
  if (currentDirectory.contents.has(name)) {
    return `mkdir: cannot create directory '${name}': File exists`;
  } else {
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
  } else {
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

const whoami = () => {
  return "superman";
}

// pfetch details

// OS name
const getOSName = () => {
  if (window.navigator.userAgent.indexOf("Windows") != -1) {
    return "Windows";
  } else if (window.navigator.userAgent.indexOf("Mac OS") != -1) {
    return "Mac";
  } else if (window.navigator.userAgent.indexOf("Linux") != -1) {
    return "Linux";
  } else {
    return "Other";
  }
};

// uptime

const startTime = new Date().getTime();

const getUptime = () => {
  const currentTime = new Date().getTime();
  const timeElapsed = ((currentTime - startTime)/1000)%60;
  return timeElapsed.toFixed(1)+" s";
};

// const getRegion = () => {
//   return new Promise((resolve, reject) => {
//     fetch("https://get.geojs.io/v1/ip/geo.json")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         resolve(data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

const pfetch = () => {
  return `
<style>
.main {
  display: flex;
}

.pfetch {
  font-size: 6px;
  color: #f7df1e;
}

.detail {
  height: 100%;
  padding-left: 30px;
  
}

#githublink {
  text-decoration: none !important;
  color: white;
}


</style>
<div class="main">
<span class="pfetch">
<pre>
                                            %%%%#####%%%                  
                                         %%%%#*======+*#%%%
                                       %#%*+-----------:=+#%#%%
                                  %%#%#+=-------------------+*%#%%
                               %%%%#+-------------------------:=*#%%%
                             %%#*=-------------------------------:=+*%#%%
                        %%#%#+=---------------------------------------+*%#%%
                     %%#%*+---------------------------------------------:=+##%%
                  %%%#*=:---------------------------------------------------=+*%#%
              %%#%*+=-----------------------------------------++----------------=*%#%%
           %%#%*+------------------------------------------=*%@@@*=---------------:=*#%##
         %#%*=:-----------------------------------------=*%@@@@@@@*=-------------------+##%
        #%#-:----------------------------------------=*%@@@@@@@#+-----------------------:+%#%
       %%*:----------------------#@%##*+-----------+%@@@@@@@#+---------------------------:-##%
       %%------------------------%@@@@@+--------+#@@@@@@@%*-------------------------=*#%%%**%#
      *%#:-----------------------*@@@@@%+=---+#@@@@@@@%*=------------------------+*%%%%%%%#%%#
      *%*-------------------------=#@@@@@@@@@@@@@@@%*=-----------------------=+#%%%%%%%%%%%%%#
      *%*:--------------------------=+#@@@@@@@@@%*+----------------------:=+#%%%%%%%%%%%%%%%%#
      *%*:-------------------------------=+++==-----------------------:=*#%%%%%%%%%%%%%%%%%%%#
      *%*:----------------------------------------------------------=*%%#%%%%%%%%%%%%%%%%%%%%#
      *%*:-----------------------------------------------------:-+*%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:----------------------------------------------------+#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:------------------------------------------------=*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:--------------@@@#**------------------------:=*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:------------*@@@@@@#*=--------------------=*%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:-----------=@@@@@@@@@@%*-----------------#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:------------%@@@@#++#@@@@*-------------=%%%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:------------=@@@@#----*@@@%=-----------+%%%%%%%%%%%#*#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:-------------=%@@@%+---=+++=----------:*%%%%%%%%%%%. +%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:---------------+@@@@@*-----------------*%%%%%%%%%%%     =%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:-----------------+%@@@@#=-------------:*%%%%#%%%%+   ...%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*-----------+****----=#@@@@#------------:*%%%%%%%#:  =#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:-----------#@@@%=----=#@@@@*----------:*%%%%#%%=  +%%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%*:------------+%@@@#=----+@@@@#---------:*%%%%%%%:  .-==+*%%%%%%%%%%%%%%%%%%%%%%%%%%%#
      *%#:--------------+%@@@@#*+*@@@@@+--------:*%%%#%%%=        :#%%%%%%%%%%%%%%%%%%%%%%%%%#
      %%%:----------------=#@@@@@@@@@@@*--------:*%%%%%%#%*=---.   +%%%%%%%#%%%%%%%%%%%%%%%%%#
       #%+-------------------=*%@@@@@@%=--------:*%%%%%%%%%%%%%#   *%%%%%%%%%##*%%%%%%%%%%%%%%
       %#%+-----------------------=++=----------:*%%%%#%%%%%%%%+  =%#%%%%%#*+++*%%%%%%%%%%%##
         %%#=-----------------------------------:*%%%%%%##+++-.  =%%%%%#*+++*#%%%%%%%%%%#%#
          %%#%*+--------------------------------:*%%%%%%%-     :#%%%%%%*+*#%%%%%%%%%%%%%%%
             %%%%#+=:---------------------------:*%%%%%%%=-=+  =%%%%%%%%%%%%%%#%%%%%#%
                 %%%%*=-------------------------:*%%#%#%%%%%%:=#%%%%%%%%%%%%%%%%%#%%
                    %%#%#+----------------------:*%%%%%#%%%%%%%%%%%%%%%%#%%%%#%%%
                        %#%#*=:-----------------:*%%%%%%%%%%%%%%%%%%%%%%%%#%%
                           %%%%*+---------------:*%%%%%%%%%%%%%%%%%%%%%%%
                              %%#%*+=-----------:*%%%%%%%%%%%%%%%%%#%%
                                  %#%#*=---------*%%%%%%%%%%%%%%#%%
                                     %%%%*+------+%%%%%%%%%%%#%
                                        %%#%#+=-::=#%%%%%#%%
                                            %%##%%%%##%%%
</pre>
</span>
<span class="detail">
<pre>
user   superman
os     ${getOSName()}
uptime ${getUptime()}
shell  jssh
github <a target="_blank" id="githublink"   href="https://github.com/hrdkmishra/playserverless.jssh">hrdkmishra/playserverless.jssh</a>

<pre>
</span>
</div>
  `;
};
