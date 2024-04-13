// This function removes the art preview based on the AI artist's name

const AIartistList = [
    'infinite-sequence', 
    'DWBY', 
    'Sangued', 
    'piritipany', 
    'ProGamerGov', 
    'miss-hp', 
    'seedmole', 
    'kosu811', 
    'TinyPasta', 
    'mortalifical', 
    'Adellanuki', 
    'idlekairos', 
    'T-N-C', 
    'RDigitalArtist', 
    'legendaryroller', 
    'pizzaiolo1977', 
    'The-PuddingKing', 
    'Robo10ND2', 
    'DigitalSummers', 
    "Nathan477", 
    "in-the-mind-of-ai", 
    "aiARTshowcase", 
    "FakeArtistUsingAI", 
    "dyonix01", 
    "torakun14", 
    "artforagame", 
    "sgjoelface",
    "Baileyarthead",
    "devilo4ek",
    "ArtisticAIArtGalaxy",
    "AIadoptions",
    "LyebethD",
    "InkImagine",
    "BNJacob",
    "AiAdoptablesPalace"
];

function nukeAIbyArtistName(log = false) {
    let removedContent = [];
    document.querySelectorAll("a[data-username]").forEach(item => {
        let itemAttr = item.getAttribute("data-username");
        if (item !== null && item !== undefined) {
            let parentElem = getParent(item);

            /*  
                List of (to be believed) AI Artists and filters. 
                I apologize if you're in that list unfairly.
                I went by the AI Art category/own criteria (aka pulled it out of my *ss) 
            */

            const specialStrings = ["AI", "Ai"]
            
           

            AIartistList.forEach(filterName => {
                if (itemAttr.toLowerCase().includes(filterName.toLowerCase())) {
                    console.log(`AI Artist or Filter ${filterName} detected. Nuking...`);
                    removedContent.push(itemAttr);
                    if (parentElem !== null) {
                        parentElem.remove();
                    }
                }
            });

            specialStrings.forEach(string => {
                if (itemAttr.includes(string)) {
                    removedContent.push(itemAttr);
                    if (parentElem !== null) {
                        parentElem.remove();
                    }
                }
            });

            // Lowercase Situations Only
            if (itemAttr.toLowerCase().includes("aiart") || itemAttr.includes("AI") || itemAttr.includes("Ai")) {
                console.log("AI Artist Detected:", itemAttr);
                if (parentElem != null || parentElem != undefined) {
                    console.log("Removing parent for AI Artist", itemAttr);
                    removedContent.push(itemAttr);
                    if (parentElem !== null) {
                        parentElem.remove();
                    }
                }
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
    let uuidRegexList = [/^[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}$/, /^[a-f0-9]{32}$/, /\d{5}-\d{10}$/, /^MJ-\d+$/];

    let lowercaseMatches = ["ai art", "dreamup", "diffusion"];
    let regularCaseMatches = ["AI", "Ai ", "A.I"];

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

        uuidRegexList.forEach(regex => {
            if (regex.test(itemAttr)) {
                nukeByTitle(itemAttr, removedContent, item);
            }
        });

    });

    if (removedContent.length != 0 && log) {
        console.log(removedContent);
    }
}

// Helper function for nuking submissions based on title
function nukeByTitle(itemAttr, removedContent, item) {
    if (item !== null && item !== undefined) {
        let parentElem = getParent(item, 3);
        console.log("AI Submission Title Detected:", itemAttr);
        removedContent.push(itemAttr);
        if (parentElem !== null) {
            parentElem.remove();
        }
    }
}

// Get the parent, up to a certain amount (9 is good)
function getParent(item, amount = 9) {
    for (let i = 0; i < amount && item.parentElement !== null; i++) {
        item = item.parentElement;
    }
    return item.parentElement !== null ? item : null;
}

// Set the main event listener on the mouse wheel
window.addEventListener('wheel', function () {
    nukeAIbyArtistName(false);
    nukeAIsubmissionTitle(false);
});