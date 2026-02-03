function postClicked(postId) {
    window.location = `./post.html?postId=${postId}`;
}
// showComments
function displayComments(postId, btn) {
    const postEl = btn.closest(".post");
    let com_sec = postEl.querySelector(".comments-section");
    if (!com_sec) {
        com_sec = document.createElement("div");
        com_sec.className = 'comments-section';
        postEl.appendChild(com_sec);
        getComments(postId, com_sec);
    }
    else {
        com_sec.remove();
    }
}

// get single user
async function getUser(userId) {
    const res = await axios.get(
        `https://tarmeezacademy.com/api/v1/users/${userId}`
    );
    return res.data.data;
}
async function getComments(postId, com_sec) {
    showLoader();
    try {
        const token = localStorage.getItem("token");
        let commentsResponse = await axios.get(`https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            });
        let comments = commentsResponse.data.data;
        com_sec.innerHTML = "";
        for (const c of comments) {
            const user = await getUser(c.author_id);
            const com = document.createElement("div");
            com.innerHTML = `
                <div class="comment-info">
                    <div class="c">
                        <div class="pic">
                            <img src=${user.profile_image.length > 0 ? user.profile_image : "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="}>
                        </div>
                        <div class="p-name d-flex justify-content-center align-items-center">
                            <p class="username" onclick="toProfile(${user.id})">${user.username}</p>
                        </div>
                    </div>
                    <p id="text">${c.body}</p>
                </div>
            `
            com_sec.appendChild(com);
        }
        const input_field = document.createElement("div");
        input_field.className = "input-field";
        input_field.innerHTML = `
            <div class="msg">
                <input type="text" class="write-comment" placeholder="Write a comment">
                <button type="button" class="send-btn" onclick="postComment(${postId}, this)">➤</button>
            </div>
        `
        com_sec.appendChild(input_field);
    }
    catch (e) {
        console.log(e.response?.data?.message);
        com_sec.innerHTML = 'Please Login to see Comments';
    }
    finally{
        hideLoader();
    }
}

async function SendComment(content, postId) {
    try {
        const token = localStorage.getItem("token");
        let postCommentRes = axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
            {
                body: content
            },
            {
                headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + token }
            });
    }
    catch (e) {
        console.log(e.response?.data?.message);
    }
}
function postComment(postId, btn) {
    const comment_parent = btn.closest(".msg");
    const comment_content = comment_parent.querySelector(".write-comment");
    if (!comment_content.value) return;

    const com_sec = comment_parent.closest(".comments-section");
    const getImage = localStorage.getItem("imageUrl");
    const getUsername = localStorage.getItem("username");
    if (!getImage || !getUsername) return;
    const addComment = document.createElement("div");
    addComment.className = 'comment-info';
    addComment.innerHTML = `
        <div class="c">
            <div class="pic">
                <img src=${getImage.length > 0 ? getImage : "https://media.istockphoto.com/id/2171382633/vector/user-profile-icon-anonymous-person-symbol-blank-avatar-graphic-vector-illustration.jpg?s=612x612&w=0&k=20&c=ZwOF6NfOR0zhYC44xOX06ryIPAUhDvAajrPsaZ6v1-w="}>
            </div>
            <div class="p-name d-flex justify-content-center align-items-center">
                <p class="username">${getUsername}</p>
            </div>
        </div>
        <p id="text">${comment_content.value}</p>
    `
    com_sec.prepend(addComment);
    SendComment(comment_content.value, postId);
    comment_content.value = '';
}
