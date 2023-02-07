// This function removes the art preview based on the AI artist's name
function nukeAIartistName(log = false) {
    let removedContent = [];
    document.querySelectorAll("a[data-username]").forEach(item => {
        let itemAttr = item.getAttribute("data-username");
        if (itemAttr.toLowerCase().includes("aiart") || itemAttr.includes("AI") || itemAttr.includes("Ai")) {
            console.log("AI Artist Detected:", itemAttr);
            let parentElem = getParent(item); // Defaults applied
            if (parentElem != null || parentElem != undefined) {
                console.log("Removing parent for AI Artist", itemAttr);
                removedContent.push(itemAttr);
                parentElem.remove();
            }
        }
    });
    if (removedContent.length != 0 && log) {
        console.log(removedContent);
    }
}

// This functions removes the art preview based on the submission title
function nukeAIsubmissionTitle(log = false) {
    let removedContent = [];
    let uuidRegex = /^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/; // Ironically used ChatGPT cause I can't do REGEX lol
    document.querySelectorAll("img[alt]").forEach(item => {
        let itemAttr = item.getAttribute("alt");
        if (itemAttr.toLowerCase().includes("ai art") || itemAttr.includes("AI") || itemAttr.toLowerCase().includes("dreamup") || itemAttr.toLowerCase().includes("diffusion") || uuidRegex.test(itemAttr)) {
            console.log("AI Submission Title Detected:", itemAttr);
            removedContent.push(itemAttr);
            item.remove();
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
    nukeAIsubmissionTitle(true);
});