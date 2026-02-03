function reload()
{
    const userToken = localStorage.getItem("token");
    const getusername = localStorage.getItem("username");
    const URL = localStorage.getItem("imageUrl");
    if (userToken) {
        const registerBtn = document.getElementById("btn1");
        const loginBtn = document.getElementById("btn2");
        const addBtn = document.getElementById("add");
        if (addBtn) {
            addBtn.style.display = 'block';
        }
        const logoutBtn = document.createElement("button");
        logoutBtn.className = "btn btn-outline-danger";
        logoutBtn.textContent = 'Logout';
        const imageBox = document.createElement("div");
        imageBox.className = "pic";
        imageBox.innerHTML = `
            <img id="img" src=${URL}>
            <p>test</p>
        `
        const username = document.createElement("div");
        username.className = "p-name d-flex justify-content-center align-items-center";
        username.innerHTML = `
            <p class="username" >@${getusername}</p>
        `
        document.querySelector(".d").removeChild(registerBtn);
        document.querySelector(".d").removeChild(loginBtn);
        document.querySelector(".d").appendChild(imageBox);
        document.querySelector(".d").appendChild(username);
        document.querySelector(".d").appendChild(logoutBtn);
    }
}