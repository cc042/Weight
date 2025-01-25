// <---------------------------------------------------------- Context Menu ------------------------------------------------------>
document.addEventListener('contextmenu', (e) => { e.preventDefault() });
document.addEventListener("dblclick", e => { e.preventDefault(); return false })
document.onkeydown = function (e) {
    if (event.keyCode == 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)) return false;
    if (e.key == "Escape") return false;
}
// <---------------------------------------------------------- openers ----------------------------------------------------------->
const Instructions = document.querySelectorAll(".Instructions")
const projectbtn = document.querySelectorAll(".projectbtn")
const InstructionsDialog = document.querySelector(".instructionsdialog")
const Projectsdialog = document.querySelector(".Projectsdialog")

Instructions.forEach(Instruction => {
    Instruction.addEventListener("click", () => {
        InstructionsDialog.showModal()
    })
})

projectbtn.forEach(btn => {
    btn.addEventListener("click", () => {
        Projectsdialog.showModal()
    })
})
// <---------------------------------------------------------- Success ----------------------------------------------------------->
const SuccessDialog = document.querySelector(".success")
const SuccessTitle = document.querySelector(".success__title")
// <---------------------------------------------------------- Failure ----------------------------------------------------------->
const FailureDialog = document.querySelector(".error")
const FailureTitle = document.querySelector(".error__title")
// <---------------------------------------------------------- Objects ----------------------------------------------------------->
const AccDueToGravityon = {
    "mercury": 3.7,
    "venus": 8.87,
    "earth": 9.81,
    "mars": 3.71,
    "jupiter": 24.79,
    "saturn": 10.44,
    "uranus": 8.69,
    "neptune": 11.15,
    "pluto": 0.60,
}

const projects = [
    { NAME: "Portfolio", LINK: "https://cc042.github.io/Portfolio", DESCRIPTION: "Introductory site" },
    { NAME: "Todo List", LINK: "https://cc042.github.io/TodoList", DESCRIPTION: "Plan for the future" },
    { NAME: "Weather", LINK: "https://cc042.github.io/Weather", DESCRIPTION: "Find the weather anytime, anywhere" },
    { NAME: "ECHO-AI", LINK: "https://cc042.github.io/Echo-AI", DESCRIPTION: "experimental" },
    { NAME: "Islam", LINK: "https://cc042.github.io/Islam", DESCRIPTION: "For Muslims" },
]

// <---------------------------------------------------------- Program ----------------------------------------------------------->
// Elements
const form = document.querySelector("form")
const weight = document.querySelector(".weight")
const Planet = document.querySelector("#planets")
const Status = document.querySelector(".results")
const aside = document.querySelector("aside")
const ProjectContent = document.querySelector(".ProjectContent")

// Settings
const attr = "aria-opened"
var savedData = []
var saved_data = {};

// <---------------------------------------------------------- Functions ------------------------------------------------------>
function setNewWeight() {
    if (weight.value && Planet.value && weight.value >= 1 && weight.value <= 150) {
        const ObjectWeight = weight.value;
        const planet = Planet.value;
        adjustWeight(planet, ObjectWeight)
    }
    else {
        handleErrors()
    }
}

function handleErrors() {
    if (weight.value >= 1 || weight.value <= 150) {
        weight.value = weight.value >= 75 ? weight.value = 150 : weight.value = 1
        showError("The weight must Between 1 to 150kg")
    }
    if (Planet.value == null || Planet.value == "") {
        showError("Please Enter The Planet Name")
    }
    if (
        (Planet.value == null || Planet.value == "") &&
        (weight.value >= 1 || weight.value <= 150) ||
        (weight.value == "" || weight.value == null)
    ) showError("Please Enter A valid Form")
}

function adjustWeight(planet, ObjectWeight) {
    Object.keys(AccDueToGravityon).forEach(key => {
        if (planet === key) {
            const gravity = AccDueToGravityon[key];
            const newWeight = (gravity * ObjectWeight) / AccDueToGravityon.earth;
            Status.innerHTML = `The weight on ${planet}: ${parseInt(newWeight)}KG`;

            const savedObject = {
                weight: weight.value,
                newWeightWithPoints: newWeight,
                newWeightWithoutPoints: parseInt(newWeight),
                planet: planet,
                description: Status.innerHTML
            };

            savedData.push(savedObject); // Add the object to the savedData array

            localStorage.setItem("ObjectWeight", JSON.stringify(savedData)); // Store the array of objects
        }
    });
}

function getTheNewWeight() {
    var savedData = localStorage.getItem("ObjectWeight")
    if (savedData) {
        savedData = JSON.parse(savedData)
        savedData.forEach((item, index) => {
            const newWeight = item.weight
            const planet = item.planet
            const description = item.description

            Status.innerHTML = description
            Planet.value = planet
            weight.value = parseInt(newWeight)
        })
    }
}

function extendScreen() {
    var width = innerWidth

    if (width <= 500) {
        aside.setAttribute(attr, true)
    }
    else {
        aside.setAttribute(attr, false)
    }
}

function closeAside() {
    aside.setAttribute(attr, false)
}

function resize() {
    var width = innerWidth

    if (width >= 500) {
        aside.setAttribute(attr, false)
    }
}

function showAlert(msg) {
    SuccessDialog.showModal()
    SuccessTitle.innerHTML = msg
}

function showError(msg) {
    FailureDialog.showModal()
    FailureTitle.innerHTML = msg
}

function closeDialog(Class) {
    document.querySelector(`.${Class}`).close()
}

for (let i = 0; i < projects.length; i++) {
    ProjectContent.innerHTML += `<div class="project">
                    <h1>Name: ${projects[i].NAME}</h1>
                    <p>Link: <a href="${projects[i].LINK}">Click Here</a></p>
                    <p>Description: ${projects[i].DESCRIPTION}</p>
                </div>`
}
// <--------------------------------------------------------- Event Listener & functions ----------------------------------------->
form.addEventListener("submit", e => { e.preventDefault(); setNewWeight() })
window.addEventListener("resize", resize)
resize()
getTheNewWeight()