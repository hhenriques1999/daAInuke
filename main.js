// This function removes the art preview based on the AI artist's name
function nukeAIartistName(log = false) {
    let removedContent = [];
    document.querySelectorAll("a[data-username]").forEach(item => {
        let itemAttr = item.getAttribute("data-username");
        if (itemAttr.toLowerCase().includes("aiart") || itemAttr.includes("AI")) {
            console.log("AI Artist Detected:", itemAttr);
            let parentElem = getParent(item); // Defaults applied
            if (parentElem != null || parentElem != undefined) {
                console.log("Removing parent for AI Artist", itemAttr);
                removedContent.push(parentElem);
                parentElem.remove();
            }
        }
    });
    if (removedContent.length != 0 && log) {
        console.log(removedContent);
    }
}

// Get the parent, up to a certain amount (9 is good)
function getParent(item, amount = 9) {
    let temp = item;
    for (let i = 0; i < amount; i++) {
        temp = temp.parentElement;
    }
    return temp;
}

// Set the main event listener on the mouse wheel
window.addEventListener('wheel', function () {
    nukeAIartistName(true);
});