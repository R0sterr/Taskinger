// LOCAL STORAGE

const currentLogin = localStorage.getItem('currentUserLogin');
const users = JSON.parse(localStorage.getItem('users')) || [];
const currentUser = users.find(user => user.username === currentLogin);

// console.log(currentUser);
// localStorage.clear()

// NEW TASK CONTAINER
const newTaskContainer = document.querySelector('.new-task-container')
const progressTaskContainer = document.querySelector('.in-progress-tasks-container')
const finishedTasksContainer = document.querySelector('.finished-tasks-container')

const handleSavedNewTasks = () => {
    // console.log(currentUser.todos);
    currentUser.todos.forEach(task => {
        const parser = new DOMParser();
        const node = parser.parseFromString(task.html, "text/html").body.firstElementChild;

        if (task.status === "newTask"){
             newTaskContainer.appendChild(node)
        }
        if (task.status === "inProgress"){
             progressTaskContainer.appendChild(node)
        }
        if (task.status === "finished"){
            finishedTasksContainer.appendChild(node)
        }
    })
}

const profilePicture = document.querySelector('.pfp')
const backgroundProfilePicture = document.querySelector('.profile-header')
const introduction = document.querySelector('.profile-description')
const employment = document.querySelector('.company-info')
const email = document.querySelector('.email-info')
const address = document.querySelector('.address-info')
const backgroundInput = document.querySelector('#backgroundUrl')
const profileUsername = document.querySelector('.profile-username')

const loadProfileData = () => {
    if (currentUser.avatarUrl) {
        profilePicture.setAttribute('src', currentUser.avatarUrl);
    }
    if (currentUser.backgroundUrl) {
        backgroundProfilePicture.style.backgroundImage = `url('${currentUser.backgroundUrl}')`;
    }

    if (currentUser.profile) {
        introduction.textContent = currentUser.profile.introduction || 'Nothing yet';
        employment.textContent = currentUser.profile.employment || 'Nothing yet';
        email.textContent = currentUser.profile.email || 'Nothing yet';
        address.textContent = currentUser.profile.address || 'Nothing yet';
    }

    if(currentUser.username) {
        profileUsername.textContent = currentUser.username
    }
}

const toggle = document.querySelector('#themeSwitch')
const ulList = document.querySelector('.sidebar ul')
const editTaskPopup = document.querySelector('.edit-box')
const addTaskPopup = document.querySelector('.add-task-popup')
const profilePopup = document.querySelector('.profile-popup')
const editProfilePopup = document.querySelector('.edit-profile-popup')
const movePopup = document.querySelector('.move-popup')
const settingsPopup = document.querySelector('.settings-popup')
const changeUsernamePopup = document.querySelector('.username-popup')
const changePasswordPopup = document.querySelector('.password-popup')
const deleteAccPopup = document.querySelector('.delete-acc-popup')

const loadSavedTheme = () => {
    if (currentUser.settings && currentUser.settings.theme === 'dark') {
        toggle.checked = true;
        
        document.body.classList.add('dark-mode');
        ulList.classList.add('dark-mode');
        addTaskPopup.classList.add('dark-mode');
        editTaskPopup.classList.add('dark-mode');
        movePopup.classList.add('dark-mode');
        profilePopup.classList.add('dark-mode');
        editProfilePopup.classList.add('dark-mode');
        settingsPopup.classList.add('dark-mode');
        changeUsernamePopup.classList.add('dark-mode');
        changePasswordPopup.classList.add('dark-mode');
        deleteAccPopup.classList.add('dark-mode')
    }
}

if (currentUser === undefined) {
    window.location.href = 'index.html';
} else {
    document.title = `Taskinger - ${currentUser.username}'s panel`
    handleSavedNewTasks()
    loadProfileData()
    loadSavedTheme()
}

const logOutBtn = document.querySelector('.log-out')

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem("currentUserLogin")
    location.reload(true);
})

// SIDEBAR

const home = document.querySelector('.home')
const homeSection = document.querySelector('.home-section')
const task = document.querySelector('.task')
const taskSection = document.querySelector('.new-tasks-section')
const progress = document.querySelector('.progress')
const progressSection = document.querySelector('.in-progress-tasks-section')
const done = document.querySelector('.done')
const doneSection = document.querySelector('.done-tasks-section')


