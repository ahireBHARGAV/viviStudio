$(function () {
    "use strict";

    var currentStep = 1;
    var totalSteps = 4;

    // Initialize first step
    showStep(currentStep);

    // Next Button Click
    $('.btn-next').on('click', function (e) {
        e.preventDefault();

        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            }
        }
    });

    // Previous Button Click
    $('.btn-prev').on('click', function (e) {
        e.preventDefault();
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Submit Form
    $('.contact-wizard-form').on('submit', function (e) {
        e.preventDefault();

        if (validateStep(currentStep)) {
            var $this = $(this);
            var successMessage = "Your details have been sent successfully. We will get back to you soon.";

            // Gather all data
            var formData = $this.serialize();

            // Send data to backend
            $.post('../php/send_mail.php', formData, function (data) {
                var $submitBtn = $this.find('.btn-submit');

                // Allow button to be clickable again
                $submitBtn.prop('disabled', false);

                if (data === 'success' || data.indexOf('success') !== -1) {
                    updateTextPopup('THANK YOU!', successMessage);
                    $this[0].reset();
                    currentStep = 1;
                    showStep(currentStep);
                } else {
                    updateTextPopup('ERROR', 'Something went wrong. Please try again later.');
                }
            }).fail(function () {
                updateTextPopup('ERROR', 'Network error. Please try again.');
                $this.find('.btn-submit').prop('disabled', false);
            });

            var $submitBtn = $this.find('.btn-submit');
            $submitBtn.prop('disabled', true);
        }
    });

    // Remove invalid class on input change
    $(document).on('keyup change', '.wizard-input-wrapper input, .custom-checkbox-container input, .custom-radio-container input', function () {
        $(this).closest('.wizard-input-wrapper').removeClass('invalid');
        $(this).closest('.wizard-step').find('.error-message').remove();
    });

    function showStep(step) {
        $('.wizard-step').removeClass('active');
        $('#step-' + step).addClass('active');

        // Conditional Logic for Step 3
        if (step === 3) {
            var selectedCoverage = [];
            $('input[name="coverage[]"]:checked').each(function () {
                selectedCoverage.push($(this).val());
            });

            var commercialOptions = ["Portfolio", "Content Creation", "Product Shoot"];
            var hasCommercial = commercialOptions.some(item => selectedCoverage.includes(item));

            if (hasCommercial) {
                $('#style-preferences-col').hide();
            } else {
                $('#style-preferences-col').show(); // Ensure it's shown otherwise
                $('.btn-prev').css('display', 'block');
            }
        }

        // Update buttons visibility
        if (step === 1) {
            $('.btn-prev').hide();
        } else {
            $('.btn-prev').show();
            $('.btn-prev').css('display', 'block');
        }

        if (step === totalSteps) {
            $('.btn-next').hide();
            $('.btn-submit').show();
        } else {
            $('.btn-next').show();
            $('.btn-next').css('display', 'block');
            $('.btn-submit').hide();
        }
    }

    function validateStep(step) {
        var isValid = true;
        var $currentStep = $('#step-' + step);
        $currentStep.find('.error-message').remove(); // Clear previous errors

        if (step === 1) {
            // Step 1: Coverage Types (Must select at least one)
            if ($currentStep.find('input[type="checkbox"]:checked').length === 0) {
                isValid = false;
                $currentStep.append('<div class="error-message" style="color: red; text-align: center; margin-top: 10px;">Please select at least one coverage type.</div>');
            }
        }

        if (step === 2) {
            // Step 2: Event Dates and Venue
            var fromDate = $currentStep.find('input[name="event_date_from"]').val();

            if (!fromDate) {
                isValid = false;
                $currentStep.find('input[name="event_date_from"]').parent().addClass('invalid');
            }
        }


        if (step === 4) { // Contact Info (Step 4)
            var name = $currentStep.find('input[name="name"]').val();
            var email = $currentStep.find('input[name="email"]').val();
            var phone = $currentStep.find('input[name="phone"]').val();

            if (!$.trim(name)) {
                $currentStep.find('input[name="name"]').parent().addClass('invalid');
                isValid = false;
            }
            if (!$.trim(email) || !validateEmail(email)) {
                $currentStep.find('input[name="email"]').parent().addClass('invalid');
                isValid = false;
            }
            if (!$.trim(phone)) {
                $currentStep.find('input[name="phone"]').parent().addClass('invalid');
                isValid = false;
            }
        }

        return isValid;
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function updateTextPopup(title, text) {
        $('.text-popup .text-popup-title').text(title);
        $('.text-popup .text-popup-message').text(text);
        $('.text-popup').addClass('active');
    }
});
