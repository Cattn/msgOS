let mainColor = document.getElementById("main-color");

mainColor.onchange = () => {
const message = JSON.stringify({
    channel: 'settings',
    action: 'changeColor',
    color: mainColor.value
});
window.parent.postMessage(message, '*');
}