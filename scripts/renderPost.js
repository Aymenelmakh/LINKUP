function renderPost(postId) {
    const posts = JSON.parse(localStorage.getItem("postData"));
    const postData = posts.find(p => p.id === postId);
    let url = 'https://tarmeezacademy.com/images/users/fLuNve0p5nStBn8.jpg';
    let profile_image_url = "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=";
    if (typeof postData.image === "string" && postData.image.length > 0) {
        url = postData.image;
    }
    if (typeof postData.author.profile_image === "string" && postData.author.profile_image.length > 0) {
        profile_image_url = postData.author.profile_image;
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
                                <p class="username" onclick="toProfile(${postData.author.id})">@${postData.author.username}</p>
                            </div>
                        </div>
                    </div>
                    <div class="image-post" onclick="postClicked(${postId})">
                        <img class="rounded" src=${url}>
                        <p id="time">${postData.created_at}</p>
                        <p id="title">${postData.title ? postData.title : ""}</p>
                        <p id="content">${postData.body}</p>
                    </div>
                    <div class="comment-sec">
                        <div class="icon d-flex justify-content-center align-items-center">
                            <button class="comment" type="button" onclick="displayComments(${postId}, this)">
                                <i class="fa-regular fa-message"></i>
                            </button>
                            <p style="margin-bottom: 0px;">(${postData.comments_count}) Comments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    let tags = postData.tags.length > 0 ? postData.tags : ['test1', 'test2', 'test3'];
    const tagsNode = createTags(tags);
    postToRender.querySelector(".comment-sec").appendChild(tagsNode);
    document.getElementById("posts").appendChild(postToRender);
}