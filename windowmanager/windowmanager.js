window.scrollTo(0,0);



  function createWindow(app) {
    if (app.startup == "true") {
    let appWindow = document.createElement('div');
    appWindow.classList.add('window');
    appWindow.setAttribute('id', app.id);
    appWindow.style.width = app.width;
    appWindow.style.height = app.height;
    let left1 = Math.floor(Math.random() * 351) + 150;
    let top1 = Math.floor(Math.random() * 201) + 50;
    appWindow.style.left = left1 + "px";
    appWindow.style.top = top1 + "px";
    appWindow.style.zIndex = "100";
    appWindow.onclick = function() {
      appWindow.style.zIndex ++;
    }


    let appFrame = document.createElement('iframe');
    appFrame.setAttribute('src', app.url);
    appFrame.setAttribute('frameborder', '0');
    appFrame.setAttribute('id', app.id + '-frame');
    appFrame.style.width = app.width;
    appFrame.style.height = app.height;

    let topBar = document.createElement('div');
    topBar.classList.add('top-bar');
    topBar.setAttribute('id', app.id + '-bar');
    topBar.style.width = app.width;
    topBar.style.height = app.height;

    let minButton = app.id + '-minButton';
    let changeButton = app.id + '-changeButton';
    let closeButton = app.id + '-closeButton';
    topBar.innerHTML += `
    <svg id="${minButton}" class="top-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M24 432c-13.3 0-24 10.7-24 24s10.7 24 24 24H488c13.3 0 24-10.7 24-24s-10.7-24-24-24H24z"/></svg>
          <svg id="${changeButton}" class="top-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
            <path
              d="M432 48H208c-17.7 0-32 14.3-32 32V96H128V80c0-44.2 35.8-80 80-80H432c44.2 0 80 35.8 80 80V304c0 44.2-35.8 80-80 80H416V336h16c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32zM48 448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V256H48V448zM64 128H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64z"
            />
          </svg>
          <svg id="${closeButton}" class="top-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
          `    
    
    let container = document.getElementById('container');
    appWindow.appendChild(topBar);
    appWindow.appendChild(appFrame);
    container.appendChild(appWindow);
    let minButtonElement = document.getElementById(minButton);
    let changeButtonElement = document.getElementById(changeButton);
    let closeButtonElement = document.getElementById(closeButton);

    minButtonElement.onclick = function() {
      appWindow.style.visibility = "hidden";
    }
    changeButtonElement.onclick = function() {
      var style = document.createElement('style');
      let top = appWindow.style.top;
      let left = appWindow.style.left;
      let width = appWindow.style.width;
      let height = appWindow.style.height;
      style.type = 'text/css';
      style.innerHTML = `
      @keyframes ${app.id}-up {
        from {
          top: ${top};
          left: ${left};
          width: ${width};
          height: ${height};
        }
        to {
          top: 0px;
          left: -10px;
          width: 100%;
          height: 95%;
        }
      }
      `;
      document.getElementsByTagName('head')[0].appendChild(style);
      if (appWindow.style.width >= "95%") {
        appWindow.style.width = app.width;
        appWindow.style.height = app.height;
        appFrame.style.width = app.width;
        appFrame.style.height = app.height;
        topBar.style.width = app.width;
        topBar.style.height = app.height;
      } else {
        appWindow.style["animation"] = `${app.id}-up 0.15s ease-in-out forwards`;
        appWindow.style.top = "0px";
        appWindow.style.left = "-10px";
        appWindow.style.width = "100%";
        appWindow.style.height = "95%";
        appFrame.style.width = "100%";
        appFrame.style.height = "100%";
        appFrame.style.left = "-10px";
        appFrame.style.top = "0px";
        topBar.style.width = "100%";
        topBar.style.height = "101%";
        appWindow.addEventListener('animationend', () => {
          style.remove();
        });
      }
    }
    closeButtonElement.onclick = function() {
      appWindow.remove();
      unregisterTaskBarSpace(app);
    }
  } 
  }

