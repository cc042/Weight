// Forms
const form = document.querySelector("form")

// Weight
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
var saved_data;

// Status
const Status = document.querySelector(".results")

// Functions
function getNewWeight() {
    if (weight.value && Planet.value && weight.value >= 1) {
        const ObjectWeight = weight.value
        const planet = Planet.value

        Object.keys(AccDueToGravityon).forEach(key => {
            if (planet == key) {
                const gravity = AccDueToGravityon[key] // Number of the accleration due to gravity on the another planet
                const newWeight = (gravity * ObjectWeight) / AccDueToGravityon.earth
                Status.innerHTML = `your weight on ${planet} is: ${parseInt(newWeight)}KG`
            }
        })
    }
    else {
        Status.innerHTML = "Please Enter A Valid Data"
    }
}

// Event Listener
form.addEventListener("submit", e => { e.preventDefault(); getNewWeight() })