## Notes App 

<p>Main purpose of MERN Notes App is move previous project (https://github.com/maciejleoniak/notes-app) to more advance technology (MongoDB - Express.js - React - Node.js = MERN). Purpose is reached. Moreover our notes are more safer than previous. MERN Notes App uses authorisation token during log-in and crypto technology to keep in secret our passwords.
I missed in previous version by notes share option. It is past because it is now available so we can exchange by notes!</p>

## Usage

1. Open the console or terminal on your local machine.
2. Clone this repository to your local machine using console:
```sh
git clone https://github.com/maciejleoniak/mern-notes-app.git
```
3. Go to the repository directory:
```sh
cd mern-notes-app
```
4. Make sure you have Node.js installed on your machine. You can check it by the following command:
 ```sh 
 node -v 
 ``` 
 or you can download the Node.js installer from the official Node.js website (https://nodejs.org) and follow the installation instructions for your specific operating system.

5. Install the server dependencies using the following command:
 ```sh
npm install
```
6. Go to the client directory:
```sh
cd client
```
7. Install the client dependencies using the following command:
 ```sh
npm install
```
8. Now you can run the server in main folder by ```npm run dev``` and run client in client folder by ``` npm start```
This command will start a development server hosting at http://localhost:5000. By default, the application will be available at http://localhost:3000 in your browser.

9. Connect to an existing MongoDB cluster or create a new one.
<p>The Notes application might require a connection to a MongoDB database to store and retrieve data. Ensure you have an existing MongoDB cluster that you can connect to, or follow the MongoDB documentation (https://docs.mongodb.com) to create a new cluster based on your needs. Once you have the connection details (such as the connection URL), you may need to update the application's configuration to establish the connection with MongoDB.</p>

## Tests

1. To run all tests following command:
 ```sh
npm run test
```
1. To run tests one-by-one following command:
```sh
npm run test1
```
Where the number corresponds to the test file. At this point, the available tests are :

 ```sh
1 - userController - login endpoint
2 - userController - register endpoint
3 - userController - verified token endpoint
```


