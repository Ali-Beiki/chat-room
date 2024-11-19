// src/websocket.js

const debug = require("debug")("app:debug");

module.exports = (server, clientRedis) => {
    const socketIo = require("socket.io");
    const io = socketIo(server);

    io.on("connection", async (socket) => {
        try {
            debug("User connected: ", socket.id);

            let cookei = decodeURIComponent(socket.handshake.headers.cookie.split("=")[1]);
            let user = JSON.parse(cookei);

            if (user) {
                debug("user connect ,cookie :", socket.handshake.headers.cookie);
                debug("User :", user);
                await io.emit("receive_message", {
                    message: `${user.name.toString()} به اتاق چت پیوست`,
                });
            }
        } catch (error) {
            debug("cookie not fond");
        }
        debug("user connect ,cookie :", socket.handshake.headers.cookie);
        socket.on("send_message", async (data) => {
            debug("Message received: ", data);
            try {
                await clientRedis.rPush("chatHistory", JSON.stringify({ data })); // push to list
                debug("save message");
            } catch (error) {
                debug("Error Add list", error);
            }
            debug("data sening :" + data);
            io.emit("receive_message", data); // Emit to all clients
        });

        socket.on("disconnect", async () => {
            debug("User disconnected");

            let cookei = decodeURIComponent(socket.handshake.headers.cookie.split("=")[1]);
            let user = JSON.parse(cookei);

            if (user) {
                await io.emit("receive_message", {
                    message: `${user.name.toString()} از اتاق چت خارج شد`,
                });
            }
        });
    });

    return io;
};
