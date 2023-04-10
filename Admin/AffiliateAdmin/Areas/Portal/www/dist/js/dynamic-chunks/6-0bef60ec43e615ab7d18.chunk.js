(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/actions/index.js":
/*!***********************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/actions/index.js ***!
  \***********************************************************************************/
/*! exports provided: setPagingOption, setReportTitle, setParam, setViewLevel, setProductList, setCurrencyList, setCommGroupList, setPaymentCurrencyList, fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReportTitle", function() { return setReportTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParam", function() { return setParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewLevel", function() { return setViewLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setProductList", function() { return setProductList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCurrencyList", function() { return setCurrencyList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCommGroupList", function() { return setCommGroupList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPaymentCurrencyList", function() { return setPaymentCurrencyList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/actions/types.js");
/* harmony import */ var _modules_ajaxRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../modules/ajaxRequest */ "./Areas/Portal/www/source/js/modules/ajaxRequest.js");
/* harmony import */ var _actions_pagingAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../actions/pagingAction */ "./Areas/Portal/www/source/js/actions/pagingAction.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setPagingOption", function() { return _actions_pagingAction__WEBPACK_IMPORTED_MODULE_4__["setPagingOption"]; });







var setReportTitle = function setReportTitle(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["SET_REPORT_TITLE"],
    data: data
  };
};
var setParam = function setParam(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["SET_PARAM"],
    data: data
  };
};
var setViewLevel = function setViewLevel(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["SET_VIEW_LEVEL"],
    data: data
  };
};
var setProductList = function setProductList(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["SET_PRODUCT_LIST"],
    data: data
  };
};
var setCurrencyList = function setCurrencyList(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["SET_CURRENCY_LIST"],
    data: data
  };
};
var setCommGroupList = function setCommGroupList(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["SET_COMM_GROUP_LIST"],
    data: data
  };
};
var setPaymentCurrencyList = function setPaymentCurrencyList(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["SET_PAYMENT_CURRENCY_LIST"],
    data: data
  };
};
var fetchData = function fetchData(param, isMainView) {
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
              url = "Portal/Report/".concat(isMainView ? 'GetMainData' : 'GetDetailData');
              _context.next = 3;
              return Object(_modules_ajaxRequest__WEBPACK_IMPORTED_MODULE_3__["post"])(url, param);

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

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/actions/types.js":
/*!***********************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/actions/types.js ***!
  \***********************************************************************************/
/*! exports provided: SET_PARAM, SET_VIEW_LEVEL, SET_REPORT_TITLE, SET_PRODUCT_LIST, SET_CURRENCY_LIST, SET_COMM_GROUP_LIST, SET_PAYMENT_CURRENCY_LIST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PARAM", function() { return SET_PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_VIEW_LEVEL", function() { return SET_VIEW_LEVEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORT_TITLE", function() { return SET_REPORT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PRODUCT_LIST", function() { return SET_PRODUCT_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENCY_LIST", function() { return SET_CURRENCY_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_COMM_GROUP_LIST", function() { return SET_COMM_GROUP_LIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PAYMENT_CURRENCY_LIST", function() { return SET_PAYMENT_CURRENCY_LIST; });
var SET_PARAM = 'REPORT_SET_PARAM';
var SET_VIEW_LEVEL = 'REPORT_SET_VIEW_LEVEL';
var SET_REPORT_TITLE = 'REPORT_SET_REPORT_TITLE';
var SET_PRODUCT_LIST = 'REPORT_SET_PRODUCT_LIST';
var SET_CURRENCY_LIST = 'REPORT_SET_CURRENCY_LIST';
var SET_COMM_GROUP_LIST = 'REPORT_SET_COMM_GROUP_LIST';
var SET_PAYMENT_CURRENCY_LIST = 'REPORT_SET_PAYMENT_CURRENCY_LIST';

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/components/AppContainer.jsx":
/*!**********************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/components/AppContainer.jsx ***!
  \**********************************************************************************************/
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
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "./node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../layouts/AppLayout */ "./Areas/Portal/www/source/js/layouts/AppLayout.jsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Filter */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/components/Filter.jsx");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Content */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/components/Content.jsx");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../components/Loader */ "./Areas/Portal/www/source/js/components/Loader.jsx");












var AppContainer =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(AppContainer, _Component);

  function AppContainer(props) {
    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, AppContainer);

    return _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(AppContainer).call(this, props));
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(AppContainer, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_8__["default"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_Loader__WEBPACK_IMPORTED_MODULE_11__["default"], {
        show: this.props.isShowLoader
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_9__["default"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_10__["default"], null));
    }
  }]);

  return AppContainer;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

function mapStateToProps(_ref) {
  var isShowLoader = _ref.isShowLoader;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, {
    isShowLoader: isShowLoader
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps)(AppContainer));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/components/Content.jsx":
/*!*****************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/components/Content.jsx ***!
  \*****************************************************************************************/
/*! exports provided: Content, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return Content; });
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs3/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "./node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _GridData__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./GridData */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/components/GridData.jsx");
/* harmony import */ var _components_ReportTitle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/ReportTitle */ "./Areas/Portal/www/source/js/components/ReportTitle.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/actions/index.js");
/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../actions/loaderAction */ "./Areas/Portal/www/source/js/actions/loaderAction.js");
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../libs/constants */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/constants.js");
/* harmony import */ var _libs_reportExcel__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../libs/reportExcel */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/reportExcel.js");



















var Content =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(Content, _Component);

  function Content(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, Content);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Content).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "handleClickBreadcrumb", function () {
      _this.gridDataRef.current._resetScroll();

      _this.props.setViewLevel(_libs_constants__WEBPACK_IMPORTED_MODULE_17__["viewLevel"].main);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "handleExportExcel",
    /*#__PURE__*/
    _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var _this$props, param, reportTitle, currentViewLevel, isMainView, newParam, data, reportExcel;

      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.props.toggleLoader(true);

              _this$props = _this.props, param = _this$props.param, reportTitle = _this$props.reportTitle, currentViewLevel = _this$props.currentViewLevel;
              isMainView = currentViewLevel === _libs_constants__WEBPACK_IMPORTED_MODULE_17__["viewLevel"].main;
              newParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, param, {
                IsExportExcel: true
              });
              _context.next = 6;
              return _this.props.fetchData(newParam, isMainView);

            case 6:
              data = _context.sent;

              if (data) {
                reportExcel = new _libs_reportExcel__WEBPACK_IMPORTED_MODULE_18__["default"](data, reportTitle, isMainView);
                reportExcel.export();
              }

              _this.props.toggleLoader(false);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _this.gridDataRef = Object(react__WEBPACK_IMPORTED_MODULE_10__["createRef"])();
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(Content, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var reportTitle = this.props.reportTitle;
      return nextProps.reportTitle !== reportTitle;
    }
  }, {
    key: "_buildReportTitle",
    value: function _buildReportTitle() {
      var _this$props2 = this.props,
          currentViewLevel = _this$props2.currentViewLevel,
          reportTitle = _this$props2.reportTitle;
      var isMainView = currentViewLevel === _libs_constants__WEBPACK_IMPORTED_MODULE_17__["viewLevel"].main;
      return isMainView ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "d-flex align-items-center"
      }, reportTitle, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("button", {
        type: "button",
        className: "ml-auto btn btn-link btn-excel",
        onClick: this.handleExportExcel,
        title: "Export Excel"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        className: "oi icon-excel"
      }))) : react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "d-flex align-items-center"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("a", {
        href: "javascript:;",
        className: "btn-link font-weight-bold",
        onClick: this.handleClickBreadcrumb
      }, "AFFILIATE REPORT"), "\xA0> ", reportTitle, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("button", {
        type: "button",
        className: "ml-auto btn btn-link btn-excel",
        onClick: this.handleExportExcel,
        title: "Export Excel"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("span", {
        className: "oi icon-excel"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          reportTitle = _this$props3.reportTitle,
          isN8B = _this$props3.isN8B;
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "data-content my-2 report-content-container"
      }, reportTitle && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_10___default.a.Fragment, null, isN8B && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("p", {
        className: "affiliate-report-note"
      }, "Notes: First Comm Rate and Earning will calculate at 5th July 2020"), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_ReportTitle__WEBPACK_IMPORTED_MODULE_14__["default"], {
        content: this._buildReportTitle()
      })), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_GridData__WEBPACK_IMPORTED_MODULE_13__["default"], {
        ref: this.gridDataRef
      }));
    }
  }]);

  return Content;
}(react__WEBPACK_IMPORTED_MODULE_10__["Component"]);

