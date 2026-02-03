//display up arrow
window.addEventListener("scroll", () => {
    const upBtn = document.querySelector(".up");
    if (window.scrollY >= 500) {
        upBtn.style.display = "block";
        upBtn.style.display = 'flex';
    }
    else {
        upBtn.style.display = "none";
    }
});
document.querySelector(".up").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});