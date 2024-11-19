const express = require("express");
const router = express.Router();
const controller = require("./controller");
const middlewaresChat = require("../../middlewares/chat");

router.get("/", middlewaresChat.hasLogin, controller.chatForm);
router.post("/", middlewaresChat.hasLogin, controller.chatHistory);

module.exports = router;
