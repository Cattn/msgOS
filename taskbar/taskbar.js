let taskbar = document.createElement('div');
taskbar.setAttribute('id', 'taskbar');
taskbar.setAttribute('position', 'bottom');
taskbar.setAttribute('class', 'taskbar-bottom');
taskbar.style.height = "6vh";

document.body.appendChild(taskbar);
// Default taskbar size: 6vh, small: 4vh, large: 8vh
// When taskbar is resized, consider: 1. taskbar size, 2. icon size, 3. icon spacing

function registerTaskBarSpace(app) {
    let taskbarIcon = document.createElement('div');
    taskbarIcon.setAttribute('id', app.id + '-icon');
    taskbarIcon.setAttribute('class', 'taskbar-icon');
    taskbarIcon.setAttribute('title', app.name);
    

    let taskbarIconImage = document.createElement('img');
    taskbarIconImage.setAttribute('src', app.icon);
    taskbarIconImage.setAttribute('class', 'taskbar-image');

    taskbarIcon.appendChild(taskbarIconImage);
    taskbar.appendChild(taskbarIcon);

    taskbarIcon.addEventListener('click', () => {
        let window = document.getElementById(app.id);
        if (window == undefined) {
            registerTaskBarSpace(app);
            return;
        }
        if (window.style.visibility == "visible") {
            window.style.visibility = "hidden";
            window.style.opacity = "0";
            taskbarIcon.style.borderTop = "none"
        } else {
        window.style.visibility = "visible";
        window.style.opacity = "1";
        taskbarIcon.style.borderTop = "2px solid #fff"
        }
    });
}

function unregisterTaskBarSpace(app) {
    let isPinned = localStorage.getItem(app.id + '-pinned');
    if (isPinned == "true") {
        return;
    }
    let taskbarIcon = document.getElementById(app.id + '-icon');
    taskbarIcon.remove();
}