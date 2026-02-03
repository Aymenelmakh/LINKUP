reload();
document.querySelector(".d").addEventListener("click", function (e) {
    logout(e);
});

async function displayProfile()
{
    showLoader();
    try{
        const profile_image = document.getElementById("profil-pic");
        const username = document.getElementById("tit");
        const email = document.getElementById("personnel-email");
        const nb_posts = document.getElementById("nb-posts");
        const nb_comments = document.getElementById("nb-comments");
        const urlPrams = new URLSearchParams(window.location.search);
        const userId = urlPrams.get("userId");
        let userRes = await axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}`);
        let data = userRes.data.data;
        let profile_image_url = "https://cdn-icons-png.flaticon.com/128/847/847969.png";
        if (typeof data.profile_image === "string" && data.profile_image.length > 0) {
            profile_image_url = data.profile_image;
        }
        let str = 'email : ';
        const profile_card = document.createElement("div");
        profile_card.className = 'container';
        profile_card.innerHTML =`
            <div class="d-flex justify-content-center">
            <div class="col-9">
                <div class="profile bg-light pb-2 shadow">
                    <div class="profile-top">
                        <div class="profile-img-box">
                            <img id="profil-pic" src=${profile_image_url}>
                        </div>
                    </div>
                    <div class="profile-title">
                        <p id="tit">${data.username}</p>
                        <p id="personnel-email">${data.email ? str + data.email:""}</p>
                    </div>
                    <div class="profile-buttons">
                        <button class="profile-btn" type="button">Subscribe</button>
                        <button class="profile-btn" type="button">Message</button>
                    </div>
                    <div class="reacts">
                        <ul class="profile-bottom">
                            <li>
                                 <i class="fa-solid fa-address-book"></i>
                                 <p id="nb-posts">${data.posts_count}</p>
                            </li>
                            <li class="sep">|</li>
                            <li>
                                  <i class="fa-regular fa-comment"></i>
                                  <p id="nb-comments">${data.comments_count}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("profile-card").appendChild(profile_card);
        document.getElementById("user-name").textContent = data.username + "'s Posts";
        let getUserPosts = await axios.get(`https://tarmeezacademy.com/api/v1/users/${userId}/posts`);
        let PostData = getUserPosts.data.data;
        for(const v of PostData)
        {
            let url = 'https://tarmeezacademy.com/images/users/fLuNve0p5nStBn8.jpg';
            let profile_image_url = "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=";
            if (typeof v.image === "string" && v.image.length > 0) {
                url = v.image;
            }
            if (typeof v.author.profile_image === "string" && v.author.profile_image.length > 0) {
                profile_image_url = v.author.profile_image;
            }
            const postToRender = document.createElement("div");
            postToRender.className = 'container';
            postToRender.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="col-9">
                    <div class="post bg-light pb-2 shadow">
                        <div class="top px-2 py-1">
                            <div class="cont">
                                <div class="pic">
                                    <img src=${profile_image_url}>
                                </div>
                                <div class="p-name d-flex justify-content-center align-items-center">
                                    <p class="username">@${v.author.username}</p>
                                </div>
                            </div>
                            <div class="display-menu">
                                <div class="remove-post" onclick="DeletePost(${v.id})">
                                    <p>Delete</p>
                                    <i class="fa-solid fa-trash"></i>
                                </div>
                                <div class="Update-post" data-bs-toggle="modal" data-bs-target="#UpdateModal" onclick="getPostId(${v.id})">
                                    <p>Update</p>
                                    <i class="fa-solid fa-pen"></i>
                                </div>
                            </div>
                        </div>
                        <div class="image-post" onclick="postClicked(${v.id})">
                            <img class="rounded" src=${url}>
                            <p id="time">${v.created_at}</p>
                            <p id="title">${v.title ? v.title : ""}</p>
                            <p id="content">${v.body ? v.body : ""}</p>
                        </div>
                        <div class="comment-sec">
                            <div class="icon d-flex justify-content-center align-items-center">
                                <button id="comment" type="button" onclick="displayComments(${v.id}, this)">
                                    <i class="fa-regular fa-message"></i>
                                </button>
                                <p style="margin-bottom: 0px;">(${v.comments_count}) Comments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
            let tags = v.tags.length > 0 ? v.tags : ['test1', 'test2', 'test3'];
            const tagsNode = createTags(tags);
            postToRender.querySelector(".comment-sec").appendChild(tagsNode);
            document.getElementById("posts").appendChild(postToRender);
            if (userId === localStorage.getItem("userId")) {
                const menu_btn = document.createElement("button");
                menu_btn.className = "menu-btn";
                menu_btn.type = "button";
                menu_btn.innerHTML = `
                <i class="fa-solid fa-ellipsis-vertical"></i>
            `
                postToRender.querySelector(".top").appendChild(menu_btn);
            }
        }
    }
    catch(e)
    {
        console.log(e);
    }
    finally{
        hideLoader();
    }
}
displayProfile();

let isOpen = false;
document.getElementById("posts").addEventListener("click", (e)=>{
    e.stopPropagation();
    const menuBtn = e.target.closest(".menu-btn");
    if (!menuBtn) return;
    const top = menuBtn.closest(".top");
    top.querySelector(".display-menu").style.display = isOpen ? 'none':'block';
    isOpen = !isOpen;
});
// remove post
async function DeletePost(postId)
{
    try{
        let trust = confirm("You sure about deleting this post?");
        if (trust)
        {
            const token = localStorage.getItem("token");
            let Delete_Response = await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`,
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                }
            );
            document.getElementById("posts").innerHTML = '';
            document.getElementById("profile-card").innerHTML = '';
            displayProfile();
            showAlert('post deleted succussfully!', 'success');
        }
    }
    catch(e)
    {
        console.error(e.response?.data?.message);
    }
}

function getPostId(postId)
{
    localStorage.setItem("postId", postId);
}
async function UpdatePost()
{
    try{
        let trust = confirm("You sure about updating this post?");
        if (trust) 
        {
            const newTitle = document.getElementById("new-title");
            const newBody = document.getElementById("new-body");
            const postId = localStorage.getItem("postId");
            const token = localStorage.getItem("token");
            let response = await axios.put(`https://tarmeezacademy.com/api/v1/posts/${postId}`,
                {
                    title: newTitle.value,
                    body: newBody.value
                },
                {
                    headers: { 'Authorization': 'Bearer ' + token }
                }
            )
            document.getElementById("posts").innerHTML = '';
            document.getElementById("profile-card").innerHTML = '';
            displayProfile();
            const modal = document.getElementById("UpdateModal");
            const modalinstance = bootstrap.Modal.getInstance(modal);
            modalinstance.hide();
            showAlert('post updated succussfully!', 'success');
        }
    }
    catch(e)
    {
        console.error(e);
    }
}

document.addEventListener("click", (e) => {
    if (!isOpen) return;

    const clickedMenuBtn = e.target.closest(".menu-btn");
    const clickedMenu = e.target.closest(".display-menu");

    if (!clickedMenuBtn && !clickedMenu) {
        document
            .querySelectorAll(".display-menu")
            .forEach(menu => menu.style.display = "none");
        isOpen = false;
    }
});