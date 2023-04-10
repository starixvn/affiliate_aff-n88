(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["statementHistory"],{

/***/ "./Areas/Portal/www/source/js/pages/common/actions/paymentRequestUpdate.js":
/*!*********************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/common/actions/paymentRequestUpdate.js ***!
  \*********************************************************************************/
/*! exports provided: getPaymentRequestDetail, updatePaymentRequest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPaymentRequestDetail", function() { return getPaymentRequestDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePaymentRequest", function() { return updatePaymentRequest; });
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_ajaxRequest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../modules/ajaxRequest */ "./Areas/Portal/www/source/js/modules/ajaxRequest.js");



var getPaymentRequestDetail = function getPaymentRequestDetail(param) {
  return (
    /*#__PURE__*/
    _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var url, response;
      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = 'Portal/PaymentRequest/GetPaymentRequestDetail';
              _context.next = 3;
              return Object(_modules_ajaxRequest__WEBPACK_IMPORTED_MODULE_2__["post"])(url, param);

            case 3:
              response = _context.sent;
              return _context.abrupt("return", response && response.status === 200 ? response.data : null);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))
  );
};
var updatePaymentRequest = function updatePaymentRequest(param) {
  return (
    /*#__PURE__*/
    _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
    /*#__PURE__*/
    _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var url, response;
      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = 'Portal/PaymentRequest/UpdatePaymentRequest';
              _context2.next = 3;
              return Object(_modules_ajaxRequest__WEBPACK_IMPORTED_MODULE_2__["post"])(url, param);

            case 3:
              response = _context2.sent;
              return _context2.abrupt("return", response && response.status === 200 ? response.data : null);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))
  );
};

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/common/components/PaymentRequestUpdateForm.jsx":
/*!*****************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/common/components/PaymentRequestUpdateForm.jsx ***!
  \*****************************************************************************************/
/*! exports provided: PaymentRequestUpdateForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentRequestUpdateForm", function() { return PaymentRequestUpdateForm; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs3/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "./node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../modules/constants/paymentRequestUpdate */ "./Areas/Portal/www/source/js/pages/common/modules/constants/paymentRequestUpdate.js");
/* harmony import */ var _modules_numberFormat__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../modules/numberFormat */ "./Areas/Portal/www/source/js/modules/numberFormat.js");
/* harmony import */ var _actions_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../actions/paymentRequestUpdate */ "./Areas/Portal/www/source/js/pages/common/actions/paymentRequestUpdate.js");
/* harmony import */ var _modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../modules/htmlHelper */ "./Areas/Portal/www/source/js/modules/htmlHelper.js");



















