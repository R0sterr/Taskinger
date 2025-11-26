const loginForm = document.querySelector('.login-box')
const loginUsername = document.getElementById('login-username')
const loginPassword = document.getElementById('login-password')
const loginBtn = document.querySelector('[data-btn="login"]')
const loginLink = document.querySelector('[data-link="login"]')
const loginInputs = [loginUsername, loginPassword]

const registerForm = document.querySelector('.register-box')
const registerUsername = document.getElementById('register-username')
const registerPassword = document.getElementById('register-password')
const confirmPassword = document.getElementById('confirm-password')
const registerBtn = document.querySelector('[data-btn="register"]')
const registerLink = document.querySelector('[data-link="register"]')
const registerInputs = [registerUsername, registerPassword, confirmPassword]
const popup = document.querySelector('.popup')
const popupBtn = popup.querySelector('button')

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

const currentLogin = localStorage.getItem('currentUserLogin');
const users = JSON.parse(localStorage.getItem('users'));
const currentUser = users.find(user => user.username === currentLogin);


if (currentUser) {
    window.location.href = 'main.html';
}


const usersDataBase = JSON.parse(localStorage.getItem('users'))

const showError = (input, msg) => {
    const formBox = input.parentElement
    const errorMsg = formBox.querySelector('.error-msg')

    formBox.classList.add('error')
    errorMsg.style.visibility = 'visible'
    errorMsg.textContent = msg
}

const clearError = (input) => {
    const formBox = input.parentElement
    const errorMsg = formBox.querySelector('.error-msg')
    formBox.classList.remove('error')
    errorMsg.style.visibility = 'hidden'
}

const checkForm = (array) => {
    array.forEach(input => {
        if(input.value !== '') {
            clearError(input)
        } else {
            showError(input, input.placeholder)
        }
    });
}

const checkLength = (input, min) => {
    if(input.value.length < min) {
        showError(input, `${input.previousElementSibling.textContent.slice(0,-1)} must have min.${min} characters`)
    }
}

const checkUserLogIn = () => {
    if(loginUsername.value !== '' && loginPassword.value !== '') {
        const user = usersDataBase.find(user => user.username === loginUsername.value && user.password === loginPassword.value);

        if (user) {
            localStorage.setItem('currentUserLogin', user.username); 
            window.location.href = 'main.html'; 
            loginUsername.value = ''
            loginPassword.value = ''
        } else {
            const loginExist = usersDataBase.some(user => user.username === loginUsername.value);
            if (!loginExist) {
                showError(loginUsername, "This account does not exist");
            } else {
                showError(loginPassword, "Password is incorrect");
            }
        }
    }
}

const addNewUser = () => {
        const newUser = {
            username: registerUsername.value,
            password: registerPassword.value,

            avatarUrl: 'img/avatars/default.svg',
            backgroundUrl: 'img/background-869599_1280.png',
            profile: {
                introduction: 'Nothing yet',
                employment: 'Nothing yet',
                email: 'Nothing yet',
                address: 'Nothing yet',
            },

            settings: {
                theme: 'light'
            },
            todos: [],
            taskId: 0,
            tasksEverCreated: 0
        }

        usersDataBase.push(newUser)
        localStorage.setItem('users', JSON.stringify(usersDataBase))
}

const checkPassword = (pass1, pass2) => {
    if(pass1.value !== pass2.value) {
        showError(pass2, "Passwords don't match each other")
    } 
}


const checkRegisterErrors = (array) => {
    const allInputs = registerForm.querySelectorAll('.form-box')
    let errorCount = 0
    allInputs.forEach(el => {
    if(el.classList.contains('error')) {
            errorCount++
        }
    })

    const ifExist = usersDataBase.some(user => user.username === registerUsername.value);
    if (ifExist) {
        showError(registerUsername, "This account already exist");
        errorCount++;
    }

    if(errorCount === 0) {
        addNewUser()
        localStorage.setItem('currentUserLogin', registerUsername.value);
        array.forEach(input => {
            input.value = ''
        })
        popup.classList.add('show-popup')
    }
}

const checkLoginErrors = (array) => {
    const allInputs = loginForm.querySelectorAll('.form-box')
    let errorCount = 0
    allInputs.forEach(el => {
    if(el.classList.contains('error')) {
            errorCount++
        }
    })

    if(errorCount === 0) {
        array.forEach(input => {
            input.value = ''
        })
    }
}

loginLink.addEventListener('click', () => {
    registerForm.style.display = 'none'
    loginForm.style.display = 'block'
    clearError(registerUsername)
    clearError(registerPassword)
    clearError(confirmPassword)

    registerForm.classList.add('fade')
    loginForm.classList.add('show') 
    loginForm.classList.remove('fade') 
})

registerLink.addEventListener('click', () => {
    registerForm.style.display = 'block'
    loginForm.style.display = 'none'
    clearError(loginUsername)
    clearError(loginPassword)

    registerForm.classList.remove('fade')
    registerForm.classList.add('show')
    loginForm.classList.add('fade')
})

loginBtn.addEventListener('click', () => {
    checkForm(loginInputs)
    checkLength(loginUsername, 3)
    checkLength(loginPassword, 8)
    checkUserLogIn()
})

registerBtn.addEventListener('click', () => {
    checkForm(registerInputs)
    checkLength(registerUsername, 3)
    checkLength(registerPassword, 8)
    checkPassword(registerPassword, confirmPassword)
    checkRegisterErrors(registerInputs)
})

popupBtn.addEventListener('click', () => {
    window.location.href = 'main.html'
})