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