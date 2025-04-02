// Context Menu
addEventListener("DOMContentLoaded", () => { document.querySelector(".Load").close() })
document.addEventListener('contextmenu', (e) => { e.preventDefault(); });
document.addEventListener("dblclick", e => { e.preventDefault(); return false })
document.onkeydown = function (e) { if (event.keyCode == 123) return false; if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false; if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false; if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false; if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false; if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) return false; if (e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)) return false; if (e.ctrlKey && e.key == "C".charCodeAt(0)) return false; if (e.ctrlKey && e.key == "X".charCodeAt(0)) return false; if (e.key == "Escape") return false; }

// Responsive
const aside = document.querySelector(".extend")
const extender = document.querySelector(".extender")
const closer = document.querySelector("#AsideClose")

closer.addEventListener("click", () => {
    aside.setAttribute("aria-open", false)
})

extender.addEventListener("click", () => {
    aside.setAttribute("aria-open", true)
})

function resize() {
    var width = innerWidth

    if (width > 580) {
        aside.setAttribute("aria-open", false)
    }
}

resize()
window.addEventListener("resize", resize)

// Error Alert
const ErrorMSG = document.querySelector(".msg")
const ErrorDialog = document.querySelector(".error")
const ErrorClose = document.querySelector(".errorClose")

ErrorClose.addEventListener("click", () => {
    ErrorDialog.close()
})
function showError(msg) {
    ErrorDialog.showModal()
    ErrorMSG.innerHTML = msg
}

// Normal Alert
const AlertMSG = document.querySelector(".Msg")
const AlertDialog = document.querySelector(".alert")
const AlertClose = document.querySelector(".AlertClose")

AlertClose.addEventListener("click", () => {
    AlertDialog.close()
})

function showAlert(msg) {
    AlertDialog.showModal()
    AlertMSG.innerHTML = msg
}

// Calculation
const form = document.querySelector(".WeightForm").addEventListener("submit", e => {
    e.preventDefault();
    new Calc(Weight.value, Planet.value.toLowerCase()).getNewWeight();
})
const Weight = document.querySelector("#weightinput")
const Planet = document.querySelector("#planetinput")
const result = document.querySelector(".result")

class Calc {
    constructor(weight, planet) {
        this.weight = weight
        this.planet = planet.toLowerCase()
        this.planetAcc = {
            "sun": 275,
            "mercury": 1,
            "venus": 8.8,
            "earth": 9.81,
            "mars": 3.7,
            "jupiter": 24.5,
            "saturn": 3,
            "uranus": 5,
            "neptune": 3,
            "pluto": 0.60,
        }
    }

    getNewWeight() {
        if (this.planetAcc[this.planet] && this.weight) {
            const NewWeight = this.weight * this.planetAcc[this.planet] / 9.81;
            result.innerHTML = Math.floor(NewWeight) + " Kg"
        }
        else {
            showError("Please Enter A Valid Form")
        }
    }
}

// Project
const ProjectDialog = document.querySelector(".project")
const Projectopen = document.querySelectorAll(".Projects")
const Projectclose = document.querySelector(".Projectclose")
const ProjectWrapper = document.querySelector(".projects")

const Projects = [
    { Name: "Portfolio", Link: "https://cc042.github.io/Portfolio", Description: "Introductry Website" },
    { Name: "Todo List", Link: "https://cc042.github.io/TodoList", Description: "Arrange For the Future" },
    { Name: "Islam", Link: "https://www.islam-ngs.vercel.app", Description: "For Muslims" },
    { Name: "Weather", Link: "https://cc042.github.io/Weather", Description: "Know The Weather AnyWhere" },
    { Name: "Qr Generator", Link: "#", Description: "Soon" },
]

for (let i = 0; i < Projects.length; i++) {
    ProjectWrapper.innerHTML += `<div class="Project"><h1>Name: ${Projects[i].Name}</h1><p>Link: <a href="${Projects[i].Link}">Click Here</a></p><p>Description: ${Projects[i].Description}</p></div>`
}


Projectopen.forEach(project => {
    project.addEventListener("click", () => {
        ProjectDialog.showModal()
    })
})

Projectclose.addEventListener("click", () => {
    ProjectDialog.close()
})

// follows
const FollowsDialog = document.querySelector(".Follows")
const Followsopen = document.querySelectorAll(".follows")
const Followsclose = document.querySelector(".Followsclose")
Followsopen.forEach(follows => {
    follows.addEventListener("click", () => {
        FollowsDialog.showModal()
    })
})

Followsclose.addEventListener("click", () => {
    FollowsDialog.close()
})