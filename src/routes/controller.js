const { createClient } = require("@redis/client");
const debug = require("debug")("app:debug");
const winston = require("winston");

module.exports = class {
    response({ res, message, code = 200, data = {} }) {
        res.status(code).json({
            message,
            data,
        });
    }

    redis_db() {
        const clientRedis = createClient();
        clientRedis.on("error", (err) => {
            debug("ERR -> location :stc/routes/controller ,func redis_db ,err:", error);
            winston.error("ERR -> location :stc/routes/controller ,func redis_db ,err:", error);
        });
        clientRedis.connect();

        return clientRedis;
    }
};
