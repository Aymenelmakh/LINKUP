function logout(e) {
    const logout = e.target.closest(".btn-outline-danger");
    if (!logout) {
        return;
    }
    showAlert("Logout successful!", "danger");
    const container = document.querySelector(".d");
    const pr_image = container.querySelector(".pic");
    const username = container.querySelector(".p-name");
    const posts = document.getElementById("posts");
    const addBtn = document.getElementById("add");
    if (addBtn) {
        addBtn.style.display = 'none';
    }
    const registerBtn = document.createElement("button");
    registerBtn.id = "btn1";
    registerBtn.className = "btn btn-outline-success";
    registerBtn.textContent = "Register";
    registerBtn.setAttribute("data-bs-toggle", "modal");
    registerBtn.setAttribute("data-bs-target", "#registerModal");

    const loginBtn = document.createElement("button");
    loginBtn.id = "btn2";
    loginBtn.className = "btn btn-outline-success";
    loginBtn.textContent = "Login";
    loginBtn.setAttribute("data-bs-toggle", "modal");
    loginBtn.setAttribute("data-bs-target", "#exampleModal");
    container.removeChild(logout);
    container.removeChild(pr_image);
    container.removeChild(username);
    container.appendChild(registerBtn);
    container.appendChild(loginBtn);
    localStorage.clear();
    if (window.location.pathname.endsWith("home.html")) {
        const postsEl = document.getElementById("posts");
        if (postsEl) {
            postsEl.innerHTML = "";
            getPosts();
        }
    }
    if (window.location.pathname.endsWith("profile.html"))
    {
        window.location = './home.html';
    }
}