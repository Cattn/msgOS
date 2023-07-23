window.addEventListener('message', function (e) {
    const data = JSON.parse(e.data);
    console.log(data);
    const channel = data.channel;
    const action = data.action;
  
    const settings = [
        {
            action: 'open',
            callback: () => {
                Kernel.prototype.launchApp('settings');
            }
        },
        {
            action: 'close',
            callback: () => {
                let window = document.getElementById('settings');
                window.remove();
            }
        },
        {
            action: 'changeColor',
            callback: () => {
                const color = data.color;
                document.documentElement.style.setProperty('--primary-color', color);
                this.localStorage.setItem('primaryColor', color);
            }
        },
      {
            action: 'changeWindowState',
            callback: () => {
                const windowState = data.windowState;
                localStorage.setItem("windowState", windowState);
            }
      }
    ];

    let windowId = data.windowId || 'settings';
  const windowManager = [
    {
          action: 'openWindow',
          callback: () => {
              Kernel.prototype.launchApp(windowId)
          }
    },
    {
          action: 'closeWindow',   
          callback: () => {
              let requestedWindow = document.getElementById(windowId);
              requestedWindow.remove();
          }
    },
    {
          action: 'fullscreen',
          callback: () => {
            alert("Not implemented yet");
          }
    }
  ]

    if (channel == 'settings') {
        settings.forEach(setting => {
            if (setting.action == action) {
                setting.callback();
            }
        });
    }

    if (channel == 'windowManager') {
        windowManager.forEach(setting => {
            if (setting.action == action) {
                setting.callback();
            }
        });
    }
  });