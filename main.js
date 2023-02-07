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
    let uuidRegex2 = /^[a-f0-9]{32}$/
    let lowercaseMatches = ["ai art", "dreamup", "diffusion"]
    let regularCaseMatches = ["AI"]

    document.querySelectorAll("img[alt]").forEach(item => {
        let itemAttr = item.getAttribute("alt");
        let lowercaseAttr = itemAttr.toLowerCase();

        lowercaseMatches.forEach(match => {
            if (lowercaseAttr.includes(match)) {
                nukeByTitle(itemAttr, removedContent, item);
            }
        });

        regularCaseMatches.forEach(match => {
            if (itemAttr.includes(match)) {
                nukeByTitle(itemAttr, removedContent, item);
            }
        });

        if (uuidRegex.test(itemAttr)) {
            nukeByTitle(itemAttr, removedContent, item);
        }

        if (uuidRegex2.test(itemAttr)) {
            console.log("Potential SPICE from uuid...", itemAttr);
            nukeByTitle(itemAttr, removedContent, item);
        }

    });

    if (removedContent.length != 0 && log) {
        console.log(removedContent);
    }
}

// Helper function for nuking submissions based on title
function nukeByTitle(itemAttr, removedContent, item) {
    let parentElem = getParent(item, 3);
    console.log("AI Submission Title Detected:", itemAttr);
    removedContent.push(itemAttr);
    parentElem.remove();
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