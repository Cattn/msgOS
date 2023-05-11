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