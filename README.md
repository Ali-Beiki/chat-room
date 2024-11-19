# chat room
## description
_A chat room where users talk to each other user ,I used WebSockets in this project and used Redis to store users messages_


## prerequisite
- Node JS
- Redis

## Config
### Run Redis

### Edit config file
_Setting the config file in app/config/default.json_


```sh
{
    "name": "chat room",//name project
    "port": 80,// port
    "icon":"/images/icon.png", // icon path
    "title":"Chat Room" // title page
}
```

## Start

__Instal Package__
```sh
 npm i
```

__Run__
```sh
 npm start
```
__Debug Mode__
edit line in package.json
```sh
// normal state
"scripts": {
   
     "start": "set nodemon index.js" 
},


// debug mode
"scripts": {
   
    "start": "set DEBUG=app:debug && nodemon index.js" 
},
```