function mapStateToProps(_ref2) {
  var reportTitle = _ref2.reportTitle,
      currentViewLevel = _ref2.currentViewLevel,
      param = _ref2.param,
      isN8B = _ref2.isN8B;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, {
    reportTitle: reportTitle,
    currentViewLevel: currentViewLevel,
    param: param,
    isN8B: isN8B
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_12__["bindActionCreators"])({
    setViewLevel: _actions__WEBPACK_IMPORTED_MODULE_15__["setViewLevel"],
    toggleLoader: _actions_loaderAction__WEBPACK_IMPORTED_MODULE_16__["toggleLoader"],
    fetchData: _actions__WEBPACK_IMPORTED_MODULE_15__["fetchData"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_11__["connect"])(mapStateToProps, mapDispatchToProps)(Content));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/components/Filter.jsx":
/*!****************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/components/Filter.jsx ***!
  \****************************************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/keys */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/every */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/every.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_5__);
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
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _components_multiple_select__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../components/multiple-select */ "./Areas/Portal/www/source/js/components/multiple-select/index.jsx");
/* harmony import */ var _9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @9softstudio/react-monthpicker */ "./node_modules/@9softstudio/react-monthpicker/dist/index.js");
/* harmony import */ var _9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../libs/constants */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/constants.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/actions/index.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../modules/utils */ "./Areas/Portal/www/source/js/modules/utils.js");
/* harmony import */ var _modules_globalResource__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../modules/globalResource */ "./Areas/Portal/www/source/js/modules/globalResource.js");























