const express = require("express");
const http = require("http");
const config = require("config");

const app = express();
const server = http.createServer(app);

const Controller = require("./src/routes/controller");
const controller = new Controller();
const clientRedis = controller.redis_db();

require("./startup/config")(app, express, clientRedis);
const router = require("./src/routes");
const middlewaresChat = require("./src/middlewares/chat");

//run web socket
const setupWebSocket = require("./startup/webSocket");
setupWebSocket(server, clientRedis);

app.get("/", middlewaresChat.isLogin, (req, res) => {
    res.render("index", {
        icon: config.get("icon"),
        title: config.get("title"),
    });
});

app.use("/", router);

server.listen(config.get("port"), () => {
    console.log(`Server running on ${config.get("port")}`);
});