var processingStatus = _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["processing"].toLowerCase();
var approvedStatus = _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["statusList"].Approved.toLowerCase();
var rejectedStatus = _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["statusList"].Rejected.toLowerCase();
var PaymentRequestUpdateForm =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default()(PaymentRequestUpdateForm, _PureComponent);

  function PaymentRequestUpdateForm(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, PaymentRequestUpdateForm);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(PaymentRequestUpdateForm).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleChange", function (event) {
      _this.setState({
        paymentRequestInfo: _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, _this.state.paymentRequestInfo, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, event.target.name, event.target.value))
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleGetPaymentRequestInfo",
    /*#__PURE__*/
    function () {
      var _ref = _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(transId) {
        var data;
        return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.props.getPaymentRequestDetail({
                  transId: transId
                });

              case 2:
                data = _context.sent;
                data && _this.setState({
                  paymentRequestInfo: data,
                  originalStatus: Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(data.Status),
                  isSendingRequest: false
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleSave",
    /*#__PURE__*/
    _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
      var _this$state, paymentRequestInfo, originalStatus, selectedStatus, paymentInfo, result;

      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$state = _this.state, paymentRequestInfo = _this$state.paymentRequestInfo, originalStatus = _this$state.originalStatus;
              selectedStatus = paymentRequestInfo.Status;

              if (!(originalStatus && originalStatus.toLowerCase() === processingStatus && selectedStatus && (selectedStatus.toLowerCase() === approvedStatus || selectedStatus.toLowerCase() === rejectedStatus))) {
                _context2.next = 11;
                break;
              }

              _this.setState({
                isSendingRequest: true
              });

              paymentInfo = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, {
                AffId: paymentRequestInfo.AffId,
                TransId: paymentRequestInfo.TransId,
                IsApproved: selectedStatus.toLowerCase() === approvedStatus,
                AdminDesc: paymentRequestInfo.AdminDesc,
                AffDesc: paymentRequestInfo.AffDesc
              });
              _context2.next = 7;
              return _this.props.updatePaymentRequest(paymentInfo);

            case 7:
              result = _context2.sent;

              if (result) {
                _this.setState({
                  isShowMessage: true,
                  isSuccess: result.IsSuccessful,
                  message: result.IsSuccessful ? "Transaction ID ".concat(paymentRequestInfo.TransId, " has been updated successfully!") : result.Message
                }, function () {
                  return window.setTimeout(_this.hideMessage, 3000);
                });

                if (result.IsSuccessful) {
                  window.setTimeout(function () {
                    return _this.props.handleClosePopup();
                  }, 3000);
                  window.setTimeout(function () {
                    return _this.props.handleFetchData();
                  }, 3200);
                }
              } else {
                _this.setState({
                  isSuccess: false,
                  isShowMessage: true,
                  message: _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["errorList"].UpdateFailed
                }, function () {
                  return window.setTimeout(_this.hideMessage, 3000);
                });
              }

              _context2.next = 12;
              break;

            case 11:
              _this.setState({
                isSuccess: false,
                isShowMessage: true,
                message: _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["errorList"].NotChoose
              }, function () {
                return window.setTimeout(_this.hideMessage, 3000);
              });

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "hideMessage", function () {
      _this.setState({
        isShowMessage: false
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleClosePopup", function () {
      _this.props.handleClosePopup();

      _this.setState({
        paymentRequestInfo: null
      });
    });

    _this.state = {
      paymentRequestInfo: null,
      originalStatus: '',
      isSuccess: true,
      isShowMessage: false,
      message: '',
      isSendingRequest: false
    };
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(PaymentRequestUpdateForm, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var transactionId = this.props.transactionId;

      if (transactionId && transactionId !== prevProps.transactionId) {
        this.handleGetPaymentRequestInfo(transactionId);
      }
    }
  }, {
    key: "_renderAccountInformation",
    value: function _renderAccountInformation(paymentRequestInfo) {
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("fieldset", null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("legend", null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("h6", {
        className: "font-weight-bold"
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].AccountInformation)), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].UserName), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("strong", null, paymentRequestInfo.AffName))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].RequestedDate), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("strong", null, paymentRequestInfo.TransDateText))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].EmailAddress), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(paymentRequestInfo.Email))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].FirstName), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(paymentRequestInfo.FirstName))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].LastName), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(paymentRequestInfo.LastName))));
    }
  }, {
    key: "_renderPaymentCompletionInfo",
    value: function _renderPaymentCompletionInfo(paymentRequestInfo) {
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_11___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].CompletedDate), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("strong", null, paymentRequestInfo.CompletedDateText))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].UpdatedBy), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(paymentRequestInfo.Creator))));
    }
  }, {
    key: "_renderOptionalStatus",
    value: function _renderOptionalStatus() {
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2 ml-1"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        className: "mr-4",
        check: true
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        check: true
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Input"], {
        name: "Status",
        type: "radio",
        className: "mr-2",
        value: _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["statusList"].Approved,
        onChange: this.handleChange
      }), _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["statusList"].Approved)), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        check: true
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        check: true
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Input"], {
        name: "Status",
        type: "radio",
        className: "mr-2",
        value: _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["statusList"].Rejected,
        onChange: this.handleChange
      }), _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["statusList"].Rejected)));
    }
  }, {
    key: "_renderPaymentInformation",
    value: function _renderPaymentInformation(paymentRequestInfo, isProcessing) {
      var _context3, _context4;

      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("fieldset", null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("legend", null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("h6", {
        className: "font-weight-bold"
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].PaymentInformation)), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].PaymentMethod), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("strong", null, Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(paymentRequestInfo.PaymentMethod)))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].Amount), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("strong", null, Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_16__["formatDecimalWithCurrencySymbol"])(paymentRequestInfo.Amount)))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].TransAmount), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("strong", null, _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context3 = "".concat(Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_16__["formatDecimalWithCurrencySymbol"])(paymentRequestInfo.TransAmount), " (")).call(_context3, paymentRequestInfo.TransCurrencyCode, ")")))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].Status), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("strong", null, Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(paymentRequestInfo.Status)))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        row: true,
        className: "mb-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context4 = "".concat(this.props.licenseeName, " ")).call(_context4, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].UserName)), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        sm: 6
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("strong", null, Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(paymentRequestInfo.PlayerUsername)))), isProcessing ? this._renderOptionalStatus() : this._renderPaymentCompletionInfo(paymentRequestInfo));
    }
  }, {
    key: "_renderNote",
    value: function _renderNote(paymentRequestInfo, isProcessing) {
      var AdminDesc = paymentRequestInfo.AdminDesc,
          AffDesc = paymentRequestInfo.AffDesc;
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Row"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Col"], {
        sm: 6,
        className: "pr-1"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("fieldset", null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("legend", null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("h6", {
        className: "font-weight-bold"
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].AdminNote)), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        for: "AdminDesc"
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].VisibleAdmin), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Input"], {
        type: "textarea",
        name: "AdminDesc",
        rows: "6",
        disabled: !isProcessing,
        value: Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(AdminDesc),
        onChange: this.handleChange
      })))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Col"], {
        sm: 6,
        className: "pl-1"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("fieldset", null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("legend", null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("h6", {
        className: "font-weight-bold"
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].AffiliateNote)), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        for: "AffDesc"
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["resource"].VisibleAffiliate), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Input"], {
        type: "textarea",
        name: "AffDesc",
        rows: "6",
        disabled: !isProcessing,
        value: Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(AffDesc),
        onChange: this.handleChange
      })))));
    }
  }, {
    key: "render",
    value: function render() {
      var transactionId = this.props.transactionId;
      var _this$state2 = this.state,
          paymentRequestInfo = _this$state2.paymentRequestInfo,
          originalStatus = _this$state2.originalStatus,
          isSuccess = _this$state2.isSuccess,
          isShowMessage = _this$state2.isShowMessage,
          message = _this$state2.message,
          isSendingRequest = _this$state2.isSendingRequest;
      var isProcessing = originalStatus && originalStatus.toLowerCase() === processingStatus;
      return paymentRequestInfo && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Modal"], {
        isOpen: transactionId,
        toggle: this.handleClosePopup,
        backdrop: "static"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["ModalHeader"], {
        toggle: this.handleClosePopup
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("span", {
        className: "iconpopup"
      }), "Trxn.ID ", transactionId), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["ModalBody"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "modal-body-wrapper p-0"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Form"], {
        tag: "form",
        className: "payment-request-update-form"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Alert"], {
        color: isSuccess ? 'success' : 'danger',
        isOpen: isShowMessage
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: message
        }
      })), this._renderAccountInformation(paymentRequestInfo), this._renderPaymentInformation(paymentRequestInfo, isProcessing), this._renderNote(paymentRequestInfo, isProcessing), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Button"], {
        type: "button",
        color: "success",
        className: "mr-3",
        disabled: !isProcessing || isSendingRequest,
        onClick: this.handleSave
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["globalResource"].Update), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Button"], {
        type: "button",
        color: "info",
        onClick: this.handleClosePopup
      }, _modules_constants_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_15__["globalResource"].Cancel)))));
    }
  }]);

  return PaymentRequestUpdateForm;
}(react__WEBPACK_IMPORTED_MODULE_11__["PureComponent"]);

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_13__["bindActionCreators"])({
    getPaymentRequestDetail: _actions_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_17__["getPaymentRequestDetail"],
    updatePaymentRequest: _actions_paymentRequestUpdate__WEBPACK_IMPORTED_MODULE_17__["updatePaymentRequest"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_12__["connect"])(null, mapDispatchToProps)(PaymentRequestUpdateForm));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/common/modules/constants/paymentRequestUpdate.js":
/*!*******************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/common/modules/constants/paymentRequestUpdate.js ***!
  \*******************************************************************************************/
/*! exports provided: globalResource, errorList, processing, statusList, resource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "errorList", function() { return errorList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processing", function() { return processing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "statusList", function() { return statusList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resource", function() { return resource; });
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_globalResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../modules/globalResource */ "./Areas/Portal/www/source/js/modules/globalResource.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "globalResource", function() { return _modules_globalResource__WEBPACK_IMPORTED_MODULE_1__["globalResource"]; });



var _statusList;



var errorList = {
  NotChoose: 'You must choose Approved or Rejected for this request!',
  UpdateFailed: 'Update transaction failed!'
};
var processing = 'Processing';
var statusList = (_statusList = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_statusList, processing, 'Processing'), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_statusList, "Approved", 'Approved'), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_statusList, "Rejected", 'Rejected'), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_statusList, "Cancelled", 'Cancelled'), _statusList);
var resource = {
  AccountInformation: 'Account Information',
  UserName: 'User Name',
  RequestedDate: 'Requested Date',
  EmailAddress: 'Email Address',
  FirstName: 'First Name',
  LastName: 'Last Name',
  PaymentInformation: 'Payment Information',
  PaymentMethod: 'Payment Method',
  Amount: 'Amount',
  TransAmount: 'Transfer Amount',
  Status: 'Status',
  CompletedDate: 'Completed Date',
  UpdatedBy: 'Updated By',
  AdminNote: 'Admin Note',
  VisibleAdmin: 'Visible only to admin',
  AffiliateNote: 'Affiliate Note',
  VisibleAffiliate: 'Visible also to affiliate'
};

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/components/AppContainer.jsx":
/*!***************************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/statement-history/components/AppContainer.jsx ***!
  \***************************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs3/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "./node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../layouts/AppLayout */ "./Areas/Portal/www/source/js/layouts/AppLayout.jsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Filter */ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/components/Filter.jsx");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Content */ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/components/Content.jsx");