home.addEventListener('click', () => {
    home.classList.add('active')
    homeSection.style.display = 'flex'
    const items = [task,progress,done,]
    items.forEach(item => item.classList.remove('active'))
    const blocks = [taskSection, progressSection, doneSection]
    blocks.forEach(item => item.style.display = 'none')
})
task.addEventListener('click', () => {
    task.classList.add('active')
    taskSection.style.display = 'flex'
    const items = [home,progress,done,]
    items.forEach(item => item.classList.remove('active'))
    const blocks = [homeSection, progressSection, doneSection]
    blocks.forEach(item => item.style.display = 'none')
})
progress.addEventListener('click', () => {
    progress.classList.add('active')
    progressSection.style.display = 'flex'
    const items = [task,home,done,]
    items.forEach(item => item.classList.remove('active'))
    const blocks = [taskSection, homeSection, doneSection]
    blocks.forEach(item => item.style.display = 'none')
})
done.addEventListener('click', () => {
    done.classList.add('active')
    doneSection.style.display = 'flex'
    const items = [task,progress,home,]
    items.forEach(item => item.classList.remove('active'))
    const blocks = [taskSection, progressSection, homeSection]
    blocks.forEach(item => item.style.display = 'none')
})

const popupShadow = document.querySelector('.popup-shadow')
const closePopup = document.querySelector('.close-popup')
const titlePopup = document.querySelector('#title')
const descriptionPopup = document.querySelector('#description')
const estimationPopup = document.querySelector('#estimation')
const typePopup = document.querySelector('#type')
const priorityPopup = document.querySelector('#priority')
const addTaskBtn = document.querySelector('.add-task-btn')
const popupAdd = document.querySelector('.popup-add')
const popupError = document.querySelector('.popup-error')


// GLOBAL

const handleAnimations = (el) => {
    el.classList.remove('fade')
    popupShadow.classList.remove('fade')
    el.style.display = 'block'
    el.classList.add('show')
    popupShadow.style.display = 'block'
    popupShadow.classList.add('show')
}

const popupClose = (el) => {
    el.classList.remove('show')
    popupShadow.classList.remove('show')
    el.classList.add('fade')
    popupShadow.classList.add('fade')
    setTimeout(() => {
        el.style.display = 'none'
        popupShadow.style.display = 'none'
    }, 400)
    clearPopup(newTaskArr, priorityPopup, popupError)
}

const showError = (el) => {
    el.style.visibility = 'visible'
}

const clearPopup = (arr, priority, err) => {
    arr.forEach(el => el.value = '')
    priority.value = 'low'
    err.style.visibility = 'hidden'
}

// SMALL PROFILE

const profileSm = document.querySelector('.profile-sm')
const profileSmAvatar = profileSm.querySelector('img')
const profileSmUsername = profileSm.querySelector('p')

profileSmAvatar.setAttribute('src', currentUser.avatarUrl)
profileSmUsername.textContent = currentUser.username

// ADD TASK FUNCTION

addTaskBtn.addEventListener('click', () => handleAnimations(addTaskPopup))
closePopup.addEventListener('click', () => {
    popupClose(addTaskPopup) 
    clearPopup(newTaskArr, priorityPopup, popupError)
})



const newTaskArr = [titlePopup, descriptionPopup, estimationPopup, typePopup]

const createNewTask = () => {
    let taskId = currentUser.taskId
    taskId++
    const newTask = document.createElement('div')
    newTask.classList.add('new-task')
    newTask.setAttribute('data-taskid', taskId)

    newTask.innerHTML = `
        <div><span class="task-id">#${taskId}</span></div>
        <div><span><i class="fa-regular fa-pen-to-square"></i> Title: </span><span class="task-title">${titlePopup.value}</span></div>
        <div><span><i class="fa-regular fa-message"></i> Description: </span><span class="task-description">${descriptionPopup.value}</span></div>
        <div><span><i class="fa-regular fa-calendar"></i> Estimation: </span><span class="task-estimation">${estimationPopup.value}</span></div>
        <div><span><i class="fa-regular fa-file"></i> Type: </span><span class="task-type">${typePopup.value}</span></div>
        <div><span><i class="fa-solid fa-triangle-exclamation"></i> Priority: </span><span class="task-priority ${priorityPopup.value}">${priorityPopup.value}</span></div>
        <div><span class="task-type"><i class="fa-solid fa-pen"></i><i class="fa-solid fa-circle-arrow-right"></i><i class="fa-solid fa-trash-can"></i></span></div>
    `
    newTaskContainer.appendChild(newTask)

    currentUser.todos.push({
        taskId: taskId,
        html: newTask.outerHTML,
        status: "newTask"
    })

    currentUser.tasksEverCreated++

    currentUser.taskId++

    localStorage.setItem('users', JSON.stringify(users))
    // console.log(currentUser.todos);

    tasksCreatedCounter()
    clearPopup(newTaskArr, priorityPopup, popupError)
    popupClose(addTaskPopup) 
}

