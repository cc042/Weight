// <------------------------------------------------------- WebSite Settings ----------------------------------------------------->
const dialogs = document.querySelectorAll("dialog");

dialogs.forEach(dialog => {
    dialog.addEventListener('close', () => { dialog.classList.remove('open') });

    document.querySelectorAll("#open-button").forEach(openBtn => {
        openBtn.addEventListener("click", () => {
            dialog.showModal();
            setTimeout(() => dialog.classList.add('open'));
        });
    })

    document.querySelectorAll("#close-button").forEach(closeBtn => {
        closeBtn.addEventListener("click", () => {
            const close = dialog.close() || dialog.removeEventListener('transitionend', close);

            dialog.addEventListener('transitionend', close);
            dialog.classList.remove('open');
        });
    })
})


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
// <---------------------------------------------------------- header ------------------------------------------------------------>
const alertDialog = document.querySelector(".alert1")
const alertMSG = document.querySelector(".alert1 ul")
const MSG = ``
// <---------------------------------------------------------- Program ----------------------------------------------------------->
// Elements
const form = document.querySelector("form")
const weight = document.querySelector(".weight")
const Planet = document.querySelector("#planets")

// Planets Settings
const AccDueToGravityon = {
    "mercury": 3.7,
    "venus": 8.87,
    "earth": 9.81,
    "mars": 3.71,
    "jupitur": 24.79,
    "saturn": 10.44,
    "uranus": 8.69,
    "neptune": 11.15,
    "pluto": 0.60,
}

// Settings
var savedData = []
var saved_data = {};

// Status
const Status = document.querySelector(".results")
// <---------------------------------------------------------- Functions ------------------------------------------------------>
function setNewWeight() {
    if (weight.value && Planet.value && weight.value >= 1 && weight.value <= 150) {
        const ObjectWeight = weight.value;
        const planet = Planet.value;

        Object.keys(AccDueToGravityon).forEach(key => {
            if (planet === key) {
                const gravity = AccDueToGravityon[key];
                const newWeight = (gravity * ObjectWeight) / AccDueToGravityon.earth;
                Status.innerHTML = `The weight on ${planet}: ${parseInt(newWeight)}KG`;

                const savedObject = {
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
    else {
        if (weight.value >= 1 || weight.value <= 150) {
            Status.innerHTML = `
            Please Check The Weight
            <br>
            <small>
                Weight Must be between 1 and 150
            </small>`
        }
        else if (Planet.value == null || Planet.value == "") {
            Status.innerHTML = `Please Check The Planet`
        }
        else {
            Status.innerHTML = `Please Enter A Valid Form`
        }
    }
}

function getTheNewWeight() {
    var savedData = localStorage.getItem("ObjectWeight")
    if (savedData) {
        savedData = JSON.parse(savedData)
        savedData.forEach((item, index) => {
            const newWeight = item.newWeightWithPoints
            const newWeightWithoutPoints = item.newWeightWithoutPoints
            const planet = item.planet
            const description = item.description

            Status.innerHTML = description
            Planet.value = planet
            weight.value = parseInt(newWeight)
        })
    }
}


getTheNewWeight()
// <----------------------------------------------------- Event Listener ----------------------------------------------------->
form.addEventListener("submit", e => { e.preventDefault(); setNewWeight() })