var Filter =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_11___default()(Filter, _Component);

  function Filter(props) {
    var _context4, _context5, _context6;

    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, Filter);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(Filter).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handlePressEnter", function (event) {
      if (event.charCode === 13) {
        event.preventDefault();

        _this.handleClickSearch();
      }
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleSelectFromMonth", function (month, year) {
      var fromMonth = {
        month: month,
        year: year
      };

      if (!_this._isMainView()) {
        _this.setState({
          fromMonth: fromMonth
        });

        return;
      }

      var toMonthRange = _this._getToMonthRange(fromMonth);

      var min = toMonthRange.min,
          max = toMonthRange.max;
      var toMonth = _this.state.toMonth;
      var isInRange = min.month <= toMonth.month && min.year <= toMonth.year && max.month >= toMonth.month && max.year >= toMonth.year;
      var newState = isInRange ? {
        fromMonth: {
          month: month,
          year: year
        }
      } : {
        fromMonth: {
          month: month,
          year: year
        },
        toMonth: {
          month: month,
          year: year
        }
      };

      _this.setState(newState);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleSelectToMonth", function (month, year) {
      _this.setState({
        toMonth: {
          month: month,
          year: year
        }
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChangeCurrency", function (item, selectedCurrencyList) {
      _this.setState({
        selectedCurrencyList: selectedCurrencyList
      });

      _this.props.setCurrencyList(Object(_modules_utils__WEBPACK_IMPORTED_MODULE_21__["handleChangeMultipleSelected"])(_this.props.currencyList, selectedCurrencyList));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChangePaymentCurrency", function (item, selectedPaymentCurrencyList) {
      _this.setState({
        selectedPaymentCurrencyList: selectedPaymentCurrencyList
      });

      _this.props.setPaymentCurrencyList(Object(_modules_utils__WEBPACK_IMPORTED_MODULE_21__["handleChangeMultipleSelected"])(_this.props.paymentCurrencyList, selectedPaymentCurrencyList));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChangeCommGroup", function (item, selectedCommGroupList) {
      _this.setState({
        selectedCommGroupList: selectedCommGroupList
      });

      _this.props.setCommGroupList(Object(_modules_utils__WEBPACK_IMPORTED_MODULE_21__["handleChangeMultipleSelected"])(_this.props.commGroupList, selectedCommGroupList));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChangeProduct", function (item, selectedProductList) {
      _this.setState({
        selectedProductList: selectedProductList
      });

      _this.props.setProductList(Object(_modules_utils__WEBPACK_IMPORTED_MODULE_21__["handleChangeMultipleSelected"])(_this.props.productList, selectedProductList));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChangeSortAscending", function () {
      _this.setState(function (prevState) {
        return {
          isSortAscending: !prevState.isSortAscending
        };
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      _this.setState(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()({}, name, value));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChangeGetAll", function () {
      _this.setState(function (prevState) {
        return {
          isGetAll: !prevState.isGetAll
        };
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleClickSearch", function () {
      var _context, _context2, _context3;

      var selectedProductList = _this.state.selectedProductList;

      if (selectedProductList === '') {
        return;
      }

      _this._updateReportTitle();

      var _this$state = _this.state,
          selectedLanguage = _this$state.selectedLanguage,
          selectedCommGroupList = _this$state.selectedCommGroupList,
          selectedBaseCurrency = _this$state.selectedBaseCurrency,
          selectedCurrencyList = _this$state.selectedCurrencyList,
          selectedPaymentCurrencyList = _this$state.selectedPaymentCurrencyList,
          fromMonth = _this$state.fromMonth,
          toMonth = _this$state.toMonth,
          sortBy = _this$state.sortBy,
          isSortAscending = _this$state.isSortAscending,
          userName = _this$state.userName,
          isGetAll = _this$state.isGetAll;
      var pagingOption = _this.props.pagingOption;

      var isSelectAllCommGroup = _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_5___default()(_context = _this.props.commGroupList).call(_context, function (c) {
        return c.checked;
      });

      var param = {
        UserName: userName,
        FromDate: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context2 = "".concat(fromMonth.month, "/1/")).call(_context2, fromMonth.year),
        ToDate: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context3 = "".concat(toMonth.month, "/1/")).call(_context3, toMonth.year),
        PreferredLanguage: selectedLanguage,
        BaseCurrencyId: Number(selectedBaseCurrency),
        GroupIds: isSelectAllCommGroup ? 'all' : selectedCommGroupList,
        CurrencyIds: selectedCurrencyList,
        PaymentCurrencyIds: selectedPaymentCurrencyList,
        ProductIds: selectedProductList,
        SortType: Number(sortBy),
        SortDirectionType: isSortAscending ? _libs_constants__WEBPACK_IMPORTED_MODULE_19__["sortDirectionType"].ascending : _libs_constants__WEBPACK_IMPORTED_MODULE_19__["sortDirectionType"].descending,
        PageIndex: 1,
        PageSize: pagingOption.PageSize,
        IsGetAll: isGetAll
      };

      if (_this._isMainView()) {
        _this.cachedMainReportParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, param);
      }

      _this.props.setParam(param);
    });

    var _this$props = _this.props,
        today = _this$props.today,
        productList = _this$props.productList,
        baseCurrencyList = _this$props.baseCurrencyList,
        currencyList = _this$props.currencyList,
        paymentCurrencyList = _this$props.paymentCurrencyList;
    _this.now = new Date(today);
    var defaultMonth = {
      month: _this.now.getMonth() + 1,
      year: _this.now.getFullYear()
    };
    _this.state = {
      userName: '',
      selectedLanguage: '',
      fromMonth: defaultMonth,
      toMonth: defaultMonth,
      sortBy: _libs_constants__WEBPACK_IMPORTED_MODULE_19__["defaultSortBy"],
      isSortAscending: true,
      selectedProductList: _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context4 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(productList).call(productList, function (item) {
        return item.checked;
      })).call(_context4, function (item) {
        return item.key;
      }).join(',') || '',
      selectedCommGroupList: 'all',
      isGetAll: false,
      selectedBaseCurrency: baseCurrencyList.length && baseCurrencyList[0].ExchangeId || _libs_constants__WEBPACK_IMPORTED_MODULE_19__["defaultBaseCurrency"],
      selectedCurrencyList: _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context5 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(currencyList).call(currencyList, function (item) {
        return item.checked;
      })).call(_context5, function (item) {
        return item.key;
      }).join(',') || '',
      selectedPaymentCurrencyList: _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context6 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(paymentCurrencyList).call(paymentCurrencyList, function (item) {
        return item.checked;
      })).call(_context6, function (item) {
        return item.key;
      }).join(',') || ''
    };
    _this.cachedMainReportParam = null;
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(Filter, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var _this$props2 = this.props,
          param = _this$props2.param,
          currentViewLevel = _this$props2.currentViewLevel,
          pagingOption = _this$props2.pagingOption;

      if (currentViewLevel !== prevProps.currentViewLevel) {
        var callback = function callback() {
          _this2._updateReportTitle();
        };

        if (this._isMainView()) {
          var _this$cachedMainRepor = this.cachedMainReportParam,
              UserName = _this$cachedMainRepor.UserName,
              GroupIds = _this$cachedMainRepor.GroupIds,
              PreferredLanguage = _this$cachedMainRepor.PreferredLanguage,
              FromDate = _this$cachedMainRepor.FromDate,
              ToDate = _this$cachedMainRepor.ToDate,
              SortType = _this$cachedMainRepor.SortType,
              SortDirectionType = _this$cachedMainRepor.SortDirectionType,
              ProductIds = _this$cachedMainRepor.ProductIds,
              CurrencyIds = _this$cachedMainRepor.CurrencyIds,
              PaymentCurrencyIds = _this$cachedMainRepor.PaymentCurrencyIds,
              BaseCurrencyId = _this$cachedMainRepor.BaseCurrencyId;
          var from = new Date(FromDate);
          var to = new Date(ToDate);
          this.setState({
            userName: UserName,
            selectedLanguage: PreferredLanguage,
            selectedCommGroupList: GroupIds,
            fromMonth: {
              month: from.getMonth() + 1,
              year: from.getFullYear()
            },
            toMonth: {
              month: to.getMonth() + 1,
              year: to.getFullYear()
            },
            sortBy: SortType,
            isSortAscending: SortDirectionType === _libs_constants__WEBPACK_IMPORTED_MODULE_19__["sortDirectionType"].ascending,
            selectedProductList: ProductIds,
            selectedBaseCurrency: BaseCurrencyId,
            selectedCurrencyList: CurrencyIds,
            selectedPaymentCurrencyList: PaymentCurrencyIds,
            isGetAll: false
          }, callback);
          this.props.setParam(this.cachedMainReportParam);
        } else {
          this.cachedMainReportParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, this.cachedMainReportParam, {
            PageIndex: pagingOption.PageIndex,
            PageSize: pagingOption.PageSize
          });
          this.setState({
            userName: param.UserName,
            sortBy: _libs_constants__WEBPACK_IMPORTED_MODULE_19__["sortByMonthOnMonthView"].Month,
            isSortAscending: false
          }, callback);
        }
      }
    }
  }, {
    key: "_isMainView",
    value: function _isMainView() {
      return this.props.currentViewLevel === _libs_constants__WEBPACK_IMPORTED_MODULE_19__["viewLevel"].main;
    }
  }, {
    key: "_updateReportTitle",
    value: function _updateReportTitle() {
      var productList = this.props.productList;

      var isCheckedAllProduct = _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_5___default()(productList).call(productList, function (p) {
        return p.checked;
      });

      var reportTitle = this._isMainView() ? this._buildMainReportTitle(isCheckedAllProduct) : this._buildMonthOnMonthReportTile(isCheckedAllProduct);
      this.props.setReportTitle(reportTitle);
    }
  }, {
    key: "_buildMainReportTitle",
    value: function _buildMainReportTitle(isCheckedAllProduct) {
      var _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14, _context15, _context16, _context17, _context18, _context19, _context20;

      var _this$props3 = this.props,
          productList = _this$props3.productList,
          languageList = _this$props3.languageList,
          baseCurrencyList = _this$props3.baseCurrencyList,
          commGroupList = _this$props3.commGroupList,
          paymentCurrencyList = _this$props3.paymentCurrencyList;
      var _this$state2 = this.state,
          selectedLanguage = _this$state2.selectedLanguage,
          fromMonth = _this$state2.fromMonth,
          toMonth = _this$state2.toMonth,
          userName = _this$state2.userName,
          selectedBaseCurrency = _this$state2.selectedBaseCurrency;
      var userNameTitle = "".concat(userName && ' - Affiliate contains \'' + userName + '\'');
      var language = languageList[selectedLanguage] || 'All languages';
      var commGroup = _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_5___default()(commGroupList).call(commGroupList, function (c) {
        return c.checked;
      }) ? 'All Revenue Group' : _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context7 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(commGroupList).call(commGroupList, function (c) {
        return c.checked;
      })).call(_context7, function (c) {
        return c.name;
      }).join(',');
      var paymentCurrency = _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_5___default()(paymentCurrencyList).call(paymentCurrencyList, function (c) {
        return c.checked;
      }) ? 'All Linked Acc. Currencies' : _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context8 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(paymentCurrencyList).call(paymentCurrencyList, function (c) {
        return c.checked;
      })).call(_context8, function (c) {
        return c.name;
      }).join(',');
      var productName = isCheckedAllProduct ? 'All Products' : _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context9 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(productList).call(productList, function (p) {
        return p.checked;
      })).call(_context9, function (p) {
        return p.name;
      }).join(',');

      var fromToTitle = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context10 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context11 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context12 = "FROM ".concat(Object(_modules_utils__WEBPACK_IMPORTED_MODULE_21__["formatUnit"])(fromMonth.month), "/")).call(_context12, fromMonth.year, " TO ")).call(_context11, Object(_modules_utils__WEBPACK_IMPORTED_MODULE_21__["formatUnit"])(toMonth.month), "/")).call(_context10, toMonth.year);

      var baseCurrency = _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context13 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(baseCurrencyList).call(baseCurrencyList, function (x) {
        return x.ExchangeId == selectedBaseCurrency;
      })).call(_context13, function (b) {
        return b.Code;
      }).join(',');

      return _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context14 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context15 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context16 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context17 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context18 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context19 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context20 = "".concat(_libs_constants__WEBPACK_IMPORTED_MODULE_19__["resource"].reportName)).call(_context20, userNameTitle, " - Base Currency ")).call(_context19, baseCurrency, " - ")).call(_context18, paymentCurrency, " - ")).call(_context17, language, " - ")).call(_context16, productName, " - ")).call(_context15, commGroup, " - ")).call(_context14, fromToTitle);
    }
  }, {
    key: "_buildMonthOnMonthReportTile",
    value: function _buildMonthOnMonthReportTile(isCheckedAllProduct) {
      var _context21, _context22, _context23, _context24, _context25, _context26, _context27, _context28, _context29, _context30;

      var productList = this.props.productList;
      var _this$state3 = this.state,
          fromMonth = _this$state3.fromMonth,
          toMonth = _this$state3.toMonth,
          userName = _this$state3.userName,
          isGetAll = _this$state3.isGetAll,
          selectedBaseCurrency = _this$state3.selectedBaseCurrency;
      var userNameTitle = userName && _libs_constants__WEBPACK_IMPORTED_MODULE_19__["resource"].space + userName;
      var productName = isCheckedAllProduct ? 'All Products' : _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context21 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(productList).call(productList, function (p) {
        return p.checked;
      })).call(_context21, function (p) {
        return p.name;
      }).join(',');
      var fromToTitle = isGetAll ? 'Get All Dates' : _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context22 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context23 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context24 = "FROM ".concat(Object(_modules_utils__WEBPACK_IMPORTED_MODULE_21__["formatUnit"])(fromMonth.month), "/")).call(_context24, fromMonth.year, " TO ")).call(_context23, Object(_modules_utils__WEBPACK_IMPORTED_MODULE_21__["formatUnit"])(toMonth.month), "/")).call(_context22, toMonth.year);

      var baseCurrency = _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context25 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(_context26 = this.props.baseCurrencyList).call(_context26, function (x) {
        return x.ExchangeId == selectedBaseCurrency;
      })).call(_context25, function (b) {
        return b.Code;
      }).join(',');

      return _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context27 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context28 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context29 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context30 = "".concat(_libs_constants__WEBPACK_IMPORTED_MODULE_19__["resource"].reportDetailName)).call(_context30, userNameTitle, " - Base Currency ")).call(_context29, baseCurrency, " - ")).call(_context28, productName, " - ")).call(_context27, fromToTitle);
    }
  }, {
    key: "_getToMonthRange",
    value: function _getToMonthRange(from) {
      if (!this._isMainView()) {
        return {
          min: _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, from),
          max: {
            month: this.now.getMonth() + 1,
            year: this.now.getFullYear()
          }
        };
      }

      var min = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, from);

      var maxToMonth = from.month + 5;
      var maxToYear = maxToMonth > 12 ? from.year + 1 : from.year;
      var actualMaxMonth = maxToMonth % 12;
      var nowMonth = this.now.getMonth() + 1;
      var nowYear = this.now.getFullYear();

      if (maxToYear > nowYear) {
        actualMaxMonth = nowMonth;
        maxToYear = nowYear;
      }

      if (maxToMonth > nowMonth && maxToYear === nowYear) {
        actualMaxMonth = min.year < nowYear ? actualMaxMonth : nowMonth;
        maxToYear = nowYear;
      }

      return {
        min: min,
        max: {
          month: actualMaxMonth || 12,
          year: maxToYear
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _context31, _context32;

      var _this$state4 = this.state,
          selectedLanguage = _this$state4.selectedLanguage,
          selectedBaseCurrency = _this$state4.selectedBaseCurrency,
          fromMonth = _this$state4.fromMonth,
          toMonth = _this$state4.toMonth,
          sortBy = _this$state4.sortBy,
          isSortAscending = _this$state4.isSortAscending,
          selectedProductList = _this$state4.selectedProductList,
          userName = _this$state4.userName,
          isGetAll = _this$state4.isGetAll;
      var _this$props4 = this.props,
          productList = _this$props4.productList,
          languageList = _this$props4.languageList,
          currencyList = _this$props4.currencyList,
          baseCurrencyList = _this$props4.baseCurrencyList,
          paymentCurrencyList = _this$props4.paymentCurrencyList,
          isProduction = _this$props4.isProduction,
          commGroupList = _this$props4.commGroupList;
      var isValidSelectedProduct = !!selectedProductList;

      var toMonthRange = this._getToMonthRange(fromMonth);

      var isMainView = this._isMainView();

      var sortByData = isMainView ? _libs_constants__WEBPACK_IMPORTED_MODULE_19__["sortByMainView"] : _libs_constants__WEBPACK_IMPORTED_MODULE_19__["sortByMonthOnMonthView"];
      return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("div", {
        className: "filter-container"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Form"], {
        inline: true,
        tag: "div"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        for: "Affiliate",
        className: "mr-sm-2"
      }, "Affiliate"), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Input"], {
        type: "text",
        name: "userName",
        id: "Affiliate",
        maxLength: "30",
        onKeyPress: this.handlePressEnter,
        onChange: this.handleChange,
        value: userName
      })), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        className: "mr-sm-2"
      }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_22__["globalResource"].BaseCurrency), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Input"], {
        type: "select",
        name: "selectedBaseCurrency",
        id: "BaseCurrency",
        value: selectedBaseCurrency,
        onChange: this.handleChange
      }, _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(baseCurrencyList).call(baseCurrencyList, function (c) {
        return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("option", {
          key: c.ExchangeId,
          value: c.ExchangeId
        }, c.Code);
      }), !isProduction && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("option", {
        value: "20"
      }, "UUS"))), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2 multiple-currency-filter"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        className: "mr-sm-2"
      }, "Linked Acc. Currency"), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_components_multiple_select__WEBPACK_IMPORTED_MODULE_17__["default"], {
        dataSource: paymentCurrencyList,
        keyField: "key",
        valueField: "name",
        statusField: "checked",
        maxDisplayItemCount: 1,
        noneSelectedLabel: "None Select",
        selectedAllLabel: "All",
        onChange: this.handleChangePaymentCurrency
      })), !isProduction && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2 multiple-currency-filter"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        className: "mr-sm-2"
      }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_22__["globalResource"].Currency), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_components_multiple_select__WEBPACK_IMPORTED_MODULE_17__["default"], {
        dataSource: currencyList,
        keyField: "key",
        valueField: "name",
        statusField: "checked",
        maxDisplayItemCount: 1,
        noneSelectedLabel: "None Select",
        selectedAllLabel: "All",
        onChange: this.handleChangeCurrency
      })), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Input"], {
        type: "select",
        name: "selectedLanguage",
        value: selectedLanguage,
        onChange: this.handleChange
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("option", {
        key: "lang-all",
        value: ""
      }, "All Language"), _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context31 = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(languageList)).call(_context31, function (lang) {
        return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("option", {
          key: 'lang-' + lang,
          value: lang
        }, languageList[lang]);
      }))), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2" + "".concat(isValidSelectedProduct ? '' : ' multiple-select-wrapper is-invalid'),
        style: {
          width: 200
        }
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_components_multiple_select__WEBPACK_IMPORTED_MODULE_17__["default"], {
        dataSource: productList,
        keyField: "key",
        valueField: "name",
        statusField: "checked",
        maxDisplayItemCount: 1,
        hasInputOption: true,
        noneSelectedLabel: "Please Select",
        selectedAllLabel: "All Products",
        onChange: this.handleChangeProduct
      }), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("div", {
        className: "mx-1 rounded-circle note-info",
        title: "Filtering product affects only to Turnover and GGR columns. Others always show value for all products"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("span", {
        className: "oi oi-info"
      }))), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2 comm-group"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_components_multiple_select__WEBPACK_IMPORTED_MODULE_17__["default"], {
        dataSource: commGroupList,
        keyField: "key",
        valueField: "name",
        statusField: "checked",
        maxDisplayItemCount: 1,
        noneSelectedLabel: "None Select",
        selectedAllLabel: "All Revenue Groups",
        onChange: this.handleChangeCommGroup
      })), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        className: "mr-sm-2"
      }, "From"), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_18___default.a, {
        minMonth: _libs_constants__WEBPACK_IMPORTED_MODULE_19__["minMonthDate"].month,
        minYear: _libs_constants__WEBPACK_IMPORTED_MODULE_19__["minMonthDate"].year,
        selectedDropdownYear: fromMonth.year,
        selectedMonth: fromMonth.month,
        onSelect: this.handleSelectFromMonth,
        iconElement: react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("span", {
          className: "oi oi-calendar icon-calendar ml-1"
        }),
        enable: !isGetAll
      })), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        className: "mr-sm-2"
      }, "To"), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_18___default.a, {
        minMonth: toMonthRange.min.month,
        minYear: toMonthRange.min.year,
        maxMonth: toMonthRange.max.month,
        maxYear: toMonthRange.max.year,
        selectedDropdownYear: toMonth.year,
        selectedYear: toMonth.year,
        selectedMonth: toMonth.month,
        onSelect: this.handleSelectToMonth,
        iconElement: react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("span", {
          className: "oi oi-calendar icon-calendar ml-1"
        }),
        enable: !isGetAll
      })), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        check: true
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        check: true
      }, "Get All", react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Input"], {
        className: "ml-1 mr-2",
        type: "checkbox",
        checked: isGetAll,
        onChange: this.handleChangeGetAll
      }))), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        for: "SortBy",
        className: "mr-sm-2"
      }, "Sort By"), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Input"], {
        type: "select",
        name: "sortBy",
        id: "SortBy",
        value: sortBy,
        onChange: this.handleChange
      }, _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context32 = _babel_runtime_corejs3_core_js_stable_object_keys__WEBPACK_IMPORTED_MODULE_0___default()(sortByData)).call(_context32, function (k) {
        return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("option", {
          key: 'sortBy-' + k,
          value: sortByData[k]
        }, k);
      }))), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        check: true
      }, "A-Z", react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Input"], {
        className: "ml-1",
        type: "checkbox",
        checked: isSortAscending,
        onChange: this.handleChangeSortAscending
      }))), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Button"], {
        outline: true,
        color: "primary",
        type: "button",
        onClick: this.handleClickSearch,
        disabled: !isValidSelectedProduct
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("span", {
        className: "oi oi-magnifying-glass"
      }), " Search")));
    }
  }]);

  return Filter;
}(react__WEBPACK_IMPORTED_MODULE_13__["Component"]);

