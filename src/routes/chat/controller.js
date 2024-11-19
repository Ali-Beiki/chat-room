const debug = require("debug")("app:debug");
const winston = require("winston");
const config = require("config");

const Controller = require("./../controller");
const controller = new Controller();
const clientRedis = controller.redis_db();

module.exports = new (class extends Controller {
    async chatForm(req, res) {
        return res.render("chatRoom", {
            icon: config.get("icon"),
            title: config.get("title"),
        });
    }

    async chatHistory(req, res) {
        try {
            const chatHistory = await clientRedis.lRange("chatHistory", 0, -1); // get all
            const chatHistoryData = chatHistory.map((item) => JSON.parse(item));
            return controller.response({ res, message: "history data .", data: chatHistoryData });
        } catch (error) {
            debug("ERR -> location :stc/routes/chat/controller ,func chatHistory ,err:", error);
            winston.error(
                "ERR -> location :stc/routes/chat/controller ,func chatHistory ,err:",
                error
            );
        }
    }
})();
