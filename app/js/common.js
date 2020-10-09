(function () {
  // Custom JS
  window.addEventListener('load', function () {
    // ----------------------------------------------
    //		common functions
    // ----------------------------------------------
    function getEl(className) {
      return document.querySelector(className);
    }

    function getAllEl(className) {
      return document.querySelectorAll(className);
    }

    function createEl(type) {
      return document.createElement(type);
    }

    // add nav dots
    function addNavDots(itemClass, containerClass) {
      const count = getAllEl(itemClass).length;
      const container = getEl(containerClass);

      for (let i = 0; i < count; i++) {
        let dot = createEl('div');
        dot.className = `${containerClass.slice(1)}__dot`;
        container.appendChild(dot);
      }
    }

    addNavDots('.testimonials-list__item', '.testimonials-nav-container');

    // ----------------------------------------------
    //		resume slider
    //    https://github.com/ganlanyuan/tiny-slider
    // ----------------------------------------------

    const slider = tns({
      container: '.testimonials-slider',
      viewportMax: 500,
      items: 1,
      slideBy: 'page',
      speed: 400,
      mouseDrag: true,
      nav: true,
      controls: false,
      navContainer: '.testimonials-nav-container',
    });
  });
})();
