


let mainColor = document.getElementById("main-color");
localStorage.getItem("primaryColor") ? mainColor.value = localStorage.getItem("primaryColor") : mainColor.value = "#000000";
mainColor.onchange = () => {
const message = JSON.stringify({
    channel: 'settings',
    action: 'changeColor',
    color: mainColor.value
});
window.parent.postMessage(message, '*');
}

let windowStateY = document.getElementById("yes");
let windowStateN = document.getElementById("no");

let windowState = localStorage.getItem("windowState") ? localStorage.getItem("windowState") : "false";

if (windowState == "true") {
    windowStateY.classList.add("selected");
    windowStateN.classList.remove("selected");
} else {
    windowStateN.classList.add("selected");
    windowStateY.classList.remove("selected");
}
windowStateY.addEventListener("click", () => {
    localStorage.setItem("windowState", "true");
    windowState = "true";
    const windowStateMessage = JSON.stringify({
        channel: 'settings',
        action: 'changeWindowState',
        windowState: windowState
    });
    window.parent.postMessage(windowStateMessage, '*');
    windowStateY.classList.add("selected");
    windowStateN.classList.remove("selected");
});

windowStateN.addEventListener("click", () => {
    localStorage.setItem("windowState", "false");
    windowState = "false";
    const windowStateMessage = JSON.stringify({
        channel: 'settings',
        action: 'changeWindowState',
        windowState: windowState
    });
    window.parent.postMessage(windowStateMessage, '*');
    windowStateN.classList.add("selected");
    windowStateY.classList.remove("selected");
});

let taskbarTop = document.getElementById("top");
let taskbarBottom = document.getElementById("bottom");
let taskbarLeft = document.getElementById("left");
let taskbarRight = document.getElementById("right");

let taskbarPosition = localStorage.getItem("taskbarPosition") ? localStorage.getItem("taskbarPosition") : "bottom";

if (taskbarPosition == "top") {
    taskbarTop.classList.add("selected");
    taskbarBottom.classList.remove("selected");
    taskbarLeft.classList.remove("selected");
    taskbarRight.classList.remove("selected");
}
if (taskbarPosition == "bottom") {
    taskbarBottom.classList.add("selected");
    taskbarTop.classList.remove("selected");
    taskbarLeft.classList.remove("selected");
    taskbarRight.classList.remove("selected");
}
if (taskbarPosition == "left") {
    taskbarLeft.classList.add("selected");
    taskbarTop.classList.remove("selected");
    taskbarBottom.classList.remove("selected");
    taskbarRight.classList.remove("selected");
}
if (taskbarPosition == "right") {
    taskbarRight.classList.add("selected");
    taskbarTop.classList.remove("selected");
    taskbarBottom.classList.remove("selected");
    taskbarLeft.classList.remove("selected");
}

taskbarTop.addEventListener("click", () => {
    localStorage.setItem("taskbarPosition", "top");
    taskbarPosition = "top";
    const taskbarPositionMessage = JSON.stringify({
        channel: 'settings',
        action: 'changeTaskbarPosition',
        taskbarPosition: taskbarPosition
    });
    window.parent.postMessage(taskbarPositionMessage, '*');
    taskbarTop.classList.add("selected");
    taskbarBottom.classList.remove("selected");
    taskbarLeft.classList.remove("selected");
    taskbarRight.classList.remove("selected");
});

taskbarBottom.addEventListener("click", () => {
    localStorage.setItem("taskbarPosition", "bottom");
    taskbarPosition = "bottom";
    const taskbarPositionMessage = JSON.stringify({
        channel: 'settings',
        action: 'changeTaskbarPosition',
        taskbarPosition: taskbarPosition
    });
    window.parent.postMessage(taskbarPositionMessage, '*');
    taskbarBottom.classList.add("selected");
    taskbarTop.classList.remove("selected");
    taskbarLeft.classList.remove("selected");
    taskbarRight.classList.remove("selected");
});

taskbarLeft.addEventListener("click", () => {
    localStorage.setItem("taskbarPosition", "left");
    taskbarPosition = "left";
    const taskbarPositionMessage = JSON.stringify({
        channel: 'settings',
        action: 'changeTaskbarPosition',
        taskbarPosition: taskbarPosition
    });
    window.parent.postMessage(taskbarPositionMessage, '*');
    taskbarLeft.classList.add("selected");
    taskbarTop.classList.remove("selected");
    taskbarBottom.classList.remove("selected");
    taskbarRight.classList.remove("selected");
});

taskbarRight.addEventListener("click", () => {
    localStorage.setItem("taskbarPosition", "right");
    taskbarPosition = "right";
    const taskbarPositionMessage = JSON.stringify({
        channel: 'settings',
        action: 'changeTaskbarPosition',
        taskbarPosition: taskbarPosition
    });
    window.parent.postMessage(taskbarPositionMessage, '*');
    taskbarRight.classList.add("selected");
    taskbarTop.classList.remove("selected");
    taskbarBottom.classList.remove("selected");
    taskbarLeft.classList.remove("selected");
});