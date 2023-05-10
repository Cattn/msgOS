let allApps = [];
async function GetAllApps() {
    const response = await fetch('windowmanager/apps.json');
    const json = await response.json();
    
    const apps = json.apps;
    for (let i = 0; i < apps.length; i++) {
        allApps.push(apps[i]);
        const name = apps[i].name;
    }
    allApps.forEach(app => {
        createWindow(app);
        registerTaskBarSpace(app);
    });
    registerWindows();
    windowLayerManager();
  }
  GetAllApps();