function mapStateToProps(state) {
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_3___default()({}, {
    productList: state.productList,
    pagingOption: state.pagingOption,
    languageList: state.languageList,
    currencyList: state.currencyList,
    baseCurrencyList: state.baseCurrencyList,
    paymentCurrencyList: state.paymentCurrencyList,
    isProduction: state.isProduction,
    today: state.today,
    currentViewLevel: state.currentViewLevel,
    param: state.param,
    commGroupList: state.commGroupList
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_15__["bindActionCreators"])({
    setReportTitle: _actions__WEBPACK_IMPORTED_MODULE_20__["setReportTitle"],
    setParam: _actions__WEBPACK_IMPORTED_MODULE_20__["setParam"],
    setCurrencyList: _actions__WEBPACK_IMPORTED_MODULE_20__["setCurrencyList"],
    setCommGroupList: _actions__WEBPACK_IMPORTED_MODULE_20__["setCommGroupList"],
    setProductList: _actions__WEBPACK_IMPORTED_MODULE_20__["setProductList"],
    setPaymentCurrencyList: _actions__WEBPACK_IMPORTED_MODULE_20__["setPaymentCurrencyList"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_14__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/components/GridData.jsx":
/*!******************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/components/GridData.jsx ***!
  \******************************************************************************************/
/*! exports provided: GridData, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridData", function() { return GridData; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/every */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/every.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/json/stringify */ "./node_modules/@babel/runtime-corejs3/core-js-stable/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5__);
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
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @9softstudio/react-fixed-table-header */ "./node_modules/@9softstudio/react-fixed-table-header/dist/index.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../modules/numberFormat */ "./Areas/Portal/www/source/js/modules/numberFormat.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/actions/index.js");
/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../actions/loaderAction */ "./Areas/Portal/www/source/js/actions/loaderAction.js");
/* harmony import */ var _modules_globalResource__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../modules/globalResource */ "./Areas/Portal/www/source/js/modules/globalResource.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../modules/utils */ "./Areas/Portal/www/source/js/modules/utils.js");
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../libs/constants */ "./Areas/Portal/www/source/js/pages/report/libs/constants.js");
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../libs/constants */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/constants.js");

























var GridData =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_11___default()(GridData, _PureComponent);

  function GridData(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, GridData);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(GridData).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleViewMonthOnMonth", function (userName) {
      var _this$props = _this.props,
          param = _this$props.param,
          pagingOption = _this$props.pagingOption;

      var postParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5___default()({}, param, {
        UserName: userName,
        SortType: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["sortByMonthOnMonthView"].Month,
        SortDirectionType: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["sortDirectionType"].descending,
        PageIndex: 1,
        PageSize: pagingOption.PageSize
      });

      _this.props.setViewLevel(_libs_constants__WEBPACK_IMPORTED_MODULE_24__["viewLevel"].monthOnMonth);

      _this.props.setParam(postParam);

      _this._resetScroll();
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleViewPlayerGgrReport", function (userName) {
      var _context;

      var param = _this.props.param;
      var paramFromAffReport = {
        affName: userName,
        baseCurrencyId: param.BaseCurrencyId,
        fromDate: param.FromDate,
        toDate: param.ToDate,
        productIds: param.ProductIds
      };
      var path = Object(_modules_utils__WEBPACK_IMPORTED_MODULE_22__["resolveClientUrl"])('Portal/PlayerGgrReport');
      document.cookie = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context = "paramFromAffReport=".concat(_babel_runtime_corejs3_core_js_stable_json_stringify__WEBPACK_IMPORTED_MODULE_3___default()(paramFromAffReport), "; path=")).call(_context, path);
      window.open(path, '_blank');
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handlePaging", function (index, size) {
      var newPaging = {
        PageIndex: index,
        PageSize: size
      };

      var newParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5___default()({}, _this.props.param, newPaging);

      _this.fetchData(newParam);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "_resetScroll", function () {
      if (!!_this.tableRef.current) {
        _this.tableRef.current.scrollTop = 0;
        _this.tableRef.current.scrollLeft = 0;
      }
    });

    _this.cachedMainReport = null;
    _this.totalItemMainReport = 0;
    _this.count = 0;
    _this.state = {
      gridData: null,
      total: null
    };
    _this.tableRef = Object(react__WEBPACK_IMPORTED_MODULE_13__["createRef"])();
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(GridData, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var param = this.props.param;

      var isMainView = this._isMainView();

      if (param !== prevProps.param && isMainView) {
        if (this.cachedMainReport && this.cachedMainReport.gridData) {
          var _this$cachedMainRepor = this.cachedMainReport,
              gridData = _this$cachedMainRepor.gridData,
              total = _this$cachedMainRepor.total,
              totalItem = _this$cachedMainRepor.totalItem;
          this.setState({
            gridData: gridData,
            total: total
          }, function () {
            _this2.cachedMainReport = null;
          });
          this.props.setPagingOption({
            TotalItem: totalItem,
            PageIndex: param.PageIndex,
            PageSize: param.PageSize
          });
        } else {
          this.fetchData(param);
        }
      } else if (param !== prevProps.param) {
        if (this.cachedMainReport === null) {
          this.cachedMainReport = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5___default()(this.state, {
            totalItem: prevProps.pagingOption.TotalItem
          });
        }

        this.fetchData(param);
      }
    }
  }, {
    key: "_isMainView",
    value: function _isMainView() {
      return this.props.currentViewLevel === _libs_constants__WEBPACK_IMPORTED_MODULE_24__["viewLevel"].main;
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(param) {
        var isMainView, data, MainData, Total, TotalItem;
        return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._resetScroll();

                this.props.toggleLoader(true);
                isMainView = this._isMainView();
                _context2.next = 5;
                return this.props.fetchData(param, isMainView);

              case 5:
                data = _context2.sent;

                if (data) {
                  MainData = data.MainData, Total = data.Total, TotalItem = data.TotalItem;
                  this.setState({
                    gridData: MainData,
                    total: Total
                  });
                  this.props.setPagingOption({
                    TotalItem: TotalItem,
                    PageIndex: param.PageIndex,
                    PageSize: param.PageSize
                  });

                  if (isMainView) {
                    this.cachedMainReport = null;
                  }
                }

                this.props.toggleLoader(false);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchData(_x) {
        return _fetchData.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "_renderHeader",
    value: function _renderHeader() {
      var isMainView = this._isMainView();

      var firstColName = isMainView ? _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].UserName : _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].MonthDateString;
      return [react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("tr", {
        className: "freeze-row freeze-row-h1",
        key: "thead-1"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        className: "freeze-column-header",
        width: 110,
        rowSpan: "2",
        title: firstColName
      }, firstColName), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 70,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].PaymentCurrency
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].PaymentCurrency), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 60,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].TotalClick
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].TotalClick), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 55,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].UniqueClick
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].UniqueClick), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 55,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Signup
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Signup), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 55,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Fdm
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Fdm), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 55,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].ActiveMember
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].ActiveMember), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 65,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].NoOfSubAff
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].NoOfSubAff), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        colSpan: "10",
        height: 28,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].MemberStatistics
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].MemberStatistics), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        colSpan: isMainView ? 8 : 7,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].AffiliateStatistics
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].AffiliateStatistics), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 55,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].MonthOnMonth
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].MonthOnMonth), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 55,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].PlayerGgr
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].PlayerGgr)), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("tr", {
        className: "freeze-row freeze-row-h2",
        key: "thead-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Deposit
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Deposit), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Withdrawal
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Withdrawal), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Turnover
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Turnover), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Ggr
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Ggr), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 70,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Bonus
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Bonus), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 70,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Rebate
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Rebate), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 70,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].PlatformFee
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].PlatformFee), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 70,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].DepositFee
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].DepositFee), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 70,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].WithdrawalFee
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].WithdrawalFee), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 70,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].TotalFee
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].TotalFee), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 65,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].CommissionRate
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].CommissionRate), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Earning
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].Earning), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].P2pEarning
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].P2pEarning), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].SubAffEarning
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].SubAffEarning), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].TotalEarning
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].TotalEarning), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].AffWithdrawal
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].AffWithdrawal), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 75,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].AffAdjustment
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].AffAdjustment), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("th", {
        width: 80,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].BalanceBf
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_24__["headerText"].BalanceBf))];
    }
  }, {
    key: "_renderDataSection",
    value: function _renderDataSection(dataList) {
      var dataRows = [];

      if (dataList.length) {
        var productList = this.props.productList;

        var isSelectedAllProducts = _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_0___default()(productList).call(productList, function (p) {
          return p.checked;
        });

        var productColumnClassName = isSelectedAllProducts ? 'text-right' : 'text-right highlight';

        for (var i = 0; i < dataList.length; i++) {
          var dataItem = dataList[i];
          dataRows.push(this._buildDataRow(dataItem, productColumnClassName, i));
        }
      } else {
        dataRows.push(react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("tr", {
          key: "no-info"
        }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
          className: "text-center",
          colSpan: 24 + (this._isMainView() ? 3 : 0)
        }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_21__["globalResource"].NoInfo)));
      }

      return dataRows;
    }
  }, {
    key: "_buildDataRow",
    value: function _buildDataRow(dataItem, productColumnClassName, index) {
      var isMainView = this._isMainView();

      var isTotalRow = isMainView ? dataItem.AffId === 0 && dataItem.UserName === null : dataItem.MonthDateString === "";
      var firstColValue = isTotalRow ? _libs_constants__WEBPACK_IMPORTED_MODULE_24__["totalText"] : isMainView ? dataItem.UserName : this._buildMonthCell(dataItem.MonthDateString, dataItem.Description);
      return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("tr", {
        key: "dataRow-".concat(index)
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "freeze-column",
        title: firstColValue
      }, firstColValue), this._buildCommonCell(dataItem, productColumnClassName, isTotalRow, isMainView));
    }
  }, {
    key: "_buildMonthCell",
    value: function _buildMonthCell(monthDate, description) {
      var _context3;

      return description ? _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_4___default()(_context3 = "".concat(monthDate, " (")).call(_context3, description, ")") : monthDate;
    }
  }, {
    key: "_buildCommonCell",
    value: function _buildCommonCell(dataItem, productColumnClassName, isTotalRow, isMainView) {
      var _this3 = this;

      var totalClick = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["format"])(dataItem.TotalClick);
      var uniqueClick = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["format"])(dataItem.UniqueClick);
      var signup = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["format"])(dataItem.Signup);
      var fdm = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["format"])(dataItem.Fdm);
      var activeMember = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["format"])(dataItem.ActiveMember);
      var noOfSubAff = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["format"])(dataItem.NoOfSubAff);
      var deposit = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.Deposit);
      var withdrawal = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.Withdrawal);
      var turnover = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.Turnover);
      var ggr = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.Ggr);
      var bonus = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.Bonus);
      var rebate = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.Rebate);
      var platformFee = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.PlatformFee);
      var depositFee = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.DepositFee);
      var withdrawalFee = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.WithdrawalFee);
      var totalFee = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.TotalFee);
      var earning = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.Earning);
      var p2pEarning = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.P2pEarning);
      var affWithdrawal = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.AffWithdrawal);
      var affAdjustment = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.AffAdjustment);
      var balanceBf = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.BalanceBf);
      var commRate = isMainView && isTotalRow ? 'N/A' : dataItem.CommissionRate + '%';
      var subAffEarning = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.SubAffEarning);
      var totalEarning = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_18__["formatDecimal"])(dataItem.TotalEarning);
      var paymentCurrency = isTotalRow ? '' : dataItem.PaymentCurrency;
      return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_13___default.a.Fragment, null, isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-center",
        title: paymentCurrency
      }, paymentCurrency), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: totalClick
      }, totalClick), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: uniqueClick
      }, uniqueClick), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: signup
      }, signup), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: fdm
      }, fdm), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: activeMember
      }, activeMember), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: noOfSubAff
      }, noOfSubAff), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: deposit
      }, deposit), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: withdrawal
      }, withdrawal), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: productColumnClassName,
        title: turnover
      }, turnover), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: productColumnClassName,
        title: ggr
      }, ggr), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: bonus
      }, bonus), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: rebate
      }, rebate), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: platformFee
      }, platformFee), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: depositFee
      }, depositFee), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: withdrawalFee
      }, withdrawalFee), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: totalFee
      }, totalFee), dataItem.IsMultiGroupProduct ? react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right text-danger",
        title: "First product group's share% of multiple groups"
      }, commRate) : react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: commRate
      }, commRate), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: earning
      }, earning), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: p2pEarning
      }, p2pEarning), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: subAffEarning
      }, subAffEarning), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: totalEarning
      }, totalEarning), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: affWithdrawal
      }, affWithdrawal), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: affAdjustment
      }, affAdjustment), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-right",
        title: balanceBf
      }, balanceBf), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-center"
      }, dataItem.AffId > 0 ? react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Button"], {
        color: "link",
        className: "p-0",
        onClick: function onClick() {
          return _this3.handleViewMonthOnMonth(dataItem.UserName);
        }
      }, "View") : ''), isMainView && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("td", {
        className: "text-center"
      }, dataItem.AffId > 0 ? react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Button"], {
        color: "link",
        className: "p-0",
        onClick: function onClick() {
          return _this3.handleViewPlayerGgrReport(dataItem.UserName);
        }
      }, "View") : ''));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          gridData = _this$state.gridData,
          total = _this$state.total;
      var maxHeight = Object(_libs_constants__WEBPACK_IMPORTED_MODULE_23__["getMaxHeight"])();
      return gridData && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_13__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("div", {
        className: "table-responsive aff-report-table-container",
        style: {
          'max-height': maxHeight
        },
        ref: this.tableRef
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Table"], {
        className: "freeze-table"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("thead", null, this._renderHeader()), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("tbody", null, this._renderDataSection(gridData)), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("tfoot", null, total && this._renderDataSection([total])))), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_17__["Pager"], {
        pageOption: this.props.pagingOption,
        onPaging: this.handlePaging
      }));
    }
  }]);

  return GridData;
}(react__WEBPACK_IMPORTED_MODULE_13__["PureComponent"]);

