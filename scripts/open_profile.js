function toProfile(userId = localStorage.getItem("userId")) {
    window.location = `./profile.html?userId=${userId}`;
}