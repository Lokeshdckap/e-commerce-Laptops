const form = document.querySelector("#form")
const email = document.querySelector(".Email")
const password = document.querySelector(".PassWord")

String.prototype.isPassword = function () {
    return !!this.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
}

String.prototype.isEmail = function () {
    return !!this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
}

form.addEventListener("submit", (e) => {
    validation(e);
    function check(inputs) {
        inputs.forEach(element => {
            if (element.value) {
                checkLength(password, 6, 30)
                checkPassword(password)
                checkEmail(email)
            }
        })
    }
    check([email, password])
})

function box(inputs) {
    inputs.forEach(element => {
        element.addEventListener("keyup", (e) => {
            if (e.target.value === "") {
                errors(element, `* ${getValues(element)} is Required`)
            }
            else if(e.target == email) {
                success(email)
                checkEmail(email)
            }
            else if(e.target == password) {
                success(password)
                checkPassword(password)
                checkLength([password], 6, 30)
            }
        })
    })
}
box([email, password])

function checkRequired(inputs) {
    inputs.forEach(element => {
        if (element.value === "") {
            errors(element, `* ${getValues(element)} is Required`)
        }
        else {
            success(element)
        }
    });
}

function success(input) {
    const formGrp = input.parentElement
    formGrp.className = "formGrp success"
    const p = formGrp.querySelector("p")
    p.innerText = "";
}

function errors(input, msg) {
    const formGrp = input.parentElement
    formGrp.className = "formGrp required"
    const p = formGrp.querySelector("p")
    p.innerText = msg;

}

function getValues(input) {
    // return input.id
    return input.getAttribute("data-name")
}

function validation(e) {
    e.preventDefault()
    checkRequired([email, password])
}

function checkPassword(input) {
    if (!input.value.trim().isPassword()) {
        errors(input, '* Password Must be symbols & Special Characters')
    }

}

function checkEmail(input) {
    if (!input.value.trim().isEmail()) {
        errors(input, '*email Required & Not a valid email')
    }
}

function checkLength(inputs, min, max) {
    if (inputs.value.trim().length < min) {
        errors(inputs, `* ${getValues(inputs)} is must be atleast greater than ${min} characters`)
    }
    else if (inputs.value.trim().length > max) {
        errors(inputs, `* ${getValues(inputs)} is must be atleast lesser than ${max} characters`)
    }
    else {
        success(inputs)
    }
}