function mapStateToProps(_ref) {
  var pagingOption = _ref.pagingOption,
      param = _ref.param,
      currentViewLevel = _ref.currentViewLevel,
      productList = _ref.productList;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5___default()({}, {
    pagingOption: pagingOption,
    param: param,
    currentViewLevel: currentViewLevel,
    productList: productList
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_15__["bindActionCreators"])({
    setPagingOption: _actions__WEBPACK_IMPORTED_MODULE_19__["setPagingOption"],
    toggleLoader: _actions_loaderAction__WEBPACK_IMPORTED_MODULE_20__["toggleLoader"],
    setViewLevel: _actions__WEBPACK_IMPORTED_MODULE_19__["setViewLevel"],
    setParam: _actions__WEBPACK_IMPORTED_MODULE_19__["setParam"],
    fetchData: _actions__WEBPACK_IMPORTED_MODULE_19__["fetchData"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_14__["connect"])(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
})(GridData));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/index.jsx":
/*!****************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/index.jsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator */ "./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "./node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reducers */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/reducers/index.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/AppContainer */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/components/AppContainer.jsx");
/* harmony import */ var _modules_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../modules/store */ "./Areas/Portal/www/source/js/modules/store.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../modules/utils */ "./Areas/Portal/www/source/js/modules/utils.js");













var App =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(App, _React$Component);

  function App(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, App);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(App).call(this, props));
    var _window$initialState = window.initialState,
        productList = _window$initialState.productList,
        languageList = _window$initialState.languageList,
        currencyList = _window$initialState.currencyList,
        baseCurrencyList = _window$initialState.baseCurrencyList,
        paymentCurrencyList = _window$initialState.paymentCurrencyList,
        isProduction = _window$initialState.isProduction,
        today = _window$initialState.today,
        isN8B = _window$initialState.isN8B,
        commGroupList = _window$initialState.commGroupList;
    var language = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(languageList), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var languageItem = _step.value;
        language[languageItem.LanguageCode] = languageItem.LanguageName;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var newProductList = Object(_modules_utils__WEBPACK_IMPORTED_MODULE_11__["convertListToMutilpleSelected"])(productList, 'ProductId', 'ProductName');
    var newCurrencyList = Object(_modules_utils__WEBPACK_IMPORTED_MODULE_11__["convertListToMutilpleSelected"])(currencyList, 'ExchangeId', 'Code');
    var newPaymentCurrencyList = Object(_modules_utils__WEBPACK_IMPORTED_MODULE_11__["convertListToMutilpleSelected"])(paymentCurrencyList, 'ExchangeId', 'Code');
    var newCommGroupList = Object(_modules_utils__WEBPACK_IMPORTED_MODULE_11__["convertListToMutilpleSelected"])(commGroupList, 'Id', 'Name');
    _this.store = Object(_modules_store__WEBPACK_IMPORTED_MODULE_10__["configureStore"])({
      productList: newProductList,
      commGroupList: newCommGroupList,
      languageList: language,
      today: today,
      currencyList: newCurrencyList,
      baseCurrencyList: baseCurrencyList,
      paymentCurrencyList: newPaymentCurrencyList,
      isProduction: isProduction,
      isN8B: isN8B
    }, _reducers__WEBPACK_IMPORTED_MODULE_8__["default"]);
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(App, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_7__["Provider"], {
        store: this.store
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_9__["default"], null));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);



