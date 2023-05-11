let taskbar = document.createElement('div');
taskbar.setAttribute('id', 'taskbar');
taskbar.setAttribute('position', 'bottom');
taskbar.setAttribute('class', 'taskbar-bottom');
taskbar.style.height = "6vh";

let systemTaskbarIcon = document.createElement('div');
systemTaskbarIcon.setAttribute('id', 'system-icon');
systemTaskbarIcon.setAttribute('class', 'taskbar-icon');
systemTaskbarIcon.setAttribute('title', 'Start');

let systemTaskbarIconImage = document.createElement('img');
systemTaskbarIconImage.setAttribute('src', 'assets/os_icon.png');
systemTaskbarIconImage.setAttribute('class', 'os-image');

document.body.addEventListener('keydown', (event) => {
    if (event.key == "Alt") {
        event.preventDefault();
        let element = document.getElementById('start-menu');
    if (element.style.visibility == "visible") {
        element.classList.add('close'); // start animation
        setTimeout(function () {
                element.style.visibility = "hidden";
                element.style.opacity = "0";
        }, 400);
    } else {
    element.classList.remove('close');
    element.classList.remove('start-menu'); // reset animation
    void element.offsetWidth; // trigger reflow
    element.classList.add('start-menu'); // start animation
    element.style.visibility = "visible";
    element.style.opacity = "1";
    }
}

});

systemTaskbarIcon.addEventListener('click', () => {
    let element = document.getElementById('start-menu');
    if (element.style.visibility == "visible") {
        element.classList.add('close'); // start animation
        setTimeout(function () {
                element.style.visibility = "hidden";
                element.style.opacity = "0";
        }, 400);
    } else {
    element.classList.remove('close');
    element.classList.remove('start-menu'); // reset animation
    void element.offsetWidth; // trigger reflow
    element.classList.add('start-menu'); // start animation
    element.style.visibility = "visible";
    element.style.opacity = "1";
    }
});

systemTaskbarIcon.appendChild(systemTaskbarIconImage);
taskbar.appendChild(systemTaskbarIcon);

let time = document.createElement('div');
time.setAttribute('id', 'time');
time.setAttribute('class', 'taskbar-time');
time.innerHTML = "00:00";

taskbar.appendChild(time);

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
        if (window.style.zIndex == "1") {
        if (window.style.visibility == "visible") {
            window.style.visibility = "hidden";
            window.style.opacity = "0";
            taskbarIcon.style.borderTop = "none"
        } else {
        window.style.visibility = "visible";
        window.style.opacity = "1";
        taskbarIcon.style.borderTop = "2px solid #fff"
        }
    } else {
        let windows = document.querySelectorAll('.window');
        windows.forEach((window) => {
            window.style.zIndex = 0;
        });
          window.style.zIndex = 1;
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


function createStartMenu() {
    let start = document.createElement('div');
    start.innerHTML = `
    <input type="text" id="start-menu-search" class="start-menu-search" placeholder="Search" />
      <h3 class="pinned-text">Pinned</h3>
      <div id="pins-start" class="pinned-start"></div>
      `;
    start.setAttribute('id', 'start-menu');
    start.setAttribute('class', 'start-menu');

    document.body.appendChild(start);

    let input = document.getElementById('start-menu-search');
    input.addEventListener('keyup', () => {
        let query = input.value.toLowerCase();
        let pi = document.querySelectorAll('.pinned-app');
        pi.forEach((pin) => {
            if (pin.id.toLowerCase().includes(query)) {
                pin.style.display = "block";
            } else {
                pin.style.display = "none";
            }
        });
    });

    // Listen for enter key, and if so open the app
    input.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
            let query = input.value.toLowerCase();
            
            let pi = document.querySelectorAll('.pinned-app');
            let count = 0;
            pi.forEach((pin) => {
                if (pin.id.toLowerCase().includes(query)) {
                    count++;
                }
            });
            if (count == 1) {
            pi.forEach((pin) => {
                if (pin.id.toLowerCase().includes(query)) {
                    let id = pin.id.split('-')[0];
                    let appWindow = document.getElementById(id);
                    if (appWindow == undefined) {
                        openApp(id);
                        return;
                    } else {
                        appWindow.style.visibility = "visible";
                        appWindow.style.opacity = "1";
                    }
                }
            });
        } else {
            return;
        }
        }
    });
    let pinsDiv = document.getElementById('pins-start');
    let pins = [
        {
            name: "MLib",
            icon: "assets/spotify.png",
            id: "MLib"
        },
        {
            name: "gba",
            icon: "assets/GBA_2_Icon_ver3.png",
            id: "gba"
        },
        {
            name: "Bing",
            icon: "assets/chrome.ico",
            id: "Bing"
        }
    ]
    pins.forEach((pin) => {
        pinsDiv.innerHTML += `
        <div id="${pin.id}-pin" class="pinned-app">
          <img src="${pin.icon}" class="pinned-app-icon" />
          <p class="pinned-app-name">${pin.name}</p>
        </div>
        `;

        let pinElement = document.getElementById(pin.id + '-pin');
        pinElement.addEventListener('click', () => {
            let window = document.getElementById(pin.id);
            console.log(window);
            if (window == undefined) {
                openApp(pin.id);
                return;
            }
            if (window.style.zIndex == "1") {
            if (window.style.visibility == "visible") {
                window.style.visibility = "hidden";
                window.style.opacity = "0";
            } else {
            window.style.visibility = "visible";
            window.style.opacity = "1";
            }
        } else {
            let windows = document.querySelectorAll('.window');
            windows.forEach((window) => {
                window.style.zIndex = 0;
            });
              window.style.zIndex = 1;
              window.style.visibility = "visible";
              window.style.opacity = "1";
            }
        });
    });
}

function updateTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    let time = document.getElementById('time');
    time.innerHTML = hours + ":" + minutes;
}

setInterval(updateTime, 1000);