const newTask = () => {
    if(titlePopup.value !== '' && descriptionPopup.value !== '' && estimationPopup.value !== '' && typePopup.value !== '') {
        createNewTask()
    } else {
        showError(popupError)
    }
}

popupAdd.addEventListener('click', newTask)

// EDIT TASK FUNCTION

const editTaskClose = document.querySelector('.close-edit-popup')

editTaskClose.addEventListener('click', () => popupClose(editTaskPopup))

const editFor = editTaskPopup.querySelector('.edit-for')
const editTitle = editTaskPopup.querySelector('#edit-title')
const editDescription = editTaskPopup.querySelector('#edit-description')
const editEstimation = editTaskPopup.querySelector('#edit-estimation')
const editType = editTaskPopup.querySelector('#edit-type')
const editPriority = editTaskPopup.querySelector('#edit-priority')
const editError = editTaskPopup.querySelector('.popup-error')
const editTaskBtn = editTaskPopup.querySelector('.popup-add')
const editClose = editTaskPopup.querySelector('.close-popup')

const editArr = [editTitle,editDescription,editEstimation,editType]

editClose.addEventListener('click', () => {
    clearPopup(editArr, editPriority, editError)
    popupClose(editTaskPopup)                   
})

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-pen')) {
        handleAnimations(editTaskPopup)
        const parentEl = e.target.closest('.new-task')
        window.currentEditingTask = parentEl
        editFiller()
    }
})


const editFiller = () => {
    const title = window.currentEditingTask.querySelector('.task-title')
    const description = window.currentEditingTask.querySelector('.task-description')
    const estimation = window.currentEditingTask.querySelector('.task-estimation')
    const type = window.currentEditingTask.querySelector('.task-type')
    const priority = window.currentEditingTask.querySelector('.task-priority')
    editFor.textContent = title.textContent
    editTitle.value = title.textContent
    editDescription.value = description.textContent
    editEstimation.value = estimation.textContent
    editType.value = type.textContent
    editPriority.value = priority.textContent
}

const handleEdit = (el) => {
    if(editTitle.value !== '' && editDescription.value !== '' && editEstimation.value !== '' && editType.value !== '') {
        el.innerHTML = `
        <div><span class="task-id">#${el.getAttribute('data-taskid')}</span></div>
        <div><span><i class="fa-regular fa-pen-to-square"></i> Title: </span><span class="task-title">${editTitle.value}</span></div>
        <div><span><i class="fa-regular fa-message"></i> Description: </span><span class="task-description">${editDescription.value}</span></div>
        <div><span><i class="fa-regular fa-calendar"></i> Estimation: </span><span class="task-estimation">${editEstimation.value}</span></div>
        <div><span><i class="fa-regular fa-file"></i> Type: </span><span class="task-type">${editType.value}</span></div>
        <div><span><i class="fa-solid fa-triangle-exclamation"></i> Priority: </span><span class="task-priority ${editPriority.value}">${editPriority.value}</span></div>
        <div><span class="task-type"><i class="fa-solid fa-pen"></i><i class="fa-solid fa-circle-arrow-right"></i><i class="fa-solid fa-trash-can"></i></span></div>
    `
    const taskObj = currentUser.todos.find(t => t.taskId == el.getAttribute("data-taskid"));
    taskObj.html = el.outerHTML;

    localStorage.setItem("users", JSON.stringify(users));
    clearPopup(editArr, editPriority, editError)
    popupClose(editTaskPopup) 

    } else {
        showError(editError)
    }
}

