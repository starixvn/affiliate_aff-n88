(function ($) {
    $.validator.setDefaults({
        highlight: function (element) {
            var $container = $(element).closest('.form-group');
            $container.addClass('has-error');
            $container.find('.help-block').removeClass('hide');
        },
        unhighlight: function (element) {
            var $container = $(element).closest('.form-group');
            $container.removeClass('has-error');
            $container.find('.help-block').addClass('hide');
        },
        errorElement: 'span',
        errorClass: 'help-block hide'
    });

    $.validator.unobtrusive.adapters.add('requiredbychecked', ['dependentprop', 'checked'],
        function (options) {
            options.rules['requiredbychecked'] = {
                dependentprop: options.params.dependentprop,
                checked: options.params.checked === 'True'
            };
            options.messages['requiredbychecked'] = options.message;
        });

    $.validator.addMethod('requiredbychecked',
        function (value, element, params) {
            var isValid = true;

            var isChecked = $("[name='" + params.dependentprop + "']:checked").val().trim() === 'True';
            if (isChecked === params.checked && $.trim(value).length === 0) {
                isValid = false;
            }

            return isValid;
        }
    );

    $.validator.unobtrusive.adapters.add('requiredifnullorempty', ['dependentprop'],
        function (options) {
            options.rules['requiredifnullorempty'] = {
                dependentprop: options.params.dependentprop
            };
            options.messages['requiredifnullorempty'] = options.message;
        });

    $.validator.addMethod('requiredifnullorempty',
        function (value, element, params) {
            var dependentPropList = params.dependentprop
                .split(',')
                .map(function (p) { return p.trim(); })
                .filter(Boolean);

            var allDependentsEmpty = dependentPropList.every(function (propName) {
                var inputValue = $("[name='" + propName + "']").val();
                return $.trim(inputValue).length === 0;
            });

            var valueEmpty = $.trim(value).length === 0;

            if (allDependentsEmpty && valueEmpty) {
                return false;
            }

            return true;
        }
    );

    function setupRequiredIfNullOrEmptyAutoValidate(formSelector) {
        const $form = $(formSelector);
        $form.find('[data-val-requiredifnullorempty]').each(function () {
            const $field = $(this);
            const props = $field.attr('data-val-requiredifnullorempty-dependentprop');

            if (!props) return;

            const propList = props.split(',').map(p => p.trim()).filter(Boolean);

            propList.forEach(propName => {
                const $dependent = $form.find(`[name='${propName}']`);
                $dependent.on('input', function () {
                    $form.validate().element($field[0]);
                });
            });
        });
    }

    setupRequiredIfNullOrEmptyAutoValidate('form');
})(jQuery)