const express = require("express");
const debug = require("debug")("app:debug");
const winston = require("winston");
const router = express.Router();
const chatRouter = require("./chat");

router.use("/chat",chatRouter );

router.use((error, req, res, next) => {
    debug("ERR -> location :stc/routes/index ,middleware error handler ,err:", error);
    winston.error("ERR -> location :stc/routes/index ,middleware error handler ,err:", error);
    return controller.response({
        res,
        message: "Error in Router",
        code: 500,
        data: ["ارور از سمت سرور"],
    });
});

module.exports = router;
