const cookieParser = require("cookie-parser");
const winston = require("winston");

module.exports = function (app, express,clientRedis) {
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(cookieParser());  
    
    clientRedis.unlink("chatHistory"); //هر بار سرور  راه اندازی شود سابقه چت قبلی پاک شود

    winston.add(
        new winston.transports.File({
            filename: "file.log",
        })
    );
};
