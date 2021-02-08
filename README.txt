This Project was built for the Browser.

It uses the Browsers Local Storage to save Mazes.

The Local Storage is unique for each Domain.

The Website must be hosted on a HTTP Server, or else each pages domain will be the file path to that html file,
and data will not be accessible from other Pages.


I have includes a HTTP Server. Called httpServer.js
NodeJS is required to run it:

NodeJS Website:         https://nodejs.org/en/
Direct Install Link:    https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi

Once you have NodeJS Installed, feel free to run the command:

npm install connect && npm install serve-static && node httpServer.js

In your Command Prompt, when the Command Prompt is in the root directory of this project.

Alternatively, feel free to run startMe.bat
This runs the same command for you, in the correct directory.


When the HTTP Server is running. Simply navigate to:
http://localhost:4200/

The Website will be running there

The Website comes with 1 Maze Premade for you.