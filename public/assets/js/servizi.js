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
    var locations = [];
    var location_x_service = [];
    var s_locations = [];

    fetch('/servicesnotordered')
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        s_locations = data.map(locations_of_service);

        function locations_of_service (service) {
            return fetch('/locationsofservice/' + service.id)
            .then(function(response){
                return response.json();
            })
            .then(function(data) {
                locations_x_service = data.map(build_filter_get_loc_id);

                function build_filter_get_loc_id (loc_response) {
                    //where loc_response.id means the id of each location in which we can find the service
                    if (!locations.includes(loc_response.id)){
//                        console.log("in IF. loc_response.id and locations: " + loc_response.id + " / " + locations)
                        locations.push(loc_response.id);
                        $("#filter_controls").append('<li id="filter_action" class="list-inline-item cbp-filter-item g-brd-around g-brd-gray-light-v4 g-brd-primary--active g-color-gray-dark-v4 g-color-primary--hover g-color-primary--active g-font-size-12 rounded g-transition-0_3 g-px-20 g-py-7 mb-2" role="button" data-filter=".' + loc_response.id + '">' + loc_response.name + '</li>');
                        console.log("location_found: " + loc_response.id + " " + loc_response.name);
                    }
                    return loc_response.id;
                };

                return locations_x_service;
            })
            .then( location_x_service => {
                var loc_strgfy = location_x_service.join(' ');
                    returned = loc_strgfy;
                return loc_strgfy;
            })
        };
        return s_locations;
    })
    .then(function(s_locations) {
        Promise.all(s_locations).then(function(s_locations) {
            var array_locations = [];
            for ( i = 0; i < s_locations.length; i++ ){
                var temp = [];
                temp[i] = s_locations[i].split(' ').join(',');
                array_locations[i] = JSON.parse("[" + temp[i] + "]");
            };

            fetch('/services')
            .then(function(response){
    //            console.log(response);
                return response.json();
            })
           .then(function(data) {
                console.log("mapping services data");
                data.map(add_service);
                // initialization of cubeportfolio
                //$.HSCore.components.HSCubeportfolio.init('.cbp');
                $.HSCore.components.HSCubeportfolio.init('.cbp');
                // initialization of popups
                $.HSCore.components.HSModalWindow.init('[data-modal-target]');
                // initialization of carousel
                $.HSCore.components.HSCarousel.init('.js-carousel');
                console.log("Cubeportfolio, Modal Window and Carusel initialised");
            });
            function add_service(service) {
                var id = service.id;
                $("#services_list").append(`
                    <div class="cbp-item ` + s_locations[id - 1] + `">
                    <a href="servizio.html?id=` + service.id + `">
                        <div class="u-block-hover g-parent">
                            <img class="img-fluid g-transform-scale-1_1--parent-hover g-transition-0_5 g-transition--ease-in-out" src="../assets/img/servizi/service` + service.id + `.jpg" alt="Image ` + service.id + ` description">
                        </div>
                        <div class="u-shadow-v19 g-bg-white text-center g-pa-25 mb-1">
                            <h3>` + service.name + `</h3>
                    </div>
                    </a>
                </div>`)
            }
        })
    })

});