/* harmony import */ var _common_components_PaymentRequestUpdateForm__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../common/components/PaymentRequestUpdateForm */ "./Areas/Portal/www/source/js/pages/common/components/PaymentRequestUpdateForm.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/actions/index.js");
















var AppContainer =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(AppContainer, _PureComponent);

  function AppContainer(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, AppContainer);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(AppContainer).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "handleClosePopup", function () {
      _this.props.setTransactionId(null);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "handleFetchData", function () {
      var affName = _this.props.affName;

      _this.props.getAffiliateInfo(affName);
    });

    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AppContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          transactionId = _this$props.transactionId,
          licenseeName = _this$props.licenseeName;
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_11__["default"], null, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_12__["default"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_13__["default"], null), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(_common_components_PaymentRequestUpdateForm__WEBPACK_IMPORTED_MODULE_14__["default"], {
        licenseeName: licenseeName,
        transactionId: transactionId,
        handleClosePopup: this.handleClosePopup,
        handleFetchData: this.handleFetchData
      }));
    }
  }]);

  return AppContainer;
}(react__WEBPACK_IMPORTED_MODULE_8__["PureComponent"]);

function mapStateToProps(_ref) {
  var statementHistory = _ref.statementHistory,
      affCommonInfo = _ref.affCommonInfo,
      licenseeName = _ref.licenseeName;
  var transactionId = statementHistory.transactionId;
  var affName = affCommonInfo.affName;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, {
    transactionId: transactionId,
    affName: affName,
    licenseeName: licenseeName
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_10__["bindActionCreators"])({
    setTransactionId: _actions__WEBPACK_IMPORTED_MODULE_15__["setTransactionId"],
    setParam: _actions__WEBPACK_IMPORTED_MODULE_15__["setParam"],
    getAffiliateInfo: _actions__WEBPACK_IMPORTED_MODULE_15__["getAffiliateInfo"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/components/Content.jsx":
/*!**********************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/statement-history/components/Content.jsx ***!
  \**********************************************************************************************/
/*! exports provided: Content, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return Content; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs3/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs3/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "./node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @9softstudio/react-fixed-table-header */ "./node_modules/@9softstudio/react-fixed-table-header/dist/index.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../modules/htmlHelper */ "./Areas/Portal/www/source/js/modules/htmlHelper.js");
/* harmony import */ var _modules_numberFormat__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../modules/numberFormat */ "./Areas/Portal/www/source/js/modules/numberFormat.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/actions/index.js");
/* harmony import */ var _modules_constants__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../modules/constants */ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/modules/constants.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../modules/utils */ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/modules/utils.js");























var Content =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_11___default()(Content, _PureComponent);

  function Content(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, Content);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(Content).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "getRedirectParam", function (dataItem) {
      var _this$props = _this.props,
          affId = _this$props.affId,
          expandMonthDateList = _this$props.expandMonthDateList,
          param = _this$props.param;
      return {
        affId: affId,
        monthDate: dataItem.NormalizeDateText,
        statementHistory: {
          param: param,
          scrollTop: Object(_modules_utils__WEBPACK_IMPORTED_MODULE_22__["getScrollTopPosition"])(),
          expandMonthDateList: expandMonthDateList
        }
      };
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "_handleRedirectToDailyEarning", function (dataItem) {
      var dailyEarningParam = _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5___default()({}, _this.getRedirectParam(dataItem), {
        productId: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["selectedAllProduct"]
      });

      return _this.props.redirectToDailyEarning(dailyEarningParam);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "_handleRedirectToSubAffiliate", function (dataItem) {
      var subAffiliateParam = _this.getRedirectParam(dataItem);

      return _this.props.redirectToSubAffiliate(subAffiliateParam);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "_handleShow", function (monthDate) {
      var expandMonthDateList = _this.props.expandMonthDateList;

      _this.setState({
        shouldResetScrollPosition: false
      });

      _this.props.setExpandMonthDateList(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, expandMonthDateList, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()({}, monthDate, !expandMonthDateList[monthDate])));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleSetTransactionId", function (transId) {
      _this.setState({
        shouldResetScrollPosition: false
      });

      _this.props.setTransactionId(transId);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handlePaging", function (pageIndex, pageSize) {
      var newParam = _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_5___default()({}, _this.props.param, {
        pageIndex: pageIndex,
        pageSize: pageSize,
        isBack: false
      });

      _this.fetchData(newParam);
    });

    _this.state = {
      gridData: null,
      shouldResetScrollPosition: true
    };
    _this.transTypeClickHandler = _this._getClickHandlerByTransType();
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(Content, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          pagingOption = _this$props2.pagingOption,
          param = _this$props2.param,
          affId = _this$props2.affId;

      if (param !== prevProps.param || affId !== prevProps.affId) {
        var newParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, param, {
          pageIndex: 1,
          pageSize: pagingOption.PageSize
        });

        this.fetchData(newParam, affId !== prevProps.affId);
      }
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(param, isChangedAffId) {
        var affId, isGetAll, fromDate, toDate, pageIndex, pageSize, postParam, data;
        return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.props.toggleLoaderUserPanel(true);
                affId = this.props.affId;
                isGetAll = param.isGetAll, fromDate = param.fromDate, toDate = param.toDate, pageIndex = param.pageIndex, pageSize = param.pageSize;
                postParam = isGetAll ? {
                  fromDate: null,
                  toDate: null,
                  affId: affId,
                  pageIndex: pageIndex,
                  pageSize: pageSize
                } : {
                  fromDate: fromDate,
                  toDate: toDate,
                  affId: affId,
                  pageIndex: pageIndex,
                  pageSize: pageSize
                };
                _context.next = 6;
                return this.props.fetchData(postParam);

              case 6:
                data = _context.sent;
                this.setState({
                  gridData: data ? data.MainData : null,
                  shouldResetScrollPosition: true
                });
                this.props.setPagingOption({
                  TotalItem: data ? data.TotalItem : 0,
                  PageIndex: pageIndex,
                  PageSize: pageSize
                });
                this.props.toggleLoaderUserPanel(false);
                !param.isBack || isChangedAffId ? this.props.setExpandMonthDateList({}) : Object(_modules_utils__WEBPACK_IMPORTED_MODULE_22__["setScrollTop"])(param.scrollTop);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchData(_x, _x2) {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "_renderHeader",
    value: function _renderHeader() {
      return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Row"], {
        key: "thead"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        header: true,
        colWidth: 35,
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Index
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Index), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        header: true,
        colWidth: 100,
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Date
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Date), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        header: true,
        colWidth: 110,
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Type
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Type), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        header: true,
        colWidth: 100,
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Amount
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Amount), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        header: true,
        colWidth: 95,
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Status
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Status), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        header: true,
        colWidth: 110,
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Creator
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Creator), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        header: true,
        colWidth: 450,
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Description
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["headerText"].Description));
    }
  }, {
    key: "_renderDataSection",
    value: function _renderDataSection(dataList) {
      var dataRows = [];

      if (dataList && dataList.length) {
        var pagingOption = this.props.pagingOption;
        var startIndex = (pagingOption.PageIndex - 1) * pagingOption.PageSize + 1;

        for (var i = 0; i < dataList.length; i++) {
          var dataItem = dataList[i];
          dataRows.push(this._buildDataRow(dataItem, i + startIndex));
        }
      } else {
        dataRows.push(react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Row"], null, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
          className: "text-center",
          colSpan: "7"
        }, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["globalResource"].NoInfo)));
      }

      return dataRows;
    }
  }, {
    key: "_getClickHandlerByTransType",
    value: function _getClickHandlerByTransType() {
      var _this2 = this,
          _ref;

      return _ref = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_ref, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["PAYMENT_REQUEST"], function (dataItem) {
        return function () {
          return _this2.handleSetTransactionId(dataItem.TransId);
        };
      }), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_ref, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["MONTHLY_EARNING"], function (dataItem) {
        return function () {
          return _this2._handleRedirectToDailyEarning(dataItem);
        };
      }), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_ref, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["SUBAFFILIATE"], function (dataItem) {
        return function () {
          return _this2._handleRedirectToSubAffiliate(dataItem);
        };
      }), _ref;
    }
  }, {
    key: "_buildDataRow",
    value: function _buildDataRow(dataItem, index) {
      var _context2,
          _context3,
          _this3 = this,
          _context4;

      var expandMonthDateList = this.props.expandMonthDateList;
      var isExpand = expandMonthDateList[dataItem.NormalizeDateText];
      var amount = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_19__["formatDecimalWithCurrencySymbol"])(dataItem.Amount);
      var transType = dataItem.TransType;
      var clickHandler = this.transTypeClickHandler[transType];
      var status = dataItem.Status;
      var isProcessing = status && status.toLowerCase() === 'processing';
      var creator = Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(dataItem.Creator);
      var description = Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(dataItem.DescriptionDisplay);
      var isTotalRow = transType === _modules_constants__WEBPACK_IMPORTED_MODULE_21__["MONTHLY_TOTAL"];
      var transTypeString = isTotalRow && dataItem.CalculatedType == _modules_constants__WEBPACK_IMPORTED_MODULE_21__["CalculatedMonth"] ? 'Monthly Total' : _modules_constants__WEBPACK_IMPORTED_MODULE_21__["transTypeList"][transType];
      return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_13___default.a.Fragment, {
        key: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1___default()(_context2 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1___default()(_context3 = "dataRow-".concat(dataItem.TransId, "-")).call(_context3, dataItem.DateText, "-")).call(_context2, dataItem.TransType)
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Row"], {
        className: status && status.toLowerCase()
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        title: index,
        className: "text-center"
      }, index), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        title: dataItem.DateText,
        className: "text-center"
      }, isTotalRow ? react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Button"], {
        className: "p-0 th-wrapper",
        color: "link",
        onClick: function onClick() {
          return _this3._handleShow(dataItem.NormalizeDateText);
        }
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("div", {
        className: "icon-container"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("span", {
        className: "caret ".concat(isExpand ? 'expand current' : 'collapsed')
      })), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("span", null, dataItem.DateText)) : dataItem.DateText), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        title: transTypeString || _modules_constants__WEBPACK_IMPORTED_MODULE_21__["monthlyEarning"],
        className: "text-center"
      }, transTypeString || _modules_constants__WEBPACK_IMPORTED_MODULE_21__["monthlyEarning"]), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        title: amount,
        className: "text-right"
      }, clickHandler ? react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Button"], {
        className: "p-0",
        color: "link",
        onClick: clickHandler(dataItem)
      }, amount) : amount), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        title: status,
        className: "text-center"
      }, isProcessing ? react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Button"], {
        className: "p-0",
        color: "link",
        onClick: function onClick() {
          return _this3.handleSetTransactionId(dataItem.TransId);
        }
      }, status) : status), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        title: creator,
        className: "text-center"
      }, creator), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Cell"], {
        title: description
      }, description)), isTotalRow && isExpand && _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0___default()(_context4 = dataItem.Children).call(_context4, function (item) {
        return _this3._buildDataRow(item);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          gridData = _this$state.gridData,
          shouldResetScrollPosition = _this$state.shouldResetScrollPosition;
      return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("div", {
        className: "data-content payment-request"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("div", {
        className: "table-responsive table-striped my-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Table"], {
        maxWidth: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["maxWidth"],
        bodyHeight: 300,
        header: this._renderHeader(),
        body: this._renderDataSection(gridData),
        containerPadding: 10,
        isPaging: true,
        pageOption: this.props.pagingOption,
        onPaging: this.handlePaging,
        shouldResetScrollPosition: shouldResetScrollPosition
      })));
    }
  }]);

  return Content;
}(react__WEBPACK_IMPORTED_MODULE_13__["PureComponent"]);

