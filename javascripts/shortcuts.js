keyboard$.subscribe(function(key) {
    if (key.mode === "global" && key.type === "c") {
      /* Add custom keyboard handler here */
      const bodyElement = document.querySelector("body");
      let colorScheme = bodyElement.dataset.mdColorScheme;
      const scheme = colorScheme === 'default' ? 'slate' : 'default';
      bodyElement.dataset.mdColorScheme = scheme;
    }
})