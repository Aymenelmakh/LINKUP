let page = 1;
let isLoading = false;
let hasMore = true;

async function getPosts(page = 1) {
    showLoader();
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
        hideLoader();
    }
}
getPosts();
//================================================================================================================================

// Paginnation
window.addEventListener("scroll", () => {
    const viewportHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    if (window.scrollY + viewportHeight >= fullHeight - 50 && !isLoading && hasMore)
    {
        isLoading = true;
        page++;
        getPosts(page);
    }
});


// Create post
async function addPost()
{
    try{
        const postTitle = document.getElementById("postTitle");
        const postBody = document.getElementById("postBody");
        const postData = new FormData();
        postData.append("title", postTitle.value);
        postData.append("body", postBody.value);
        const fileInput = document.querySelector("#postImage");
        if (fileInput.files.length > 0) {
            postData.append("image", fileInput.files[0]);
        }
        const token = localStorage.getItem("token");
        let add_Post_Response = await axios.post("https://tarmeezacademy.com/api/v1/posts", postData,
            {
                headers: { "Authorization":`Bearer ${token}`}
            });
        const modal = document.getElementById("postModal");
        const modalinstance = bootstrap.Modal.getInstance(modal);
        modalinstance.hide();
        showAlert('Post Created successful!',"success");
        document.getElementById("posts").innerHTML = '';
        getPosts();
    }
    catch(e)
    {
        showAlert(e.response?.data?.message,'danger');
    }
}
document.getElementById("createPost").addEventListener("click", ()=>{
    addPost();
});

document.querySelector(".toggle").addEventListener("click", () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");
    localStorage.setItem("isDark", isDark);
});