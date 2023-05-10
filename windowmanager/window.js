function registerWindows() {
const windows = document.querySelectorAll('.window');
const handles = ['tl', 'tr', 'bl', 'br', 't', 'b', 'l', 'r'];

windows.forEach((window) => {
  let isResizing = false; // flag to indicate if the window is currently being resized

  // Get frame and top bar elements
  const id = window.getAttribute('id');
  const frame = document.getElementById(`${id}-frame`);
  const topBar = document.getElementById(`${id}-bar`);

  // Add handles
  handles.forEach((handle) => {
    const handleDiv = document.createElement('div');
    handleDiv.classList.add('handle');
    handleDiv.setAttribute('id', `handle-${handle}`);
    window.appendChild(handleDiv);
  });

  // Make handles resizable
  handles.forEach((handle) => {
    const handleDiv = window.querySelector(`#handle-${handle}`);

    handleDiv.addEventListener('mousedown', (event) => {
      event.preventDefault();
      isResizing = true; // set the resizing flag
      const resizeDirection = handleDiv.getAttribute('id').replace('handle-', '');
      const startX = event.clientX;
      const startY = event.clientY;
      const startWidth = parseInt(document.defaultView.getComputedStyle(window).width, 10);
      const startHeight = parseInt(document.defaultView.getComputedStyle(window).height, 10);
      const startLeft = parseInt(document.defaultView.getComputedStyle(window).left, 10);
      const startTop = parseInt(document.defaultView.getComputedStyle(window).top, 10);

      function handleMouseMove(event) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;
        let newWidth, newHeight, newTop, newLeft;

        if (resizeDirection.includes('t')) {
          newHeight = startHeight - deltaY;
          newTop = startTop + deltaY;
        } else if (resizeDirection.includes('b')) {
          newHeight = startHeight + deltaY;
          newTop = startTop;
        } else {
          newHeight = startHeight;
          newTop = startTop;
        }

        if (resizeDirection.includes('l')) {
          newWidth = startWidth - deltaX;
          newLeft = startLeft + deltaX;
        } else if (resizeDirection.includes('r')) {
          newWidth = startWidth + deltaX;
          newLeft = startLeft;
        } else {
          newWidth = startWidth;
          newLeft = startLeft;
        }

        window.style.width = `${newWidth}px`;
        window.style.height = `${newHeight}px`;
        window.style.left = `${newLeft}px`;
        window.style.top = `${newTop}px`;

        // Update frame and top bar dimensions
        const computedFrameWidth = parseInt(window.style.width, 10) - 40;
        const computedFrameHeight = parseInt(window.style.height, 10) - 40;
        const computedTopBarWidth = parseInt(window.style.width, 10) - 40;
        const computedTopBarHeight = computedFrameHeight + 30;
        frame.style.width = `${computedFrameWidth}px`;
        frame.style.height = `${computedFrameHeight}px`;
        topBar.style.width = `${computedTopBarWidth}px`;
        topBar.style.height = `${computedTopBarHeight}px`;
      }

      function handleMouseUp() {
        isResizing = false; // unset the resizing flag
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    });
  });

  // Make window draggable
  window.addEventListener('mousedown', (event) => {
    if (!isResizing) { // check if the window is currently being resized
      const startX = event.clientX;
      const startY = event.clientY;
      const startLeft = parseInt(document.defaultView.getComputedStyle(window).left, 10);
      const startTop = parseInt(document.defaultView.getComputedStyle(window).top, 10);

      function handleMouseMove(event) {
        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        window.style.left = `${startLeft + deltaX}px`;
        window.style.top = `${startLeft + deltaX}px`;
        window.style.top = `${startTop + deltaY}px`;

        // Snap
        let rightTrigger = screen.width - 1;
        if (event.clientX == 0) {
          snapZoneTrigger('left', window);
        } else if (event.clientX == rightTrigger) {
          snapZoneTrigger('right', window);
        }
      }

      function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  });
});

}


function windowLayerManager() {
  const windows = document.querySelectorAll('.window');
  windows.forEach((window) => {
    const iframe = window.querySelector('iframe');
    window.addEventListener('click', (event) => {
      windows.forEach((window) => {
        window.style.zIndex = 0;
      });
      window.style.zIndex = 1;
    });
    // Add a message event listener to the iframe
    window.addEventListener('message', (event) => {
      // Check that the message is coming from the iframe
      if (event.source !== iframe.contentWindow) {
        return;
      }
      // Set the zIndex of the window when a message is received
      windows.forEach((window) => {
        window.style.zIndex = 0;
      });
      window.style.zIndex = 1;
      console.log('Click event detected inside iframe:', event);
    });
  });
  
}



/* Works with Windowmanager to provide snapZones! */
function snapZoneTrigger(snap, app) {
  let leftTriggerZone = document.getElementById('left-snapzone');
  let rightTriggerZone = document.getElementById('right-snapzone');
  let topBar = app.querySelector('.top-bar');

  if (snap == 'left') {
    app.style.left = '-1.5vw';
    app.style.top = '20px';
    app.style.width = '50vw';
    app.style.height = '100vw';
    frame.style.width = '50vw';
    frame.style.height = '100vw';
    topBar.style.width = '50vw';
    topBar.style.height = '100vw';
    app.style.zIndex = 1;
    leftTriggerZone.style.display = 'none';
    rightTriggerZone.style.display = 'block';
  }
  if (snap == 'right') {
    app.style.left = '50%';
    app.style.top = '0px';
    app.style.width = '50%';
    app.style.height = '100%';
    frame.style.width = '50%';
    frame.style.height = '100%';
    topBar.style.width = '50%';
    topBar.style.height = '100%';
    app.style.zIndex = 1;
    leftTriggerZone.style.display = 'block';
    rightTriggerZone.style.display = 'none';
  }
}