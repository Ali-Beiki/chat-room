document.querySelector("#connect").addEventListener("click", () => {
    let userNameElm = document.querySelector("#userName").value;
    if (!userNameElm.trim()) {
        return alert("نام رو وارد کن");
    }
    // console.log(userNameElm);

    let pastTime = new Date();
    pastTime.setTime(pastTime.getTime() + 1 * 24 * 60 * 60 * 1000); // befor 1 day expires cookie for delet

    // console.log(pastTime);

    document.cookie = `data=${JSON.stringify({
        id: Math.floor(Math.random() * 1001),
        name: encodeURIComponent(userNameElm),
    })};path=/;expires=${pastTime}`;
    window.location.replace("/chat");
});