function mapStateToProps(_ref2) {
  var affCommonInfo = _ref2.affCommonInfo,
      statementHistory = _ref2.statementHistory;
  var pagingOption = statementHistory.pagingOption,
      param = statementHistory.param,
      expandMonthDateList = statementHistory.expandMonthDateList;
  var affId = affCommonInfo.affId;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, {
    affId: affId,
    pagingOption: pagingOption,
    param: param,
    expandMonthDateList: expandMonthDateList
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_15__["bindActionCreators"])({
    setPagingOption: _actions__WEBPACK_IMPORTED_MODULE_20__["setPagingOption"],
    toggleLoaderUserPanel: _actions__WEBPACK_IMPORTED_MODULE_20__["toggleLoaderUserPanel"],
    fetchData: _actions__WEBPACK_IMPORTED_MODULE_20__["fetchData"],
    setTransactionId: _actions__WEBPACK_IMPORTED_MODULE_20__["setTransactionId"],
    redirectToDailyEarning: _actions__WEBPACK_IMPORTED_MODULE_20__["redirectToDailyEarning"],
    setExpandMonthDateList: _actions__WEBPACK_IMPORTED_MODULE_20__["setExpandMonthDateList"],
    redirectToSubAffiliate: _actions__WEBPACK_IMPORTED_MODULE_20__["redirectToSubAffiliate"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_14__["connect"])(mapStateToProps, mapDispatchToProps)(Content));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/components/Filter.jsx":
/*!*********************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/statement-history/components/Filter.jsx ***!
  \*********************************************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs3/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "./node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @9softstudio/react-datepicker */ "./node_modules/@9softstudio/react-datepicker/dist/index.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _modules_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../modules/constants */ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/modules/constants.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../modules/utils */ "./Areas/Portal/www/source/js/modules/utils.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/actions/index.js");

















var Filter =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(Filter, _PureComponent);

  function Filter(props) {
    var _context, _context2, _context3, _context4;

    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Filter);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Filter).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "handleSearch", function (e) {
      _this.search(false, 0);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "search", function (isBack, scrollTop) {
      var _this$state = _this.state,
          isGetAll = _this$state.isGetAll,
          fromDate = _this$state.fromDate,
          toDate = _this$state.toDate;

      var newParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, {
        isGetAll: isGetAll,
        fromDate: fromDate,
        toDate: toDate,
        isBack: isBack,
        scrollTop: scrollTop
      });

      _this.props.setParam(newParam);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "handleChecked", function (event) {
      _this.setState(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()({}, event.target.name, event.target.checked));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "handleChangeFromDate", function (momentDate) {
      _this.setState(Object(_modules_utils__WEBPACK_IMPORTED_MODULE_15__["getDateRange"])(momentDate, _this.state.toDate));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "handleChangeToDate", function (momentDate) {
      _this.setState({
        toDate: momentDate.format("MM/DD/YYYY")
      });
    });

    var _this$props = _this.props,
        today = _this$props.today,
        param = _this$props.param;
    var now = new Date(today);
    _this.nowString = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context2 = "".concat(now.getMonth() + 1, "/")).call(_context2, now.getDate(), "/")).call(_context, now.getFullYear());
    var sixMonthAgo = new Date(today);
    sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
    _this.state = param || {
      isGetAll: false,
      fromDate: sixMonthAgo < _modules_constants__WEBPACK_IMPORTED_MODULE_14__["minDate"] ? '01/01/2020' : _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context3 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context4 = "".concat(sixMonthAgo.getMonth() + 1, "/")).call(_context4, sixMonthAgo.getDate(), "/")).call(_context3, sixMonthAgo.getFullYear()),
      toDate: _this.nowString
    };
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Filter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _ref = this.props.param || {
        isBack: false,
        scrollTop: 0
      },
          isBack = _ref.isBack,
          scrollTop = _ref.scrollTop;

      this.search(isBack, scrollTop);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          isGetAll = _this$state2.isGetAll,
          fromDate = _this$state2.fromDate,
          toDate = _this$state2.toDate;
      return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("div", {
        className: "filter-container"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Form"], {
        inline: true,
        tag: "div"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        className: "mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
        className: "mr-sm-2"
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_14__["globalResource"].From), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_13__["DatePicker"], {
        minDate: _modules_constants__WEBPACK_IMPORTED_MODULE_14__["minDate"],
        maxDate: this.nowString,
        date: fromDate,
        isEnable: !isGetAll,
        iconElement: react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
          className: "oi oi-calendar icon-calendar ml-1"
        }),
        onChange: this.handleChangeFromDate
      })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        className: "mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
        className: "mr-sm-2"
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_14__["globalResource"].To), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_13__["DatePicker"], {
        minDate: fromDate,
        maxDate: this.nowString,
        date: toDate,
        isEnable: !isGetAll,
        iconElement: react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
          className: "oi oi-calendar icon-calendar ml-1"
        }),
        onChange: this.handleChangeToDate
      })), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        className: "mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["FormGroup"], {
        check: true
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Label"], {
        check: true
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_14__["globalResource"].GetAll, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Input"], {
        name: "isGetAll",
        className: "ml-1 mr-2",
        type: "checkbox",
        checked: isGetAll,
        onChange: this.handleChecked
      })))), react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_12__["Button"], {
        outline: true,
        color: "primary",
        type: "button",
        onClick: this.handleSearch
      }, react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement("span", {
        className: "oi oi-magnifying-glass"
      }), " ", _modules_constants__WEBPACK_IMPORTED_MODULE_14__["globalResource"].Search)));
    }
  }]);

  return Filter;
}(react__WEBPACK_IMPORTED_MODULE_9__["PureComponent"]);

