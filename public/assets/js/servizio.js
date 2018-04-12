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

id = getAllUrlParams().id;

fetch(`/services/` + id)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        $('#page').text(data[0].name);
        $('#service_name').text(data[0].name);
        $('#service_description').text(data[0].description);
        $('#service_email').text(data[0].contacts);
        $('#service_image').attr("src", "../assets/img/servizi/service" + id + ".jpg" );
    });
fetch(`/locationsofservice/` + id)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        data.forEach(function(location) {
            $('#locations').append(`
                <li class="g-mb-15">
                  <i class="g-pos-rel g-mt-1 mr-2 fa fa-map-marker u-line-icon-pro"></i>
                  <a href="sede.html?id=` + location.id + `">` + location.name + `</a>
                </li>`
            );
        });
    });
fetch(`/peopleinservice/` + id)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        data.forEach(function(people) {
            $('#people').append(`
                <li class="g-mb-15">
                  <i class="g-pos-rel g-top-1 mr-2 fa fa-user-circle-o u-line-icon-pro"></i>
                  <a href="person.html?id=` + people.id + `">` + people.name + ` ` + people.surname + `, ` + people.role + `</a>
                </li>`
            );
        });
    });
