# CSC372-Project
Final Project for CSC372<br>
Breakpoint Games<br>
James Campbell

<h2>Introduction</h2>
This project is a full web server that hosts a site for web-based games. It includes features for users to login using a local account 
they can register for or using Facebook or Google to login. The site uses Bootstrap to have a clean, modern UI with interactive elements. 
There is a navigation bar to the side that is toggleable using the menu button from any page. When users are logged in they can earn 
tokens for their account which can be used to unlock items in the token store.
<br>
<h2>Installing</h2>
<h3>NodeJS</h3>
To install NodeJS:<br>
1. If not already installed, download NodeJs from https://nodejs.org<br>
2. Run the package/installer that you downloaded<br>
3. Follow the prompts for a full installation<br>
<h3>MonogoDB</h3>
To install MongoDB:<br>
1. If not installed, download MongoDB from https://www.mongodb.com/download-center<br>
2. Run the package/installer that you downloaded<br>
3. Follow the prompts for a full installation<br>
<h3>Installing the App</h3>
To get the app:<br>
1. Either download the project zip from Github or clone the repository into a blank folder on your computer<br>
2. If you downloaded the zip file, extract it into a blank folder<br>
<br>
To get the app ready:<br>
1. Use terminal/command prompt to navigate to the folder you extracted/cloned the files to<br>
2. Run 'npm install' in the window. !! If you get an error about npm not being found check the NodeJS documentation on setting up the 
commands in terminal/command prompt (this should have been done if you did a full install) !!<br>
3. Once all of the dependencies are installed you need to create a path for the Mongo database. In the root directory of the project 
create a foler called 'data', then create a folder called 'db' inside of that<br>
4. Next, follow the instructions in the credentials-example.js and oauth-example.js files to create your own unique credentials.js and 
oauth.js files in the same directory<br>
5. You will need to create your own unique credentials at http://developers.facebook.com/apps/ and https://console.developers.google.com<br>
<h2>Running the App</h2>
To run the app:<br>
1. Open terminal/command prompt to the app directory<br>
2. Run 'mongod --dbpath YOUR_PROJECT_DIRECTORY/data/db/' (this will create the database files on first run)<br>
3. Open another terminal/command prompt window and naviagte to your project directory<br>
4. Run 'node start' to start the server<br>
<h2>Additional Details</h2>
 - The default port for this app is 3000.  This can be changed by modifying the 'var port' in ./bin/www.js.<br>
 - If your created oAuth credentials for Facebook and plan on making the app live you will need to make the app public in the Facebook 
 developer console for others to login to your site.<br>
