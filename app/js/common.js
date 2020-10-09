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

    // ----------------------------------------------
    //		smooth scroll when clicking an anchor link
    // ----------------------------------------------
    const root = (() => {
      if ('scrollingElement' in document) return document.scrollingElement;
      const html = document.documentElement;
      const start = html.scrollTop;
      html.scrollTop = start + 1;
      const end = html.scrollTop;
      html.scrollTop = start;
      return end > start ? html : document.body;
    })();

    const ease = (duration, elapsed, start, end) =>
      Math.round(end * (-Math.pow(2, (-10 * elapsed) / duration) + 1) + start);

    const getCoordinates = (hash) => {
      const start = root.scrollTop;
      const delta = (() => {
        if (hash.length < 2) return -start;
        const target = getEl(hash);
        if (!target) return;
        const top = target.getBoundingClientRect().top;
        const max = root.scrollHeight - window.innerHeight;
        return start + top < max ? top : max - start;
      })();
      if (delta)
        return new Map([
          ['start', start],
          ['delta', delta],
        ]);
    };

    const scroll = (link) => {
      const hash = link.getAttribute('href');
      const coordinates = getCoordinates(hash);
      if (!coordinates) return;

      const tick = (timestamp) => {
        progress.set('elapsed', timestamp - start);

        let progressValues = [];
        let coordinatesValues = [];

        progress.forEach((element) => {
          progressValues.push(element);
        });

        coordinates.forEach((element) => {
          coordinatesValues.push(element);
        });

        root.scrollTop = ease(...progressValues, ...coordinatesValues);

        progress.get('elapsed') < progress.get('duration')
          ? requestAnimationFrame(tick)
          : complete(hash, coordinates);
      };

      const progress = new Map([['duration', 800]]);
      const start = performance.now();
      requestAnimationFrame(tick);
    };

    const complete = (hash, coordinates) => {
      history.pushState(null, null, hash);
      root.scrollTop = coordinates.get('start') + coordinates.get('delta');
    };

    const attachHandler = (links, index) => {
      const link = links.item(index);
      link.addEventListener('click', (event) => {
        event.preventDefault();
        scroll(link);
      });
      if (index) return attachHandler(links, index - 1);
    };

    const links = getAllEl('a[href^="#"]');
    const last = links.length - 1;
    if (last < 0) return;
    attachHandler(links, last);

    // ----------------------------------------------
    //		scroll to top
    // ----------------------------------------------
    function toggleBtnToTop() {
      const pos = window.pageYOffset;

      if (pos > 1100) {
        toTop.style.display = 'block';
      } else {
        toTop.style.display = 'none';
      }
    }

    const toTop = getEl('.to-top');

    window.onscroll = function () {
      toggleBtnToTop();
    };
  });
})();
