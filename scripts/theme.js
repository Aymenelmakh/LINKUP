(function () {
    const stored = localStorage.getItem("isDark");
    const isDark = stored === "true";

    document.documentElement.classList.toggle("dark", isDark);
})();