editTaskBtn.addEventListener('click', () => {
    handleEdit(window.currentEditingTask)
    
})

// MOVE TO FUNCTION

const inProgressSection = document.querySelector('.in-progress-tasks-section')
const doneTasksSection = document.querySelector('.done-tasks-section')
const doneTasksContainer = doneTasksSection.querySelector('.new-task-container')

const movePopupClose = movePopup.querySelector('.close-edit-popup')
const moveBtn = movePopup.querySelector('.move-to-btn')
const moveSelect = document.getElementById('move-option')
const moveErr = movePopup.querySelector('.popup-error')

movePopupClose.addEventListener('click', () => {
    popupClose(movePopup)
    moveErr.style.visibility = 'hidden'
})

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-circle-arrow-right')) {
        handleAnimations(movePopup)
        const parentEl = e.target.closest('.new-task')
        window.currentMovingTask = parentEl
    }

})

const handleMoving = (el) => {
    const selectedValue = moveSelect.value;
    const currentTaskId = el.getAttribute("data-taskid");

    // Ustal nazwę sekcji docelowej (status)
    let newStatus = "";
    switch (selectedValue) {
        case "new-task-container":
            newStatus = "newTask";
            break;
        case "in-progress-tasks-container":
            newStatus = "inProgress";
            break;
        case "finished-tasks-container":
            newStatus = "finished";
            break;
    }

    // AKTUALIZACJA STATUSU W LOCAL STORAGE
    const updateTaskStatusLS = () => {
        

       const taskObj = currentUser.todos.find(t => t.taskId == currentTaskId);

        if (taskObj) {
            taskObj.status = newStatus;
        }

        localStorage.setItem("users", JSON.stringify(users));
    };

    // FUNKCJA: przeniesienie taska wizualnie
    const move = () => {
        const destination = document.querySelector(`.${selectedValue}`);

        destination.append(el);

        updateTaskStatusLS();     // ZAPIS DO LOCALSTORAGE

        pendingTasksCounter();
        finishedTasksCounter();
        popupClose(movePopup);
    };

    move();
};


moveBtn.addEventListener('click', () => handleMoving(window.currentMovingTask))

// DELETE TASK FUNCTION

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-trash-can')) {
        const parentEl = e.target.closest('.new-task')
        const taskIdToDelete = parentEl.getAttribute("data-taskid")
        parentEl.remove()
        const taskIndex = currentUser.todos.findIndex(t => t.taskId == taskIdToDelete)

        if (taskIndex > -1) {
            currentUser.todos.splice(taskIndex, 1)
            localStorage.setItem("users", JSON.stringify(users))
            tasksCreatedCounter()
            pendingTasksCounter()
            finishedTasksCounter()
        }
    }
})

// PROFILE FUNCTIONS

const profileBtn = document.querySelector('.profile')
const editProfileBtn = document.querySelector('.edit-profile-btn')
const profileShadow = document.querySelector('.profile-shadow')

const backgroundErr = document.querySelector('.background-box .error-msg')
const avatarErr = document.querySelector('.avatar-box .error-msg')
const avatarUpload = document.querySelector('.avatar-box #validateBtn')
const backgroundUpload = document.querySelector('.background-box #validateBtn2')
const avatarInput = document.querySelector('#avatarUrl')
const editProfileSave = document.querySelector('.edit-profile-save-btn')

const introductionInput = document.querySelector('#introduction')
const employmentInput = document.querySelector('#employment')
const emailInput = document.querySelector('#email')
const addressInput = document.querySelector('#address')


profileBtn.addEventListener('click', () => handleAnimations(profilePopup))

document.addEventListener('click', e => {
    if(e.target.classList.contains('close-profile-popup')) {
        popupClose(profilePopup)
    }
});

const msgClear = () => {
    backgroundErr.style.visibility = 'hidden'
    avatarErr.style.visibility = 'hidden'
}