/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/constants.js":
/*!************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/constants.js ***!
  \************************************************************************************/
/*! exports provided: defaultBaseCurrency, minMonthDate, defaultSortBy, sortByMainView, sortByMonthOnMonthView, viewLevel, sortDirectionType, totalText, resource, headerText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultSortBy", function() { return defaultSortBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByMainView", function() { return sortByMainView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByMonthOnMonthView", function() { return sortByMonthOnMonthView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewLevel", function() { return viewLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortDirectionType", function() { return sortDirectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "totalText", function() { return totalText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resource", function() { return resource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerText", function() { return headerText; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../modules/constants */ "./Areas/Portal/www/source/js/modules/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultBaseCurrency", function() { return _modules_constants__WEBPACK_IMPORTED_MODULE_1__["defaultBaseCurrency"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "minMonthDate", function() { return _modules_constants__WEBPACK_IMPORTED_MODULE_1__["minMonthDate"]; });




var sortByCommon = {
  Turnover: 2,
  GGR: 3,
  Earning: 4
};
var defaultSortBy = 1;
var sortByMainView = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, {
  Affiliate: 1
}, sortByCommon);
var sortByMonthOnMonthView = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, {
  Month: 1
}, sortByCommon);
var viewLevel = {
  main: 1,
  monthOnMonth: 2
};
var sortDirectionType = {
  ascending: 0,
  descending: 1
};
var totalText = 'Total (all pages)';
var resource = {
  reportName: 'AFFILIATE REPORT',
  reportDetailName: 'MONTH ON MONTH',
  space: ' - '
};
var headerText = {
  UserName: 'Affiliate',
  MonthDateString: 'Month',
  PaymentCurrency: 'Linked Account Currency',
  TotalClick: 'Total Click',
  UniqueClick: 'Unique Click',
  Signup: 'Signup',
  Fdm: 'FDM',
  ActiveMember: 'Active Player',
  NoOfSubAff: 'Sub-Affiliate',
  Deposit: 'Deposit',
  Withdrawal: 'Withdrawal',
  Turnover: 'Turnover',
  Ggr: 'GGR',
  Bonus: 'Bonus',
  Rebate: 'Rebate',
  PlatformFee: 'Royalty Fee',
  DepositFee: 'Deposit Fee',
  WithdrawalFee: 'Withdrawal Fee',
  TotalFee: 'Total Fee',
  CommissionRate: 'Share%',
  Earning: 'Earning',
  P2pEarning: 'P2P Earning',
  SubAffEarning: 'Sub-Affiliate Earning',
  TotalEarning: 'Total Earning',
  AffWithdrawal: 'Withdrawal',
  AffAdjustment: 'Adjustment',
  BalanceBf: 'Balance B/F',
  MemberStatistics: 'Player Statistics',
  AffiliateStatistics: 'Affiliate Statistics',
  MonthOnMonth: 'Month on Month',
  PlayerGgr: 'Player GGR'
};

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/reportExcel.js":
/*!**************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/reportExcel.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReportExcel; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_splice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/splice */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/splice.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_splice__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_splice__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator */ "./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modules_excel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../modules/excel */ "./Areas/Portal/www/source/js/modules/excel.js");
/* harmony import */ var _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../modules/excelStyleConstant */ "./Areas/Portal/www/source/js/modules/excelStyleConstant.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./constants */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/constants.js");
/* harmony import */ var _modules_numberFormat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../modules/numberFormat */ "./Areas/Portal/www/source/js/modules/numberFormat.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../modules/utils */ "./Areas/Portal/www/source/js/modules/utils.js");












