$(function () {
    "use strict";

    var currentStep = 1;
    var totalSteps = 4;

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined' && CONTACT_CONFIG.emailjs.publicKey !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(CONTACT_CONFIG.emailjs.publicKey);
    }

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
            var $submitBtn = $this.find('.btn-submit');
            $submitBtn.prop('disabled', true).text('SENDING...');

            // ── Gather all form data ─────────────────────────
            var formData = gatherFormData($this);

            // ── Send via both channels in parallel ───────────
            var emailPromise = sendViaEmailJS(formData);
            var telegramPromise = sendViaTelegram(formData);

            Promise.allSettled([emailPromise, telegramPromise])
                .then(function (results) {
                    var emailOk = results[0].status === 'fulfilled';
                    var telegramOk = results[1].status === 'fulfilled';

                    if (emailOk || telegramOk) {
                        // At least one channel succeeded
                        updateTextPopup(
                            'THANK YOU!',
                            'Your details have been sent successfully. We will get back to you soon!'
                        );
                        $this[0].reset();
                        currentStep = 1;
                        showStep(currentStep);
                    } else {
                        // Both failed
                        console.error('EmailJS error:', results[0].reason);
                        console.error('Telegram error:', results[1].reason);
                        updateTextPopup(
                            'ERROR',
                            'Something went wrong. Please try again or contact us directly at +91 9356404645.'
                        );
                    }

                    $submitBtn.prop('disabled', false).text('SUBMIT');
                });
        }
    });

    // ══════════════════════════════════════════════════════════
    //  DATA GATHERING
    // ══════════════════════════════════════════════════════════

    function gatherFormData($form) {
        // Coverage types
        var coverage = [];
        $form.find('input[name="coverage[]"]:checked').each(function () {
            coverage.push($(this).val());
        });

        // Style preferences
        var styles = [];
        $form.find('input[name="style[]"]:checked').each(function () {
            styles.push($(this).val());
        });

        // Budget
        var budget = $form.find('input[name="budget"]:checked').val() || 'Not specified';

        // Dates & venue
        var dateFrom = $.trim($form.find('input[name="event_date_from"]').val()) || 'Not specified';
        var dateTo = $.trim($form.find('input[name="event_date_to"]').val()) || 'Not specified';
        var venue = $.trim($form.find('input[name="venue"]').val()) || 'Not specified';

        // Contact info
        var name = $.trim($form.find('input[name="name"]').val());
        var email = $.trim($form.find('input[name="email"]').val());
        var phone = $.trim($form.find('input[name="phone"]').val());

        return {
            name: name,
            email: email,
            phone: phone,
            coverage: coverage.join(', ') || 'None selected',
            event_dates: dateFrom + (dateTo !== 'Not specified' ? ' → ' + dateTo : ''),
            venue: venue,
            style: styles.join(', ') || 'Not specified',
            budget: budget
        };
    }

    // ══════════════════════════════════════════════════════════
    //  EMAIL JS
    // ══════════════════════════════════════════════════════════

    function sendViaEmailJS(data) {
        var cfg = CONTACT_CONFIG.emailjs;

        // Skip if not configured
        if (cfg.publicKey === 'YOUR_PUBLIC_KEY') {
            return Promise.reject('EmailJS not configured');
        }

        return emailjs.send(cfg.serviceId, cfg.templateId, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            coverage: data.coverage,
            event_dates: data.event_dates,
            venue: data.venue,
            style: data.style,
            budget: data.budget
        });
    }

    // ══════════════════════════════════════════════════════════
    //  TELEGRAM BOT
    // ══════════════════════════════════════════════════════════

    function sendViaTelegram(data) {
        var cfg = CONTACT_CONFIG.telegram;

        // Skip if not configured
        if (cfg.botToken === 'YOUR_BOT_TOKEN') {
            return Promise.reject('Telegram not configured');
        }

        // Format a clean message with emoji
        var message = '📩 *New Lead — VAVI Studios*\n'
            + '━━━━━━━━━━━━━━━━━━━━\n'
            + '👤 *Name:* ' + escapeMarkdown(data.name) + '\n'
            + '📧 *Email:* ' + escapeMarkdown(data.email) + '\n'
            + '📱 *Phone:* ' + escapeMarkdown(data.phone) + '\n'
            + '━━━━━━━━━━━━━━━━━━━━\n'
            + '🎬 *Coverage:* ' + escapeMarkdown(data.coverage) + '\n'
            + '📅 *Event Dates:* ' + escapeMarkdown(data.event_dates) + '\n'
            + '📍 *Venue:* ' + escapeMarkdown(data.venue) + '\n'
            + '🎨 *Style:* ' + escapeMarkdown(data.style) + '\n'
            + '💰 *Budget:* ' + escapeMarkdown(data.budget) + '\n'
            + '━━━━━━━━━━━━━━━━━━━━';

        var url = 'https://api.telegram.org/bot' + cfg.botToken + '/sendMessage';

        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: cfg.chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        }).then(function (response) {
            if (!response.ok) {
                return response.text().then(function (body) {
                    throw new Error('Telegram API error: ' + body);
                });
            }
            return response.json();
        });
    }

    function escapeMarkdown(text) {
        if (!text) return '';
        return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
    }

    // ══════════════════════════════════════════════════════════
    //  WIZARD UI LOGIC  (unchanged from original)
    // ══════════════════════════════════════════════════════════

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
                $('#style-preferences-col').show();
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
        $currentStep.find('.error-message').remove();

        if (step === 1) {
            if ($currentStep.find('input[type="checkbox"]:checked').length === 0) {
                isValid = false;
                $currentStep.append('<div class="error-message" style="color: red; text-align: center; margin-top: 10px;">Please select at least one coverage type.</div>');
            }
        }

        if (step === 2) {
            var fromDate = $currentStep.find('input[name="event_date_from"]').val();
            if (!fromDate) {
                isValid = false;
                $currentStep.find('input[name="event_date_from"]').parent().addClass('invalid');
            }
        }

        if (step === 4) {
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
