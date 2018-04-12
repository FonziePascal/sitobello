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

fetch(`/locations/` + id)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        $('#page').text(data[0].name);
        $('#name').text(data[0].name);
        $('#description').text(data[0].basicInfo);
        $('#email').text(data[0].mail);
        $('#address').append('<a>' + data[0].address + ', </a>');
        $('#address').append('<a>' + data[0].city + '</a>');
        $('#phone').text(data[0].phone);
        $('#location_image').attr("src", "../assets/img/sedi/sede" + id + ".jpg" );
    }).catch(function(err) {
        console.log(err);
        // Gets called if request fails, or even if .then fails
     });
fetch(`/servicesinlocation/` + id)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        data.forEach(function(service) {
            $('#services').append(`
                <li class="g-mb-15">
                  <i class="g-pos-rel g-top-1 mr-2 fa fa-hand-spock-o u-line-icon-pro"></i>
                  <a href="servizio.html?id=${service.id}">${service.name}</a>
                </li>`
            );
        });
    })
    .catch(function(err) {
        console.log(err);
        // Gets called if request fails, or even if .then fails
        return badRequest();
    });