var TITLE_ROW_INDEX = 0;
var HEADER_ROW_INDEX = 1;
var DATA_ROW_INDEX = 3;
var MAIN_VIEW = {
  TOTAL_COLUMN: 26,
  INDEX_PLAYER_STATISTICS_COLUMN: 8,
  INDEX_AFFILIATE_STATISTICS_COLUMN: 9,
  INDEX_DEPOSIT_COLUMN: 8,
  INDEX_COMM_COLUMN: 18,
  COLSPAN_PLAYER_STATISTICS: 10,
  COLSPAN_AFFILIATE_STATISTICS: 8
};
var DETAIL_VIEW = {
  TOTAL_COLUMN: 24,
  INDEX_PLAYER_STATISTICS_COLUMN: 7,
  INDEX_AFFILIATE_STATISTICS_COLUMN: 8,
  INDEX_DEPOSIT_COLUMN: 7,
  INDEX_COMM_COLUMN: 17,
  COLSPAN_PLAYER_STATISTICS: 10,
  COLSPAN_AFFILIATE_STATISTICS: 7
};
var MAIN_SECTION_STYLE = 'mainSectionStyle';
var TOTAL_SECTION_STYLE = 'totalSectionStyle';
var fields = {
  UserName: 'UserName',
  Description: 'Description',
  MonthDateString: 'MonthDateString',
  PaymentCurrency: 'PaymentCurrency',
  TotalClick: 'TotalClick',
  UniqueClick: 'UniqueClick',
  Signup: 'Signup',
  Fdm: 'Fdm',
  ActiveMember: 'ActiveMember',
  NoOfSubAff: 'NoOfSubAff',
  Deposit: 'Deposit',
  Withdrawal: 'Withdrawal',
  Turnover: 'Turnover',
  Ggr: 'Ggr',
  Bonus: 'Bonus',
  Rebate: 'Rebate',
  PlatformFee: 'PlatformFee',
  DepositFee: 'DepositFee',
  WithdrawalFee: 'WithdrawalFee',
  TotalFee: 'TotalFee',
  CommissionRate: 'CommissionRate',
  Earning: 'Earning',
  P2pEarning: 'P2pEarning',
  SubAffEarning: 'SubAffEarning',
  TotalEarning: 'TotalEarning',
  AffWithdrawal: 'AffWithdrawal',
  AffAdjustment: 'AffAdjustment',
  BalanceBf: 'BalanceBf'
};