const closeEditPopup = (el) => {
     el.classList.remove('show')
     profileShadow.classList.remove('show') 
     el.classList.add('fade')
     profileShadow.classList.add('fade') 

    const arr = [avatarInput, backgroundInput,introductionInput, employmentInput, addressInput, emailInput]

    arr.forEach(el => {
        el.value = ''
    })

    profilePopup.style.overflow = 'auto'

     setTimeout(() => {
         el.style.display = 'none'
         profileShadow.style.display = 'none'
     }, 400)
}

editProfileBtn.addEventListener('click', () => {
    editProfilePopup.classList.remove('fade')
    profileShadow.classList.remove('fade')

    editProfilePopup.style.display = 'block'
    editProfilePopup.classList.add('show')

    profileShadow.style.display = 'block'
    profileShadow.classList.add('show')

    profilePopup.style.overflow = 'hidden'

    introductionInput.value = introduction.textContent
    employmentInput.value = employment.textContent
    emailInput.value = email.textContent
    addressInput.value = address.textContent
})

editProfilePopup.addEventListener('click', e => {
    if(e.target.classList.contains('close-edit-profile-popup')) {
        closeEditPopup(editProfilePopup)
    }
})

const uploadBackground = () => {

    if(backgroundInput.value !== '') {
        backgroundProfilePicture.style.backgroundImage = `url('${backgroundInput.value}')`
        currentUser.backgroundUrl = backgroundInput.value
        localStorage.setItem("users", JSON.stringify(users))
        location.reload(true);
        msgClear()
        closeEditPopup(editProfilePopup)
    } else {
        backgroundErr.style.visibility = 'visible'
    }
}

const uploadAvatar = () => {

    if(avatarInput.value !== '') {
        profilePicture.setAttribute('src', avatarInput.value)
        currentUser.avatarUrl = avatarInput.value
        localStorage.setItem("users", JSON.stringify(users))
        location.reload(true);
        msgClear()
        closeEditPopup(editProfilePopup)
    } else {
        avatarErr.style.visibility = 'visible'
    }
}

backgroundUpload.addEventListener('click', () => uploadBackground())
avatarUpload.addEventListener('click', () => uploadAvatar())

editProfileSave.addEventListener('click', () => {

    introduction.textContent = introductionInput.value
    employment.textContent = employmentInput.value
    email.textContent = emailInput.value
    address.textContent = addressInput.value

    arr = [introduction, employment, email, address]

    arr.forEach(el => {
        if(el.textContent == '') {
            el.textContent = 'Nothing yet'
        }
    })
    
    currentUser.profile.introduction = introduction.textContent;
    currentUser.profile.employment = employment.textContent;
    currentUser.profile.email = email.textContent;
    currentUser.profile.address = address.textContent;

    localStorage.setItem("users", JSON.stringify(users));

    closeEditPopup(editProfilePopup)
    msgClear()
})

// TASK PROFILE COUNTER 

const tasksCreated = document.querySelector('.tasks-created')
const tasksPending = document.querySelector('.tasks-pending')
const tasksFinished = document.querySelector('.finished-tasks')

// TASKS CREATED

const tasksCreatedCounter = () => {
    tasksCreated.textContent = currentUser.tasksEverCreated
}

tasksCreatedCounter()

// PENDING TASKS

const pendingTasksCounter = () => {
    const pendingTasks = progressTaskContainer.querySelectorAll('.new-task')
    let sum = pendingTasks.length
    
    tasksPending.textContent = sum
}

pendingTasksCounter()

// FINISHED TASKS

const finishedTasksCounter = () => {
    const finishedTasks = finishedTasksContainer.querySelectorAll('.new-task')
    let sum = finishedTasks.length
    
    tasksFinished.textContent = sum
}

finishedTasksCounter()

// SETTINGS 

const settingsBtn = document.querySelector('.settings')
const changeUsernameBtn = document.querySelector('.username-box')
const changeUsernameInput = document.querySelector('#newUsername')
const changeUsernamePassw = document.querySelector('#confirmPassword')
const changeUsernameErr = document.querySelector('.settings-err')
const changeUsernameConfirm = document.querySelector('.confirm-btn')
const changePasswordBtn = document.querySelector('.password-box')
const newPassword = document.querySelector('#newPassword')
const oldPassword = document.querySelector('#oldPassword')
const changePasswordErr = changePasswordPopup.querySelector('.settings-err')
const changePasswordConfirm = changePasswordPopup.querySelector('.confirm-btn')

