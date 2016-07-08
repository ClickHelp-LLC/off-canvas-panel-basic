function initOffCanvasPanel(pnlContainerId, btnMenuId, btnCloseId)
{
  // Event handler registration. If disconnect is true, it'll return a
  // function that unregisters the handler.
  function appendEventHandler(node, type, handler, disconnect)
  {
    function wrapHandler(event) { handler(event || window.event); }
    var wrapHandler = handler;
    if (typeof node.addEventListener == "function")
    {
      node.addEventListener(type, wrapHandler, false);
      if (disconnect) return function () { node.removeEventListener(type, wrapHandler, false); };
    }
    else if (node.attachEvent)
    {
      node.attachEvent("on" + type, wrapHandler);
      if (disconnect) return function () { node.detachEvent("on" + type, wrapHandler); };
    }
  }

  function stopBubbling(e)
  {
    // Cancel further event handlers for all browsers
    if (e.stopPropagation)
    {
      e.stopPropagation();
    }
    if (e.preventDefault)
    {
      e.preventDefault();
    }
    e.cancelBubble = true;
    e.returnValue = false;

    return false;
  }

  function bindToClick(el, handler)
  {
    appendEventHandler(el, "touchstart", handler);
    appendEventHandler(el, "click", handler);
  }

  function close()
  {
    var pnlContainer = document.getElementById(pnlContainerId);
    pnlContainer.className = pnlContainer.className.replace(/ openMenu\b/g, "");
  }

  bindToClick(document.getElementById(btnMenuId), function (e)
  {
    var pnlContainer = document.getElementById(pnlContainerId);
    if (pnlContainer.className.indexOf("openMenu") < 0)
    {
      pnlContainer.className += " openMenu";
    }
    return stopBubbling(e);
  });

  if (btnCloseId instanceof Array)
  { // This param type check will work unless the param is passed from an iframe - see http://stackoverflow.com/questions/1058427/how-to-detect-if-a-variable-is-an-array
    for (var i = 0; i < btnCloseId.length; i++)
    {
      bindToClick(document.getElementById(btnCloseId[i]), close);
    }
  }
  else
  {
    bindToClick(document.getElementById(btnCloseId), close);
  }
}