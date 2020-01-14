## Overview
Look Out is a mobile-responsive web application that...

## Installation
1. Get your hands on keys for the following API's:
*
*
*
2. Clone the repository below: git clone git@github.com:MR-Stan/Look-Out.git

3. Install dependencies: sh npm install

4. Make sure you start your mysql server by entering the following command into your terminal or console: mysql.server start

5. Inside config/config.json enter in the username and password for your server. If you do not you WILL get a connection refused error. Please enter username and password in the following format:

* "username": "{your mysql username},
* "password": "{your mysql password}",

6. Run the following command in your terminal/console to start the node server: node server.js

## Notes for developers
1. If you are committing new changes to this application you will need to first do the following command in terminal before committing changes to ensure you are on the development branch which is named working: git checkout working 