var ReportExcel =
/*#__PURE__*/
function () {
  function ReportExcel(data, title, isMainView) {
    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, ReportExcel);

    this.worksheet = {};
    this.title = isMainView ? title : _constants__WEBPACK_IMPORTED_MODULE_9__["resource"].reportName + ' > ' + title;
    this.data = data;
    this.isMainView = isMainView;
    this.currentRowIndex = DATA_ROW_INDEX;
    this.mergeConfig = [];
    this.columnConfigs = this._getcolumnConfigs(isMainView);
    this.viewInfo = isMainView ? MAIN_VIEW : DETAIL_VIEW;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ReportExcel, [{
    key: "export",
    value: function _export() {
      var _this = this;

      _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].process(function () {
        _this._createTitle();

        _this._createHeader();

        _this._createBodyData();

        _this._createTotalRow();

        _this._createExcelConfig();

        var fileName = _constants__WEBPACK_IMPORTED_MODULE_9__["resource"].reportName + (_this.isMainView ? '' : _constants__WEBPACK_IMPORTED_MODULE_9__["resource"].space + _constants__WEBPACK_IMPORTED_MODULE_9__["resource"].reportDetailName) + _constants__WEBPACK_IMPORTED_MODULE_9__["resource"].space + Object(_modules_utils__WEBPACK_IMPORTED_MODULE_11__["formatDateTime"])(new Date(), 'MM.dd.yyyy hh.mm.ss');
        _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].export(_this.worksheet, fileName);
      });
    }
  }, {
    key: "_createTitle",
    value: function _createTitle() {
      this.mergeConfig.push({
        s: {
          r: TITLE_ROW_INDEX,
          c: 0
        },
        e: {
          r: TITLE_ROW_INDEX,
          c: this.viewInfo.TOTAL_COLUMN - 1
        }
      });
      var address = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
        c: 0,
        r: TITLE_ROW_INDEX
      });
      this.worksheet[address] = {
        t: "s",
        v: this.title,
        s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["titleCellStyle"]
      };
    }
  }, {
    key: "_createHeader",
    value: function _createHeader() {
      var colspanPlayerStatistics = this.viewInfo.COLSPAN_PLAYER_STATISTICS;
      var colspanAffiliateStatistics = this.viewInfo.COLSPAN_AFFILIATE_STATISTICS;
      var length = this.columnConfigs.length - (colspanPlayerStatistics - 1) - (colspanAffiliateStatistics - 1);

      for (var i = 0; i < length; i++) {
        if (i === this.viewInfo.INDEX_PLAYER_STATISTICS_COLUMN) {
          this._buildColspanColumn(HEADER_ROW_INDEX, this.viewInfo.INDEX_DEPOSIT_COLUMN, colspanPlayerStatistics, _constants__WEBPACK_IMPORTED_MODULE_9__["headerText"].MemberStatistics);
        } else if (i === this.viewInfo.INDEX_AFFILIATE_STATISTICS_COLUMN) {
          this._buildColspanColumn(HEADER_ROW_INDEX, this.viewInfo.INDEX_COMM_COLUMN, colspanAffiliateStatistics, _constants__WEBPACK_IMPORTED_MODULE_9__["headerText"].AffiliateStatistics);
        } else {
          var fieldName = this.columnConfigs[i].field;
          var address = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
            c: i,
            r: HEADER_ROW_INDEX
          });
          this.worksheet[address] = {
            t: "s",
            v: _constants__WEBPACK_IMPORTED_MODULE_9__["headerText"][fieldName],
            s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["headerCellStyle"]
          };
          var nextRowAddress = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
            c: i,
            r: HEADER_ROW_INDEX + 1
          });
          this.worksheet[nextRowAddress] = {
            t: "s",
            s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["mergedHeaderCellByRowspanStyle"]
          };
          this.mergeConfig.push({
            s: {
              r: HEADER_ROW_INDEX,
              c: i
            },
            e: {
              r: HEADER_ROW_INDEX + 1,
              c: i
            }
          });
        }
      }
    }
  }, {
    key: "_buildColspanColumn",
    value: function _buildColspanColumn(rowIndex, colIndex, colSpan, colSpanheaderText) {
      var colSpanCellAddress = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
        c: colIndex,
        r: rowIndex
      });
      this.worksheet[colSpanCellAddress] = {
        t: "s",
        v: colSpanheaderText,
        s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["headerCellStyle"]
      };
      var totalColumn = colIndex + colSpan;
      this.mergeConfig.push({
        s: {
          r: rowIndex,
          c: colIndex
        },
        e: {
          r: rowIndex,
          c: totalColumn - 1
        }
      });

      for (var i = colIndex; i < totalColumn; i++) {
        var address = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
          c: i,
          r: rowIndex + 1
        });
        var fieldName = this.columnConfigs[i].field;
        this.worksheet[address] = {
          t: "s",
          v: _constants__WEBPACK_IMPORTED_MODULE_9__["headerText"][fieldName] || '',
          s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["headerCellStyle"]
        };
      }
    }
  }, {
    key: "_createBodyData",
    value: function _createBodyData() {
      var mainData = this.data.MainData;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_4___default()(mainData), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          item.CommissionRate = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_10__["formatDecimal"])(item.CommissionRate) + '%';

          if (!this.isMainView) {
            var _context;

            var MonthDateString = item.MonthDateString,
                Description = item.Description;
            item.MonthDateString = Description ? _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context = "".concat(MonthDateString, " (")).call(_context, Description, ")") : MonthDateString;
          }

          var totalColumn = this.viewInfo.TOTAL_COLUMN;

          for (var j = 0; j < totalColumn; j++) {
            var address = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
              c: j,
              r: this.currentRowIndex
            });
            this.worksheet[address] = this._buildDataRow(item, MAIN_SECTION_STYLE, j);
          }

          this.currentRowIndex++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "_createTotalRow",
    value: function _createTotalRow() {
      var totalData = this.data.Total;

      if (totalData) {
        var _ref, _ref2;

        var customTotalData = this.isMainView ? (_ref = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref, fields.UserName, _constants__WEBPACK_IMPORTED_MODULE_9__["totalText"]), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref, fields.PaymentCurrency, ''), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref, fields.CommissionRate, "N/A"), _ref) : (_ref2 = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref2, fields.MonthDateString, _constants__WEBPACK_IMPORTED_MODULE_9__["totalText"]), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref2, fields.CommissionRate, Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_10__["formatDecimal"])(totalData.CommissionRate) + '%'), _ref2);

        var total = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, totalData, customTotalData);

        var totalColumn = this.viewInfo.TOTAL_COLUMN;

        for (var j = 0; j < totalColumn; j++) {
          var address = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
            c: j,
            r: this.currentRowIndex
          });
          this.worksheet[address] = this._buildDataRow(total, TOTAL_SECTION_STYLE, j);
        }
      }
    }
  }, {
    key: "_buildDataRow",
    value: function _buildDataRow(item, sectionStyleName, colIndex) {
      var columnConfig = this.columnConfigs[colIndex];
      var value = item[columnConfig.field];
      return {
        t: _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellType(value),
        v: value,
        s: columnConfig[sectionStyleName]
      };
    }
  }, {
    key: "_createExcelConfig",
    value: function _createExcelConfig() {
      var _context2;

      var cellStart = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
        r: 0,
        c: 0
      });
      var cellEnd = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
        r: this.currentRowIndex,
        c: this.viewInfo.TOTAL_COLUMN
      });
      this.worksheet["!merges"] = this.mergeConfig;
      this.worksheet["!ref"] = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context2 = "".concat(cellStart, ":")).call(_context2, cellEnd);
      this.worksheet['!cols'] = [{
        wpx: 150
      }, {
        wpx: 150
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 140
      }, {
        wpx: 140
      }, {
        wpx: 120
      }, {
        wpx: 120
      }, {
        wpx: 150
      }, {
        wpx: 150
      }];
    }
  }, {
    key: "_getcolumnConfigs",
    value: function _getcolumnConfigs(isMainView) {
      var _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28;

      var columnConfigList = [(_ref3 = {
        field: isMainView ? fields.UserName : fields.MonthDateString
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref3, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref3, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].default), _ref3), (_ref4 = {
        field: fields.PaymentCurrency
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref4, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref4, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].center), _ref4), (_ref5 = {
        field: fields.TotalClick
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref5, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].number), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref5, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].number), _ref5), (_ref6 = {
        field: fields.UniqueClick
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref6, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].number), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref6, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].number), _ref6), (_ref7 = {
        field: fields.Signup
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref7, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].number), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref7, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].number), _ref7), (_ref8 = {
        field: fields.Fdm
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref8, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].number), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref8, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].number), _ref8), (_ref9 = {
        field: fields.ActiveMember
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref9, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].number), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref9, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].number), _ref9), (_ref10 = {
        field: fields.NoOfSubAff
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref10, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].number), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref10, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].number), _ref10), (_ref11 = {
        field: fields.Deposit
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref11, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref11, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref11), (_ref12 = {
        field: fields.Withdrawal
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref12, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref12, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref12), (_ref13 = {
        field: fields.Turnover
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref13, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref13, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref13), (_ref14 = {
        field: fields.Ggr
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref14, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref14, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref14), (_ref15 = {
        field: fields.Bonus
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref15, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref15, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref15), (_ref16 = {
        field: fields.Rebate
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref16, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref16, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref16), (_ref17 = {
        field: fields.PlatformFee
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref17, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref17, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref17), (_ref18 = {
        field: fields.DepositFee
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref18, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref18, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref18), (_ref19 = {
        field: fields.WithdrawalFee
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref19, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref19, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref19), (_ref20 = {
        field: fields.TotalFee
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref20, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref20, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref20), (_ref21 = {
        field: fields.CommissionRate
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref21, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].right), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref21, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].right), _ref21), (_ref22 = {
        field: fields.Earning
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref22, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref22, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref22), (_ref23 = {
        field: fields.P2pEarning
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref23, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref23, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref23), (_ref24 = {
        field: fields.SubAffEarning
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref24, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref24, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref24), (_ref25 = {
        field: fields.TotalEarning
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref25, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref25, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref25), (_ref26 = {
        field: fields.AffWithdrawal
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref26, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref26, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref26), (_ref27 = {
        field: fields.AffAdjustment
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref27, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref27, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref27), (_ref28 = {
        field: fields.BalanceBf
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref28, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(_ref28, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref28)];

      if (!isMainView) {
        _babel_runtime_corejs3_core_js_stable_instance_splice__WEBPACK_IMPORTED_MODULE_0___default()(columnConfigList).call(columnConfigList, 1, 1);

        _babel_runtime_corejs3_core_js_stable_instance_splice__WEBPACK_IMPORTED_MODULE_0___default()(columnConfigList).call(columnConfigList, 24, 1);
      }

      return columnConfigList;
    }
  }]);

  return ReportExcel;
}();



/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/affiliate-report/reducers/index.js":
/*!************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/affiliate-report/reducers/index.js ***!
  \************************************************************************************/
/*! exports provided: commGroupList, productList, currencyList, paymentCurrencyList, reportTitle, param, currentViewLevel, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commGroupList", function() { return commGroupList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productList", function() { return productList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyList", function() { return currencyList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paymentCurrencyList", function() { return paymentCurrencyList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportTitle", function() { return reportTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "param", function() { return param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentViewLevel", function() { return currentViewLevel; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _reducers_pagingReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../reducers/pagingReducer */ "./Areas/Portal/www/source/js/reducers/pagingReducer.js");
/* harmony import */ var _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../reducers/loaderReducer */ "./Areas/Portal/www/source/js/reducers/loaderReducer.js");
/* harmony import */ var _modules_createReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../modules/createReducer */ "./Areas/Portal/www/source/js/modules/createReducer.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions/types */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/actions/types.js");
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../libs/constants */ "./Areas/Portal/www/source/js/pages/report/affiliate-report/libs/constants.js");




var _context, _context2;







var languageList = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])({}, {});
var baseCurrencyList = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])([], {});
var isProduction = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(false, {});
var isN8B = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(false, {});
var now = new Date();

var defaultToday = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_2___default()(_context = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_2___default()(_context2 = "".concat(now.getMonth(), "/")).call(_context2, now.getDate(), "/")).call(_context, now.getFullYear());

var today = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(defaultToday, {});
var commGroupList = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])([], _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_COMM_GROUP_LIST"], function (prevState, action) {
  return action.data;
}));
var productList = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])([], _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_PRODUCT_LIST"], function (prevState, action) {
  return action.data;
}));
var currencyList = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])([], _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_CURRENCY_LIST"], function (prevState, action) {
  return action.data;
}));
var paymentCurrencyList = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])([], _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_PAYMENT_CURRENCY_LIST"], function (prevState, action) {
  return action.data;
}));
var reportTitle = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])('', _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_REPORT_TITLE"], function (prevState, action) {
  return action.data;
}));
var param = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(null, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_PARAM"], function (prevState, action) {
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, prevState, action.data);
}));
var currentViewLevel = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(_libs_constants__WEBPACK_IMPORTED_MODULE_8__["viewLevel"].main, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_VIEW_LEVEL"], function (prevState, action) {
  return action.data;
}));
/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_3__["combineReducers"])({
  isN8B: isN8B,
  param: param,
  reportTitle: reportTitle,
  isShowLoader: _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_5__["isShowLoader"],
  productList: productList,
  commGroupList: commGroupList,
  pagingOption: _reducers_pagingReducer__WEBPACK_IMPORTED_MODULE_4__["pagingOption"],
  languageList: languageList,
  currencyList: currencyList,
  baseCurrencyList: baseCurrencyList,
  paymentCurrencyList: paymentCurrencyList,
  isProduction: isProduction,
  today: today,
  currentViewLevel: currentViewLevel
}));

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/splice.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/splice.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/splice */ "./node_modules/core-js-pure/stable/instance/splice.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/json/stringify.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/json/stringify.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js-pure/stable/json/stringify */ "./node_modules/core-js-pure/stable/json/stringify.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/object/keys.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js-pure/stable/object/keys */ "./node_modules/core-js-pure/stable/object/keys.js");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/splice.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/splice.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../../modules/es.array.splice */ "./node_modules/core-js-pure/modules/es.array.splice.js");
var entryVirtual = __webpack_require__(/*! ../../../internals/entry-virtual */ "./node_modules/core-js-pure/internals/entry-virtual.js");

module.exports = entryVirtual('Array').splice;


/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/splice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/splice.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var splice = __webpack_require__(/*! ../array/virtual/splice */ "./node_modules/core-js-pure/es/array/virtual/splice.js");

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.splice;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.splice) ? splice : own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/es/json/stringify.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/es/json/stringify.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });

module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.splice.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.splice.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js-pure/internals/to-absolute-index.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js-pure/internals/to-integer.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js-pure/internals/to-length.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js-pure/internals/array-species-create.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js-pure/internals/create-property.js");
var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js-pure/internals/array-method-has-species-support.js");

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/splice.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/splice.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../../es/instance/splice */ "./node_modules/core-js-pure/es/instance/splice.js");


/***/ }),

/***/ "./node_modules/core-js-pure/stable/json/stringify.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/json/stringify.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../../es/json/stringify */ "./node_modules/core-js-pure/es/json/stringify.js");


/***/ }),

/***/ "./node_modules/core-js-pure/stable/object/keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/stable/object/keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../../es/object/keys */ "./node_modules/core-js-pure/es/object/keys.js");


/***/ })

}]);
//# sourceMappingURL=6-0bef60ec43e615ab7d18.chunk.js.map