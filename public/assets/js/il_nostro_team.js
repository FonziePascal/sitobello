
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
      fetch(`/people`)
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
              data.map(add_person);
          });

      function add_person(person) {
          $("#person_sched").append(`
              <div class="col-lg-9">
                <!-- Article -->
                <article class="u-shadow-v11 rounded g-pa-20 g-mb-30">
                  <div class="row align-items-center">
                    <!-- Article Image -->
                      <img class="img-fluid" src="../assets/img/team/team${person.id}.jpg" alt="Image ${person.id} Description">
                    <!-- End Article Image -->

                    <!-- Article Content -->
                    <div class="col-sm-8 g-brd-left--sm g-brd-gray-light-v4">
                      <div class="g-pa-10">
                        <header class="d-flex justify-content-start g-mb-3">
                          <h4 class="h5 d-inline-block text-uppercase g-mr-10">
                            <a class="g-color-black">${person.surname} ${person.name} </a>
                          </h4>
                          <div class="js-rating ml-auto d-inline-block g-color-primary g-font-size-13" data-rating="3" data-spacing="2" data-backward-icons-classes="fa fa-star-o g-opacity-0_5"></div>
                        </header>

                        <span class="d-block g-color-gray-dark-v4 g-font-size-18 g-mb-10">
                          ${person.role} </span>
                        <a href="person.html?id=` + person.id + `" class="btn btn-lg u-btn-primary g-font-weight-600 g-font-size-12 text-uppercase g-mx-5 g-mt-10">Scopri di più</a>
                      </div>
                    </div>
                    <!-- End Article Content -->
                  </div>
                </article>
                <!-- End Article -->
              </div>`);
      }
  });
