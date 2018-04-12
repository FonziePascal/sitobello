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
   ContactForm.initContactForm();
});

var ContactForm = function () {
   return {
       //Contact Form
       initContactForm: function () {
           // Validation
           $("#form_contattaci").validate({
               // Rules for form validation
               rules:{
                   name:{
                       required: true
                   },
                   email:{
                       required: true,
                       email: true
                   },
                   message:{
                       required: true,
                       minlength: 10
                   },
                   captcha:{
                       required: true,
                       remote: '#'
                   }
               },

               // Messages for form validation
               messages:{
                   name:{
                       required: 'Inserisci il tuo nome',
                   },
                   email:{
                       required: 'Inerisci la tua email',
                       email: 'Inserisci una email valida'
                   },
                   message:{
                       required: 'Inserisci il testo del messaggio'
                   },
                   captcha:{
                       required: 'Please enter characters',
                       remote: 'Correct captcha is required'
                   }
               },

               // Ajax form submition
               submitHandler: function(form) {
                   $(form).ajaxSubmit({
                       beforeSend: function() {
                           $('#form_contattaci button[type="submit"]').attr('disabled', true);
                       },
                       success: function() {
                           console.log("successs");
                           $("#form_contattaci").addClass('submited');
                       }
                   });
               },

               // Do not change code below
               errorPlacement: function(error, element) {
                   error.insertAfter(element.parent());
               }
           });
       }
   };
};