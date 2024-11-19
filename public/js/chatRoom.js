const socket = io(); // اتصال به سوکت
let { id, name } = getDataCookei();

//click on button send message
document.getElementById("sendMessage").addEventListener("click", sendMessage);

document.getElementById("exitChat").addEventListener("click", exitChat);

document.getElementById("message").addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        sendMessage();
    }
});

window.addEventListener("load", async () => {
    try {
        let response = await fetch("http://localhost/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await response.json();

        result.data.forEach(async (mess) => {
            await createElmChat(mess.data);
        });
    } catch (error) {
        console.log("Error Load Chat Room") + error;
    }
});

//get and parse cookie
function getDataCookei() {
    let cookies = document.cookie.split(";");
    let cookiesData = [];

    cookies.forEach((cookie) => {
        if (cookie) {
            cookiesData.push(cookie.substring(cookie.indexOf("=") + 1));
        }
    });

    return JSON.parse(cookiesData);
}

//create html elm
function createElmChat(data) {
    const messagesList = document.getElementById("messages");
    const newMessage = document.createElement("div");
    const message = data.message;
    // چک می‌کنیم که پیام از دیگری است یا کاربر
    if (message.includes(decodeURIComponent(name))) {
        newMessage.classList.add("message", "user");
    } else {
        newMessage.classList.add("message", "other");
    }

    newMessage.innerHTML = `<div class="content">${message}</div>`;
    messagesList.appendChild(newMessage);

    // اسکرول به پایین
    messagesList.scrollTop = messagesList.scrollHeight;
}

//send message
function sendMessage() {
    const message = decodeURIComponent(name) + " :  " + document.getElementById("message").value;

    socket.emit("send_message", { message }); // ارسال پیام
    document.getElementById("message").value = "";
}

// delet cookie (close in chat room)
function exitChat() {
    let pastTime = new Date();
    pastTime.setTime(pastTime.getTime() - 5 * 24 * 60 * 60 * 1000); // befor 5 day expires cookie for delet
    document.cookie = `data=ABC;path=/;expires=${pastTime}`;
    window.location.replace("/");
}

// گوش دادن به رویدادهای که تعریف کردیم
socket.on("receive_message", createElmChat);
