
   $(document).on('ready', function () {
    // initialization of carousel
    $.HSCore.components.HSCarousel.init('.js-carousel');
  });

  $(window).on('load', function() {
    // initialization of header
    $.HSCore.components.HSHeader.init($('#js-header'));
    $.HSCore.helpers.HSHamburgers.init('.hamburger');

    // initialization of HSMegaMenu component
    $('.js-mega-menu').HSMegaMenu({
      event: 'hover',
      pageContainer: $('.container'),
      breakpoint: 991
    });

    // initialization of masonry
    $('.masonry-grid').imagesLoaded().then(function () {
      $('.masonry-grid').masonry({
        columnWidth: '.masonry-grid-sizer',
        itemSelector: '.masonry-grid-item',
        percentPosition: true
      });
    });
  });

  var slider = new MasterSlider();

  slider.control('arrows', {
    autohide: true,
    overVideo: true
  });
  slider.control('bullets', {
    autohide: true,
    overVideo: true,
    dir: 'h',
    align: 'bottom',
    space: 10,
    margin: 26
  });
  slider.control('timebar', {
    autohide: false,
    overVideo: true,
    align: 'bottom',
    color: '#f88e6d',
    width: 2
  });
  slider.setup("masterslider", {
    width: 1366,
    height: 768,
    minHeight: 0,
    space: 0,
    start: 1,
    grabCursor: true,
    swipe: true,
    mouse: true,
    keyboard: false,
    layout: "fullwidth",
    wheel: false,
    autoplay: true,
    instantStartLayers: true,
    loop: true,
    shuffle: false,
    preload: 0,
    heightLimit: true,
    autoHeight: false,
    smoothHeight: true,
    endPause: false,
    overPause: true,
    fillMode: "fill",
    centerControls: false,
    startOnAppear: false,
    layersMode: "center",
    autofillTarget: "",
    hideLayers: false,
    fullscreenMargin: 0,
    speed: 18,
    dir: "h",
    parallaxMode: 'swipe',
    view: "basic"
  });

  jQuery(document).ready(function() {
      fetch(`/locations`)
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
              data.map(add_location);
          });

      function add_location(location) {
          $("#location_list").append(`

            <div  class="col-md-4 g-mb-30">
            <a href="sede.html?id=` + location.id + `" class="nav-item">
              <!-- Figure -->
              <figure class="u-shadow-v21 u-shadow-v21--hover g-brd-around g-brd-gray-light-v4 g-bg-white g-rounded-4 text-center g-transition-0_3">
                <div class="g-py-40 g-px-20">
                  <!-- Figure Image -->
                  <img class="g-width-100 g-height-100 rounded-circle g-mb-30" src="../assets/img/sedi/sede` + location.id + `.jpg" alt="Image Description">
                  <!-- Figure Image -->

                  <!-- Figure Info -->
                  <h4 class="g-font-weight-600 g-font-size-16 g-mb-15 nav-link" >` + location.name + `</h4>
                  <p> </p>

              </figure>
              <!-- End Figure -->
              </a>
            </div>`);
      }
  });
