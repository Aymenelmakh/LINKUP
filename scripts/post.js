async function showPost()
{
    showLoader();
    try{
        const urlPrams = new URLSearchParams(window.location.search);
        const postId = urlPrams.get("postId");
        let showPostRes = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${postId}`);
        let data = showPostRes.data.data;
        let url = 'https://tarmeezacademy.com/images/users/fLuNve0p5nStBn8.jpg';
        let profile_image_url = "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w=";
        if (typeof data.image === "string" && data.image.length > 0) {
            url = data.image;
        }
        if (typeof data.author.profile_image === "string" && data.author.profile_image.length > 0) {
            profile_image_url = data.author.profile_image;
        }
        const postToRender = document.createElement("div");
        postToRender.className = 'container';
        postToRender.innerHTML = `
            <div class="d-flex justify-content-center">
                <div class="col-9">
                    <h4 id="user-name">${data.author.username}'s Post</h4>
                    <div class="post bg-light pb-2 shadow">
                        <div class="top px-2 py-1">
                            <div class="cont">
                                <div class="pic">
                                    <img src=${profile_image_url}>
                                </div>
                                <div class="p-name d-flex justify-content-center align-items-center">
                                    <p class="username" onclick="toProfile(${data.author.id})">@${data.author.username}</p>
                                </div>
                            </div>
                        </div>
                        <div class="image-post">
                            <img class="rounded" src=${url}>
                            <p id="time">${data.created_at}</p>
                            <p id="title">${data.title ? data.title:""}</p>
                            <p id="content">${data.body ? data.body:""}</p>
                        </div>
                        <div class="comment-sec">
                            <div class="icon d-flex justify-content-center align-items-center">
                                <button id="comment" type="button">
                                    <i class="fa-regular fa-message"></i>
                                </button>
                                <p style="margin-bottom: 0px;">(${data.comments_count}) Comments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        let tags = data.tags.length > 0 ? data.tags : ['test1', 'test2', 'test3'];
        const tagsNode = createTags(tags);
        postToRender.querySelector(".comment-sec").appendChild(tagsNode);
        document.getElementById("posts").appendChild(postToRender);
        com_sec = document.createElement("div");
        com_sec.className = 'comments-section';
        const postEl = document.querySelector(".post");
        postEl.appendChild(com_sec);
        getComments(postId, com_sec);
    }
    catch(e)
    {
        console.log(e.response?.data?.message);
    }
    finally{
        hideLoader();
    }
}
showPost();