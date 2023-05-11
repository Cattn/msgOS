let allApps = [];
async function GetAllApps() {
    const response = await fetch('windowmanager/apps.json');
    const json = await response.json();
    
    const apps = json.apps;
    for (let i = 0; i < apps.length; i++) {
        allApps.push(apps[i]);
        const name = apps[i].name;
    }
    let doWindowState = localStorage.getItem('windowState');
    if (doWindowState == "true") {
        loadWindowState();
    } else {
    allApps.forEach(app => {
        if (app.startup == "true") {
        createWindow(app);
        registerTaskBarSpace(app);
        }
    });
}
    registerWindows();
    windowLayerManager();
    createStartMenu();
    changeTaskBarLocation();
  }
  GetAllApps();

  async function openApp(appId) {
    const response = await fetch('windowmanager/apps.json');
    const json = await response.json();
    
    const apps = json.apps;
    for (let i = 0; i < apps.length; i++) {
        if (apps[i].id == appId) {
            createWindow(apps[i]);
            registerTaskBarSpace(apps[i]);
        }
    }
    registerWindows();
    windowLayerManager();
}