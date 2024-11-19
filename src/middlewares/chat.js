const debug = require("debug")("app:debug");

async function isLogin(req, res, next) {
    const user =userParser(req)
    if (user) {
        console.log("A", user);
        debug("middlewares chat, func isLogin, user is logined ,find cookei");
        return res.redirect("/chat");
    }
    debug("middlewares chat, func isLogin, user is not logined ,not find cookei");
    next();
}

async function hasLogin(req, res, next) {
    const user =userParser(req)
    if (!user) {
        debug("middlewares chat, func hasLogin, user is not logined ,not find cookei");
        return res.redirect("/");
    }
    debug("middlewares chat, func hasLogin, user is logined ,find cookei");
    next();
}

function userParser(req) {
    let user;
    try {
        return (user = JSON.parse(req.headers.cookie.split("=")[1]));
    } catch (error) {
        debug("not found cookie -> middlewares chat ,func isLogin");
        return false;
    }
}

module.exports = {
    isLogin,
    hasLogin,
};
