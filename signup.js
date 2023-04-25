const form = document.querySelector("#form")
const username = document.querySelector(".userName")
const email = document.querySelector(".Email")
const password = document.querySelector(".PassWord")
const passwordHide = document.querySelector('.fa-eye-slash')
// console.log(passwordHide);
let passInp;
passwordHide.addEventListener("click", () => {
    if (passwordHide.classList.contains('fa-eye-slash')) {
        passwordHide.className = 'fa-regular fa-eye'
        passInp = passwordHide.parentElement.previousElementSibling
        passInp.setAttribute('type', 'text')
    }
    else{
        passwordHide.className = 'fa-regular fa-eye-slash'
        passInp.setAttribute('type', 'password')
    }
})

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
                checkLength([username, password], 6, 30)
                checkPassword(password)
                checkEmail(email)
            }
            else {
                element.addEventListener("keyup", () => {
                    success(element)
                })
            }
        })
    }
    check([username, email, password])
})


function checkLength(inputs, min, max) {
    inputs.forEach(element => {
        if (element.value.trim().length < min) {
            errors(element, `* ${getValues(element)} is must be atleast greater than ${min} characters`)
        }
        else if (element.value.trim().length > max) {
            errors(element, `* ${getValues(element)} is must be atleast lesser than ${max} characters`)
        }
        else {
            success(element)
        }
    })
}

function checkPassword(input) {
    if (!input.value.trim().isPassword()) {
        errors(input, '* Password Must be symbols & Special Characters')
    }
}

function checkEmail(input) {
    if (!input.value.trim().isEmail()) {
        errors(input, '* This is not an valid email address')
    }
}

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

function validation(e) {
    e.preventDefault()
    checkRequired([username, email, password])
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

