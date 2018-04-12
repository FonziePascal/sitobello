var ContactForm = function () {

    return {

        //Contact Form
        initContactForm: function () {
	        // Validation
	        $("#sky-form3").validate({
	            // Rules for form validation
	            rules:
	            {
	                name:
	                {
	                    required: true
	                },
	                subject:
	                {
	                    required: true
	                },
                    mail:
	                {
	                    required: true,
	                    email: true
	                },
	                message:
	                {
	                    required: true,
	                    minlength: 10
	                }
	            },

	            // Messages for form validation
	            messages:
	            {
                  name:
	                {
	                    required: 'Insert a valid name'
	                },
	                phone:
	                {
	                    required: 'Insert a valid phone number'
	                },
                    mail:
	                {
	                    required: 'Insert a valid email',
                      email: 'Insert a valid email'
	                },
	                message:
	                {
	                    required: 'Insert a valid message'
	                }
	            },

	            // Ajax form submition
	            submitHandler: function(form)
	            {
	                $(form).ajaxSubmit(
	                {
	                    beforeSend: function()
	                    {
	                        $('#sky-form3 button[type="submit"]').attr('disabled', true);
	                    },
	                    success: function()
	                    {
	                    	  console.log("successs");
	                        $("#sky-form3").addClass('submited');
	                    }
	                });
	            },

	            // Do not change code below
	            errorPlacement: function(error, element)
	            {
	                error.insertAfter(element.parent());
	            }
	        });
        }

    };

}();
