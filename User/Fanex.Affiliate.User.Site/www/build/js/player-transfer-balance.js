var PlayerTransferBalance = (function ($) {

    let _curSearchName = "";
    let _exChangeRate = 0;
    let _baseCurrency = "";
    let _transferAmountLabel = "";
    let _playerCurrencyLabel = "";
    let _paymentAccLabel = "";

    var _me = {
        initialize: function () {
            _me.initEvent();
            _transferAmountLabel = $('#transfer-amount-label').text();
            _playerCurrencyLabel = $('#player-currency-label').text();
            _paymentAccLabel = $('#payment-acc-label').text();
        },

        initEvent: function () {
            $('#btn-search').on('click', function () {
                let playerName = $('#playerUserName').val();
                _curSearchName = playerName;
                _me.getPlayerInfo(playerName);
            });

            $('#btn-submit').on('click', function () {
                let param = _me.buildParam();
                _me.submitTransfer(param);
            })

            $('#amount').on('change', function () {
                let amount = $(this).val();
                let baseAmount = amount / _exChangeRate;
                $('#exchange-base-currency').text('~' + _baseCurrency + " " + baseAmount);
            })
        },

        getPlayerInfo: function (playerName) {
            $.ajax({
                type: "POST",
                dataType: "json",
                cache: false,
                data: JSON.stringify({ playerName }),
                url: Site.resolveRelativeUrl("UserPanel/PlayerTransferBalance/SearchPlayer"),
                contentType: "application/json; charset=UTF-8",

                success: function (response) {
                    _me.showSearchResult(response);
                },
                beforeSend: function () {
                    Site.showLoader();
                },
                complete: function () {
                    Site.hideLoader();
                }
            });
        },

        showSearchResult: function (response) {
            console.log(response);
            Site.displayResult(response.IsOk, response.Message);
            if (response.IsOk) {
                let data = response.Data;
                _baseCurrency = data.PaymentAccountCurrency;
                _exChangeRate = data.ExchangeRate;

                $('.transfer-info').removeClass('hidden');
                $('#transfer-amount-label').text(_transferAmountLabel.replace('{player}', _curSearchName));
                $('#player-currency-label').text(_playerCurrencyLabel.replace('{player}', _curSearchName));
                $('#payment-acc-label').text(_paymentAccLabel.replace('{account}', data.PaymentAccountName));

                $('#btn-submit').removeClass('disabled');

                $('#player-currency').text(data.PlayerCurrency);
                $('#avail-bal').text(data.Balance * data.ExchangeRate + " " + data.PlayerCurrency);
                $('#avail-bal-base-currency').text(data.Balance + " " + data.PaymentAccountCurrency);
                $('#transfer-limit').text(data.TransferLimit + " " + data.PlayerCurrency);
                $('#exchange-player-currency').text(data.PlayerCurrency);
                $('#exchange-base-currency').text('~' + _baseCurrency + " 0");
            }
            else {
                $('.transfer-info').addClass('hidden');
                $('#btn-submit').addClass('disabled');
            }
        },

        buildParam: function () {
            return {
                submitName: $('#playerUserName').val(),
                searchName: _curSearchName,
                amount: $('#amount').val(),
                exchangeRate: _exChangeRate
            }
        },

        submitTransfer: function (param) {
            $.ajax({
                type: "POST",
                dataType: "json",
                cache: false,
                data: JSON.stringify(param),
                url: Site.resolveRelativeUrl("UserPanel/PlayerTransferBalance/SubmitTransferMoney"),
                contentType: "application/json; charset=UTF-8",

                success: function (response) {
                    Site.displayResult(response.IsOk, response.Message);
                },
                beforeSend: function () {
                    Site.showLoader();
                },
                complete: function () {
                    Site.hideLoader();
                }
            });
        },
    };

    return _me;
})(jQuery)

PlayerTransferBalance.initialize();