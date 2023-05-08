/* To do: Z-Index to detirmine which window is on top */
interact('.window')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: false },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)
        let id = target.getAttribute("id")
        let frame = document.getElementById(id + "-frame");
        let topBar = document.getElementById(id + "-bar");
        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        let computedFrameWidth = event.rect.width - 40;
        let computedFrameHeight = event.rect.height - 40;
        let computedTopBarWidth = event.rect.width - 40;
        let computedTopBarHeight = computedFrameHeight + 30;
        frame.style.width = computedFrameWidth + 'px'
        frame.style.height = computedFrameHeight + 'px'
        topBar.style.width = computedTopBarWidth + 'px'
        topBar.style.height = computedTopBarHeight + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 200, height: 150 }
      })
    ],


  })
  .draggable({
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')
        //event.target.style.zIndex --; RESET Z-Index
        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  //target.style.zIndex ++;  Set window on top via z Index!!
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener