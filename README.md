# To-Do App

A simple and clean browser-based To-Do application built with vanilla JavaScript, HTML5, and CSS3. Users can add, complete, delete, and filter tasks — with all data persisted in the browser's localStorage so nothing is lost on page refresh.

---

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Visuals](#visuals)
- [Roadmap](#roadmap)
- [Project Status](#project-status)

---

## Description

The To-Do App is a frontend-only web application that allows users to manage their daily tasks directly in the browser. Tasks can be added, marked as done, deleted, and filtered by status. A live task counter updates the remaining tasks in real time and also reflects in the browser tab title. All tasks are saved to localStorage so they persist across page refreshes — no backend or installation required.

---

## Features

### Task Management
- Add a new task using the input field and clicking Add
- Mark a task as done using the Done button
- Delete any task using the Delete button
- Clear all completed tasks at once with the Clear Completed button

### Filtering
- Filter tasks by All, Active, or Completed
- Active filter shows only incomplete tasks
- Completed filter shows only finished tasks

### Live Task Counter
- Displays the number of remaining (incomplete) tasks in real time
- Browser tab title updates dynamically to show remaining tasks
- Shows "All done!" in the tab title when no tasks remain

### Data Persistence
- All tasks are saved to localStorage automatically
- Tasks are loaded on page load — no data is lost on refresh
- No backend or database required

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML | Page structure and layout |
| CSS | Styling and UI design |
| JavaScript | App logic, DOM manipulation, and localStorage |
| localStorage | Persistent task storage in the browser |

---

## Requirements

All you need to run this project is a modern web browser. No installations, no dependencies, no build tools required.

- [Google Chrome](https://www.google.com/chrome/), [Firefox](https://www.mozilla.org/), [Edge](https://www.microsoft.com/edge), or any modern browser

---

## Installation

No installation needed. Just clone or download the project and open the HTML file in your browser.

```bash
# 1. Clone the repository
git clone <my project repo url>
cd todo-app

# 2. Open in browser
# Option A - simply double click index.html
# Option B - open with Live Server in VS Code
```

If you are using VS Code, install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and click "Go Live" at the bottom right for auto-reload on save.

---

## Usage

1. Type a task in the input field and click **Add** to create a task
2. Click **Done** on any task to mark it as completed
3. Click **Delete** to remove a task permanently
4. Use the filter buttons — **All**, **Active**, **Completed** — to view tasks by status
5. Click **Clear Completed** to remove all finished tasks at once
6. The remaining task count updates live at the bottom of the list

---

## Visuals

### App Overview

<img width="1011" height="722" alt="image" src="https://github.com/user-attachments/assets/433cee4b-690c-423f-b0a5-2537ce37d5df" />


---

## Roadmap

- [ ] Add due dates to tasks
- [ ] Add task priority levels (High, Medium, Low)
- [ ] Drag and drop to reorder tasks
- [ ] Edit existing task text inline
- [ ] Dark mode support
- [ ] Export tasks to a text or CSV file

---

## Project Status

This project is currently in active development. Core CRUD functionality, filtering, live task counter, and localStorage persistence are fully implemented. Additional features such as due dates, priorities, and drag-and-drop are planned for future updates.

---

## Author

Built by Ndima Mhangwani — Week 6 Project
