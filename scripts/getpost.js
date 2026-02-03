// For tags
function createTags(tags) {
    const tagContainer = document.createElement("div");
    tagContainer.className = 'tags d-flex align-items-center';
    tagContainer.style.flexWrap = 'wrap';
    for (const w of tags) {
        const text = document.createElement("p");
        text.textContent = w;
        text.style.marginBottom = '0';
        tagContainer.appendChild(text);
    }
    return tagContainer;
}
function renderPost(postId)
{
    const posts =  JSON.parse(localStorage.getItem("postData"));
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
                                <p class="username" >@${postData.author.username}</p>
                            </div>
                        </div>
                        <button id="menu-btn" type="button"><i class="fa-solid fa-ellipsis-vertical"></i></button>
                    </div>
                    <div class="image-post">
                        <img class="rounded" src=${url}>
                        <p id="time">${postData.created_at}</p>
                        <p id="title">${postData.title ? postData.title : ""}</p>
                        <p id="content">${postData.body}</p>
                    </div>
                    <div class="comment-sec">
                        <div class="icon d-flex justify-content-center align-items-center">
                            <button class="comment" type="button">
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
async function getPosts(page=1) {
    try {
        let response = await axios.get(`https://tarmeezacademy.com/api/v1/posts?page=${page}&limit=15`);
        let data = response.data.data;
        if (data.length === 0) {
            hasMore = false;
            return;
        }
        localStorage.setItem("postData", JSON.stringify(data));
        for (v of data) {
            renderPost(v.id); 
        }

    }
    catch (e) {
        console.log(e.response.data.message);
    }
    finally {
        isLoading = false;
    }
}