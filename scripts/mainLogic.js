////////////////////////////////////////////////////////////////////////////////////////////////
//Login
async function Login() {
    try {
        const input1 = document.getElementById("recipient-name");
        const input2 = document.getElementById("recipient-pass");
        const addBtn = document.getElementById("add");
        const registerBtn = document.getElementById("btn1");
        const loginBtn = document.getElementById("btn2");
        let response = await axios.post('https://tarmeezacademy.com/api/v1/login', {
            username: input1.value,
            password: input2.value
        }, {
            headers: { 'Accept': 'application/json' }
        }
        )
        let token = response.data.token;
        showAlert("Login successful!", "success");
        localStorage.setItem("token", token);
        localStorage.setItem("imageUrl", response.data.user.profile_image);
        localStorage.setItem("username", response.data.user.username);
        localStorage.setItem("userId", response.data.user.id);
        if (addBtn) {
            addBtn.style.display = 'block';
        }
        const logoutBtn = document.createElement("button");
        logoutBtn.className = "btn btn-outline-danger";
        logoutBtn.textContent = 'Logout';
        const imageBox = document.createElement("div");
        imageBox.className = "pic";
        imageBox.innerHTML = `
            <img id="img" src=${response.data.user.profile_image}>
        `
        const username = document.createElement("div");
        username.className = "p-name d-flex justify-content-center align-items-center";
        username.innerHTML = `
            <p class="username" >@${input1.value}</p>
        `
        document.querySelector(".d").removeChild(registerBtn);
        document.querySelector(".d").removeChild(loginBtn);
        document.querySelector(".d").appendChild(imageBox);
        document.querySelector(".d").appendChild(username);
        document.querySelector(".d").appendChild(logoutBtn);
        const modal = document.getElementById("exampleModal");
        const modalinstance = bootstrap.Modal.getInstance(modal);
        modalinstance.hide();
    }
    catch (e) {
        const msg = e.response?.data?.message;
        if (msg) {
            showAlert(msg, "danger");
        } else {
            console.error(e);
            showAlert("Something went wrong. Try again.", "danger");
        }
    }
}

document.getElementById("login").addEventListener("click", () => {
    Login();
});


//register
async function register() {
    try {
        const input3 = document.getElementById("recipient-username");
        const input4 = document.getElementById("recipient-pass1");
        const input5 = document.getElementById("recipient-name1");
        const input6 = document.getElementById("recipient-email");
        const formData = new FormData();
        formData.append("username", input3.value);
        formData.append("password", input4.value);
        formData.append("name", input5.value);
        formData.append("email", input6.value);
        const fileInput = document.querySelector("#fileInput");
        if (fileInput.files.length > 0) {
            formData.append("image", fileInput.files[0]);
        }
        let registerResponse = await axios.post("https://tarmeezacademy.com/api/v1/register",
            formData, {
            headers: { "Content-Type": "Multipart/form-data" }
        });
        const modal = document.getElementById("registerModal");
        const modalinstance = bootstrap.Modal.getInstance(modal);
        modalinstance.hide();
    }
    catch (e) {
        const msg = e.response.data.message;
        if (msg && msg != 'Access Token is required') {
            alert(e.response.data.message);
        } else {
            console.log(e.message);
        }
    }
}
document.getElementById("register").addEventListener("click", () => {
    register();
});

document.querySelector(".d").addEventListener("click", function (e) {
    logout(e);
});

window.addEventListener("DOMContentLoaded", reload);
