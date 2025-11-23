# Taskinger - Kanban Board (CRUD)

Taskinger is a web application of a **Kanban Board** built for task management. The project demonstrates the full implementation of **CRUD** logic with user account handling, operating entirely on the client side

## Features

### 1. Data and Session Simulation
* **Local Storage Backend:** User accounts, settings, and all task states (Kanban) are persistently stored in **Local Storage**, simulating a database and ensuring session durability.
* **User Accounts:** Full support for user **registration and login**, including active session verification.

### 2. Task Management (CRUD)
* **Task Control:** Users can **create** new prioritized tasks, **edit** their details, and **delete** them.
* **Movement:** Tasks can be easily **moved** between the Kanban columns (statuses: New Tasks, In Progress, Done).
* **Search:** A **filtering** function is available to search for tasks by title within each section.

### 3. Personalization and Control
* **Account Settings:** Functions to change username, password, and delete the account.
* **Dark Mode:** Theme switching with automatic preference saving.
* **Profile Stats:** Task progress counters and profile information editing.

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Logic/Data** | **Vanilla JavaScript** (ES6+), **Local Storage** |
| **Presentation/Style** | **HTML5**, **Sass (SCSS)**, Full **Responsive Web Design** |