const deleteAccBtn = document.querySelector('.delete-acc-box')
const confirmPassword = document.querySelector('#deleteAccPassw')
const deleteAccErr = deleteAccPopup.querySelector('.settings-err')
const deleteAccConfirm = deleteAccPopup.querySelector('.confirm-btn')

settingsBtn.addEventListener('click', () => {
    handleAnimations(settingsPopup)
})

settingsPopup.addEventListener('click', e => {
    if(e.target.classList.contains('close-settings')) {
        popupClose(settingsPopup)
        settingsPopup.classList.remove('popup-active')
        
        const allPopups = document.querySelectorAll('.settings-popups')
        allPopups.forEach(el => {
            el.style.display = 'none'
        })
    }
})

// SETTINGS POPUPS

const hideError = (err) => {
    err.style.visibility = 'hidden'
}

const clearSettingsPopups = (arr, err) => {
    arr.forEach(el => el.value = '')
    err.style.visibility = 'hidden'
}

const openSettingsPopups = (el, err) => {
    el.style.display = 'flex'
    settingsPopup.classList.add('popup-active')
    hideError(err)
}

const closeSettingsPopups = (el) => {
    el.style.display = 'none'
    settingsPopup.classList.remove('popup-active')
}

const settingsShowError = (err) => {
    err.style.visibility = 'visible'
}


changeUsernameBtn.addEventListener('click', () => openSettingsPopups(changeUsernamePopup, changeUsernameErr))

changeUsernamePopup.addEventListener('click', e => {
    if(e.target.classList.contains('close-settings-popup')) {
        closeSettingsPopups(changeUsernamePopup)
        clearSettingsPopups([changeUsernameInput, changeUsernamePassw], changeUsernameErr)
    }
})

// CHANGE USERNAME 

// kanban.zip/kanban/js/main.js

// ... (znajdź istniejącą funkcję i zastąp ją)

const handleChangeUsername = () => {
    const newUsernameValue = changeUsernameInput.value.trim();
    const currentUserPassw = currentUser.password;
    const passwordInput = changeUsernamePassw.value;
    
    if (newUsernameValue === '') {
        changeUsernameErr.textContent = 'New username cannot be empty!';
        settingsShowError(changeUsernameErr);
        return;
    } 

    if (currentUserPassw !== passwordInput) {
        changeUsernameErr.textContent = 'Password does not match!';
        settingsShowError(changeUsernameErr);
        return;
    } 
    
    const usernameExists = users.some(user => user.username === newUsernameValue && user.username !== currentUser.username);

    if (usernameExists) {
        changeUsernameErr.textContent = 'This username is already taken.';
        settingsShowError(changeUsernameErr);
        return;
    }
    currentUser.username = newUsernameValue; 
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUserLogin', newUsernameValue);
    document.title = `Taskinger - ${newUsernameValue}'s panel`;
    
    closeSettingsPopups(changeUsernamePopup);
    clearSettingsPopups([changeUsernameInput, changeUsernamePassw], changeUsernameErr);
    hideError(changeUsernameErr);
    location.reload(true);
};

changeUsernameConfirm.addEventListener('click', handleChangeUsername)

// ...

changeUsernameConfirm.addEventListener('click', handleChangeUsername)

// CHANGE PASSWORD

changePasswordBtn.addEventListener('click', () => openSettingsPopups(changePasswordPopup, changePasswordErr))

changePasswordPopup.addEventListener('click', e => {
    if(e.target.classList.contains('close-settings-popup')) {
        closeSettingsPopups(changePasswordPopup)
        clearSettingsPopups([oldPassword, newPassword], changePasswordErr)
    }
})


const handleChangePassword = () => {
    const newPasswordValue = newPassword.value;
    const oldPasswordValue = oldPassword.value;
    const currentUserPassw = currentUser.password;

    if (newPasswordValue.length < 8 || oldPasswordValue !== currentUserPassw) {
        settingsShowError(changePasswordErr);
    } else {
        currentUser.password = newPasswordValue; 
        localStorage.setItem('users', JSON.stringify(users));

        closeSettingsPopups(changePasswordPopup);
        clearSettingsPopups([oldPassword, newPassword], changePasswordErr);
        hideError(changePasswordErr);
    }
};