function mapStateToProps(_ref2) {
  var today = _ref2.today,
      statementHistory = _ref2.statementHistory;
  var param = statementHistory.param;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, {
    today: today,
    param: param
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_11__["bindActionCreators"])({
    setParam: _actions__WEBPACK_IMPORTED_MODULE_16__["setParam"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_10__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/modules/constants.js":
/*!********************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/statement-history/modules/constants.js ***!
  \********************************************************************************************/
/*! exports provided: globalResource, selectedAllProduct, maxWidth, minDate, headerText, CalculatedMonth, MONTHLY_TOTAL, MONTHLY_EARNING, PAYMENT_REQUEST, ADJUSTMENT, SUBAFFILIATE, monthlyEarning, transTypeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerText", function() { return headerText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalculatedMonth", function() { return CalculatedMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTHLY_TOTAL", function() { return MONTHLY_TOTAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTHLY_EARNING", function() { return MONTHLY_EARNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAYMENT_REQUEST", function() { return PAYMENT_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADJUSTMENT", function() { return ADJUSTMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUBAFFILIATE", function() { return SUBAFFILIATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monthlyEarning", function() { return monthlyEarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transTypeList", function() { return transTypeList; });
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_globalResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../modules/globalResource */ "./Areas/Portal/www/source/js/modules/globalResource.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "globalResource", function() { return _modules_globalResource__WEBPACK_IMPORTED_MODULE_1__["globalResource"]; });

/* harmony import */ var _modules_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../modules/constants */ "./Areas/Portal/www/source/js/modules/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "selectedAllProduct", function() { return _modules_constants__WEBPACK_IMPORTED_MODULE_2__["selectedAllProduct"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maxWidth", function() { return _modules_constants__WEBPACK_IMPORTED_MODULE_2__["maxWidth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "minDate", function() { return _modules_constants__WEBPACK_IMPORTED_MODULE_2__["minDate"]; });



var _transTypeList;




var headerText = {
  Index: '#',
  Date: 'Date',
  Type: 'Type',
  Amount: 'Amount',
  Status: 'Status',
  Creator: 'Creator',
  Description: 'Description'
};
var CalculatedMonth = 2;
var MONTHLY_TOTAL = 0;
var MONTHLY_EARNING = 201;
var PAYMENT_REQUEST = 202;
var ADJUSTMENT = 203;
var SUBAFFILIATE = 204;
var monthlyEarning = 'Monthly Earning';
var transTypeList = (_transTypeList = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_transTypeList, MONTHLY_TOTAL, 'Transaction'), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_transTypeList, MONTHLY_EARNING, monthlyEarning), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_transTypeList, PAYMENT_REQUEST, 'Payment Request'), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_transTypeList, ADJUSTMENT, 'Adjustment'), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_transTypeList, SUBAFFILIATE, 'Sub-Affiliate'), _transTypeList);

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/statement-history/modules/utils.js":
/*!****************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/statement-history/modules/utils.js ***!
  \****************************************************************************************/
/*! exports provided: getScrollTopPosition, setScrollTop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollTopPosition", function() { return getScrollTopPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScrollTop", function() { return setScrollTop; });
var getBobyContentElement = function getBobyContentElement() {
  return document.getElementsByClassName("body-content")[0];
};

var getScrollTopPosition = function getScrollTopPosition() {
  var bodyContent = getBobyContentElement();
  return !!bodyContent ? bodyContent.scrollTop : 0;
};
var setScrollTop = function setScrollTop(position) {
  var bodyContent = getBobyContentElement();

  if (!!bodyContent) {
    bodyContent.scrollTop = position;
  }
};

/***/ }),

/***/ "./node_modules/moment/moment.js":
/*!*******************************************************************************************************!*\
  !*** delegated ../../../node_modules/moment/moment.js from dll-reference moment_379d6d8a6f9eccf63149 ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference moment_379d6d8a6f9eccf63149 */ "dll-reference moment_379d6d8a6f9eccf63149"))(175);

/***/ })

}]);
//# sourceMappingURL=statementHistory-fe7bc6068837a97d6b22.chunk.js.map