changePasswordConfirm.addEventListener('click', handleChangePassword)

// DELETE AN ACCOUNT

deleteAccBtn.addEventListener('click', () => openSettingsPopups(deleteAccPopup, deleteAccErr))

deleteAccPopup.addEventListener('click', e => {
    if(e.target.classList.contains('close-settings-popup')) {
        closeSettingsPopups(deleteAccPopup)
        clearSettingsPopups([confirmPassword], deleteAccErr)
    }
})

const handleDeleteAcc = () => {
    const currentUserPassw = currentUser.password

    if(currentUserPassw !== confirmPassword.value) {
        settingsShowError(deleteAccErr)
    } else {
        const currentUserIndex = users.findIndex(u => u.username === currentUser.username);
        
        if (currentUserIndex > -1) {
            users.splice(currentUserIndex, 1);
        }

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem("currentUserLogin");
        window.location.href = 'index.html';

        closeSettingsPopups(deleteAccPopup)
        clearSettingsPopups([confirmPassword], deleteAccErr)
        hideError(deleteAccErr)
    }
}

deleteAccConfirm.addEventListener('click', handleDeleteAcc)

// DARK MODE



toggle.addEventListener('change', () => {
    if(toggle.checked) {
        document.body.classList.add('dark-mode')
        ulList.classList.add('dark-mode')
        addTaskPopup.classList.add('dark-mode')
        editTaskPopup.classList.add('dark-mode')
        movePopup.classList.add('dark-mode')
        profilePopup.classList.add('dark-mode')
        editProfilePopup.classList.add('dark-mode')
        settingsPopup.classList.add('dark-mode')
        changeUsernamePopup.classList.add('dark-mode')
        changePasswordPopup.classList.add('dark-mode')
        deleteAccPopup.classList.add('dark-mode')

        currentUser.settings.theme = 'dark';
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        document.body.classList.remove('dark-mode')
        ulList.classList.remove('dark-mode')
        addTaskPopup.classList.remove('dark-mode')
        editTaskPopup.classList.remove('dark-mode')
        movePopup.classList.remove('dark-mode')
        profilePopup.classList.remove('dark-mode')
        editProfilePopup.classList.remove('dark-mode')
        settingsPopup.classList.remove('dark-mode')
        changeUsernamePopup.classList.remove('dark-mode')
        changePasswordPopup.classList.remove('dark-mode')
        deleteAccPopup.classList.remove('dark-mode')

        currentUser.settings.theme = 'light';
        localStorage.setItem('users', JSON.stringify(users));
    }
})

const newTasksSearch = document.getElementById('new-tasks-search');
const inProgressSearch = document.getElementById('in-progress-search');
const doneSearch = document.getElementById('done-search');

const newTasksSearchError = taskSection.querySelector('.search-error');
const inProgressSearchError = progressSection.querySelector('.search-error');
const doneSearchError = doneSection.querySelector('.search-error');


const filterTasks = (searchInput, taskContainer, errorMsgElement) => {
    const filterText = searchInput.value.toLowerCase();
    const tasks = taskContainer.querySelectorAll('.new-task');
    let foundCount = 0;

    tasks.forEach(task => {
        const titleElement = task.querySelector('.task-title');
        if (titleElement) {
            const taskTitle = titleElement.textContent.toLowerCase();
            
            if (taskTitle.includes(filterText)) {
                task.style.display = 'grid';
                if (window.innerWidth <= 760) {
                    task.style.display = 'flex';
                }
                foundCount++;
            } else {
                task.style.display = 'none';
            }
        }
    });

    if (foundCount === 0 && tasks.length > 0 && filterText.length > 0) {
        errorMsgElement.style.visibility = 'visible';
    } else {
        errorMsgElement.style.visibility = 'hidden';
    }
};

newTasksSearch.addEventListener('input', () => {
    filterTasks(newTasksSearch, newTaskContainer, newTasksSearchError);
});

inProgressSearch.addEventListener('input', () => {
    filterTasks(inProgressSearch, progressTaskContainer, inProgressSearchError);
});

doneSearch.addEventListener('input', () => {
    filterTasks(doneSearch, finishedTasksContainer, doneSearchError);
});