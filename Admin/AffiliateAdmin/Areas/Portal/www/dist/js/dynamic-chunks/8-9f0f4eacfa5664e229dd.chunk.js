(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/actions/index.js":
/*!**********************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/actions/index.js ***!
  \**********************************************************************************/
/*! exports provided: setPagingOption, toggleLoader, setReportTitle, setParam, fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReportTitle", function() { return setReportTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParam", function() { return setParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./Areas/Portal/www/source/js/pages/report/transfer-report/actions/types.js");
/* harmony import */ var _modules_ajaxRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../modules/ajaxRequest */ "./Areas/Portal/www/source/js/modules/ajaxRequest.js");
/* harmony import */ var _actions_pagingAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../actions/pagingAction */ "./Areas/Portal/www/source/js/actions/pagingAction.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setPagingOption", function() { return _actions_pagingAction__WEBPACK_IMPORTED_MODULE_4__["setPagingOption"]; });

/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../actions/loaderAction */ "./Areas/Portal/www/source/js/actions/loaderAction.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toggleLoader", function() { return _actions_loaderAction__WEBPACK_IMPORTED_MODULE_5__["toggleLoader"]; });








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
var fetchData = function fetchData(param) {
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
              url = 'Portal/TransferReport/GetTransferReportData';
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

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/actions/types.js":
/*!**********************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/actions/types.js ***!
  \**********************************************************************************/
/*! exports provided: SET_PARAM, SET_REPORT_TITLE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PARAM", function() { return SET_PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORT_TITLE", function() { return SET_REPORT_TITLE; });
var SET_PARAM = 'TRANSFER_REPORT_SET_PARAM';
var SET_REPORT_TITLE = 'TRANSFER_REPORT_SET_REPORT_TITLE';

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/components/AppContainer.jsx":
/*!*********************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/components/AppContainer.jsx ***!
  \*********************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../layouts/AppLayout */ "./Areas/Portal/www/source/js/layouts/AppLayout.jsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./Areas/Portal/www/source/js/pages/report/transfer-report/components/Filter.jsx");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Content */ "./Areas/Portal/www/source/js/pages/report/transfer-report/components/Content.jsx");
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../components/Loader */ "./Areas/Portal/www/source/js/components/Loader.jsx");







var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_3__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
    show: props.isShowLoader
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};

function mapStateToProps(_ref) {
  var isShowLoader = _ref.isShowLoader;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, {
    isShowLoader: isShowLoader
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(react__WEBPACK_IMPORTED_MODULE_1___default.a.memo(AppContainer)));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/components/Content.jsx":
/*!****************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/components/Content.jsx ***!
  \****************************************************************************************/
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
/* harmony import */ var _GridData__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./GridData */ "./Areas/Portal/www/source/js/pages/report/transfer-report/components/GridData.jsx");
/* harmony import */ var _components_ReportTitle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../components/ReportTitle */ "./Areas/Portal/www/source/js/components/ReportTitle.jsx");
/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../actions/loaderAction */ "./Areas/Portal/www/source/js/actions/loaderAction.js");
/* harmony import */ var _libs_reportExcel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../libs/reportExcel */ "./Areas/Portal/www/source/js/pages/report/transfer-report/libs/reportExcel.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/report/transfer-report/actions/index.js");


















var Content =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(Content, _Component);

  function Content(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, Content);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Content).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "handleExportExcel",
    /*#__PURE__*/
    _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
    /*#__PURE__*/
    _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var _this$props, param, reportTitle, newParam, data, reportExcel;

      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.props.toggleLoader(true);

              _this$props = _this.props, param = _this$props.param, reportTitle = _this$props.reportTitle;
              newParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, param, {
                IsExportExcel: true
              });
              _context.next = 5;
              return _this.props.fetchData(newParam);

            case 5:
              data = _context.sent;

              if (data) {
                reportExcel = new _libs_reportExcel__WEBPACK_IMPORTED_MODULE_16__["default"](data, reportTitle);
                reportExcel.export();
              }

              _this.props.toggleLoader(false);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

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
      var reportTitle = this.props.reportTitle;
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "d-flex align-items-center"
      }, reportTitle, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("button", {
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
      var reportTitle = this.props.reportTitle;
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "data-content my-2 report-content-container"
      }, reportTitle && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_components_ReportTitle__WEBPACK_IMPORTED_MODULE_14__["default"], {
        content: this._buildReportTitle()
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_GridData__WEBPACK_IMPORTED_MODULE_13__["default"], null));
    }
  }]);

  return Content;
}(react__WEBPACK_IMPORTED_MODULE_10__["Component"]);

function mapStateToProps(_ref2) {
  var reportTitle = _ref2.reportTitle,
      param = _ref2.param;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, {
    reportTitle: reportTitle,
    param: param
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_12__["bindActionCreators"])({
    toggleLoader: _actions_loaderAction__WEBPACK_IMPORTED_MODULE_15__["toggleLoader"],
    fetchData: _actions__WEBPACK_IMPORTED_MODULE_17__["fetchData"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_11__["connect"])(mapStateToProps, mapDispatchToProps)(Content));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/components/Filter.jsx":
/*!***************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/components/Filter.jsx ***!
  \***************************************************************************************/
/*! exports provided: minDate, Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minDate", function() { return minDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3__);
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
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @9softstudio/react-datepicker */ "./node_modules/@9softstudio/react-datepicker/dist/index.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/report/transfer-report/actions/index.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../modules/utils */ "./Areas/Portal/www/source/js/modules/utils.js");
/* harmony import */ var _modules_constants__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../modules/constants */ "./Areas/Portal/www/source/js/modules/constants.js");
/* harmony import */ var _modules_globalResource__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../modules/globalResource */ "./Areas/Portal/www/source/js/modules/globalResource.js");
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../libs/constants */ "./Areas/Portal/www/source/js/pages/report/transfer-report/libs/constants.js");





















var minDate = new Date(2021, 10, 31);
var Filter =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default()(Filter, _Component);

  function Filter(props) {
    var _context, _context2, _context3;

    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Filter);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Filter).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handlePressEnter", function (event) {
      if (event.charCode === 13) {
        event.preventDefault();

        _this.handleClickSearch();
      }
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleChangeFromDate", function (momentDate) {
      _this.setState(function (prevState) {
        return Object(_modules_utils__WEBPACK_IMPORTED_MODULE_17__["handleAfterChangeFromDate"])(momentDate, prevState.toDate);
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleChangeToDate", function (momentDate) {
      _this.setState(function (prevState) {
        return Object(_modules_utils__WEBPACK_IMPORTED_MODULE_17__["handleAfterChangeToDate"])(momentDate, prevState.fromDate);
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      _this.setState(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, name, value));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleChangeTransId", function (event) {
      var value = event.target.value;
      var numberValue = Number(value);
      var isValid = Object(_modules_utils__WEBPACK_IMPORTED_MODULE_17__["isValidNumber"])(numberValue);

      if (isValid) {
        _this.setState({
          transId: value
        });
      }
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleClickSearch", function () {
      var _this$state = _this.state,
          transId = _this$state.transId,
          selectedBaseCurrency = _this$state.selectedBaseCurrency,
          fromDate = _this$state.fromDate,
          toDate = _this$state.toDate,
          affName = _this$state.affName,
          playerName = _this$state.playerName;
      var pagingOption = _this.props.pagingOption;

      _this._updateReportTitle();

      var param = {
        TransId: transId,
        AffName: affName,
        PlayerName: playerName,
        FromDate: fromDate,
        ToDate: toDate,
        BaseCurrencyId: Number(selectedBaseCurrency),
        PageIndex: 1,
        PageSize: pagingOption.PageSize
      };

      _this.props.setParam(param);
    });

    var _this$props = _this.props,
        today = _this$props.today,
        baseCurrencyList = _this$props.baseCurrencyList;
    var now = new Date(today);
    var currentMonth = now.getMonth() + 1;
    var currentYear = now.getFullYear();
    _this.nowString = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context2 = "".concat(currentMonth, "/")).call(_context2, now.getDate(), "/")).call(_context, currentYear);
    _this.state = {
      transId: '',
      affName: '',
      playerName: '',
      fromDate: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context3 = "".concat(currentMonth, "/01/")).call(_context3, currentYear),
      toDate: _this.nowString,
      selectedBaseCurrency: baseCurrencyList.length && baseCurrencyList[0].ExchangeId || _modules_constants__WEBPACK_IMPORTED_MODULE_18__["defaultBaseCurrency"]
    };
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Filter, [{
    key: "_updateReportTitle",
    value: function _updateReportTitle() {
      var reportTitle = this._buildReportTitle();

      this.props.setReportTitle(reportTitle);
    }
  }, {
    key: "_buildReportTitle",
    value: function _buildReportTitle() {
      var _context4, _context5, _context6, _context7, _context8, _context9, _context10;

      var baseCurrencyList = this.props.baseCurrencyList;
      var _this$state2 = this.state,
          transId = _this$state2.transId,
          fromDate = _this$state2.fromDate,
          toDate = _this$state2.toDate,
          affName = _this$state2.affName,
          playerName = _this$state2.playerName,
          selectedBaseCurrency = _this$state2.selectedBaseCurrency;
      var transIdTitle = "".concat(transId && '- Trans. Id \'' + transId + '\'');
      var affNameTitle = "".concat(affName && '- Affiliate contains \'' + affName + '\'');
      var playerNameTitle = "".concat(playerName && '- Player contains \'' + playerName + '\'');

      var fromToTitle = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context4 = "FROM ".concat(fromDate, " TO ")).call(_context4, toDate);

      var baseCurrency = _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(_context5 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(baseCurrencyList).call(baseCurrencyList, function (x) {
        return x.ExchangeId == selectedBaseCurrency;
      })).call(_context5, function (b) {
        return b.Code;
      }).join(',');

      return _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context6 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context7 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context8 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context9 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_3___default()(_context10 = "".concat(_libs_constants__WEBPACK_IMPORTED_MODULE_20__["reportName"])).call(_context10, transIdTitle)).call(_context9, affNameTitle)).call(_context8, playerNameTitle, "- Base Currency ")).call(_context7, baseCurrency, " - ")).call(_context6, fromToTitle);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          baseCurrencyList = _this$props2.baseCurrencyList,
          isProduction = _this$props2.isProduction;
      var _this$state3 = this.state,
          transId = _this$state3.transId,
          selectedBaseCurrency = _this$state3.selectedBaseCurrency,
          fromDate = _this$state3.fromDate,
          toDate = _this$state3.toDate,
          affName = _this$state3.affName,
          playerName = _this$state3.playerName;
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "filter-container"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Form"], {
        inline: true,
        tag: "div"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        for: "TransId",
        className: "mr-sm-2"
      }, "Trans. Id"), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Input"], {
        type: "text",
        name: "transId",
        id: "TransId",
        maxLength: "9",
        onKeyPress: this.handlePressEnter,
        onChange: this.handleChangeTransId,
        value: transId
      })), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        for: "Affiliate",
        className: "mr-sm-2"
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_20__["headerText"].AffName), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Input"], {
        type: "text",
        name: "affName",
        id: "Affiliate",
        maxLength: "30",
        onKeyPress: this.handlePressEnter,
        onChange: this.handleChange,
        value: affName
      })), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        for: "Player",
        className: "mr-sm-2"
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_20__["headerText"].PlayerName), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Input"], {
        type: "text",
        name: "playerName",
        id: "Player",
        maxLength: "30",
        onKeyPress: this.handlePressEnter,
        onChange: this.handleChange,
        value: playerName
      })), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        className: "mr-sm-2"
      }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_19__["globalResource"].BaseCurrency), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Input"], {
        type: "select",
        name: "selectedBaseCurrency",
        id: "BaseCurrency",
        value: selectedBaseCurrency,
        onChange: this.handleChange
      }, _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_2___default()(baseCurrencyList).call(baseCurrencyList, function (c) {
        return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("option", {
          key: c.ExchangeId,
          value: c.ExchangeId
        }, c.Code);
      }), !isProduction && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("option", {
        value: "20"
      }, "UUS"))), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        className: "mr-sm-2"
      }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_19__["globalResource"].From), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_15__["DatePicker"], {
        minDate: minDate,
        maxDate: this.nowString,
        date: fromDate,
        iconElement: react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("span", {
          className: "oi oi-calendar icon-calendar ml-1"
        }),
        onChange: this.handleChangeFromDate
      })), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Label"], {
        className: "mr-sm-2"
      }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_19__["globalResource"].To), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_15__["DatePicker"], {
        minDate: fromDate,
        maxDate: this.nowString,
        date: toDate,
        iconElement: react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("span", {
          className: "oi oi-calendar icon-calendar ml-1"
        }),
        onChange: this.handleChangeToDate
      })), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_14__["Button"], {
        outline: true,
        color: "primary",
        type: "button",
        onClick: this.handleClickSearch
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("span", {
        className: "oi oi-magnifying-glass"
      }), " Search")));
    }
  }]);

  return Filter;
}(react__WEBPACK_IMPORTED_MODULE_11__["Component"]);

function mapStateToProps(state) {
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, {
    pagingOption: state.pagingOption,
    baseCurrencyList: state.baseCurrencyList,
    isProduction: state.isProduction,
    today: state.today,
    param: state.param
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_13__["bindActionCreators"])({
    setReportTitle: _actions__WEBPACK_IMPORTED_MODULE_16__["setReportTitle"],
    setParam: _actions__WEBPACK_IMPORTED_MODULE_16__["setParam"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_12__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/components/GridData.jsx":
/*!*****************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/components/GridData.jsx ***!
  \*****************************************************************************************/
/*! exports provided: GridData, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridData", function() { return GridData; });
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2__);
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
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @9softstudio/react-fixed-table-header */ "./node_modules/@9softstudio/react-fixed-table-header/dist/index.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _modules_numberFormat__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../modules/numberFormat */ "./Areas/Portal/www/source/js/modules/numberFormat.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/report/transfer-report/actions/index.js");
/* harmony import */ var _modules_globalResource__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../modules/globalResource */ "./Areas/Portal/www/source/js/modules/globalResource.js");
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../libs/constants */ "./Areas/Portal/www/source/js/pages/report/transfer-report/libs/constants.js");


















var GridData =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(GridData, _PureComponent);

  function GridData(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, GridData);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(GridData).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "handlePaging", function (index, size) {
      var newPaging = {
        PageIndex: index,
        PageSize: size
      };

      var newParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default()({}, _this.props.param, newPaging);

      _this.fetchData(newParam);
    });

    _this.state = {
      gridData: null,
      total: null
    };
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(GridData, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var param = this.props.param;

      if (!!param && param !== prevProps.param) {
        this.fetchData(param);
      }
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(param) {
        var data, MainData, Total, TotalItem;
        return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.props.toggleLoader(true);
                _context.next = 3;
                return this.props.fetchData(param);

              case 3:
                data = _context.sent;

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
                }

                this.props.toggleLoader(false);

              case 6:
              case "end":
                return _context.stop();
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
      return [react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Row"], {
        key: "thead-1"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colWidth: 50,
        rowSpan: "3",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].Index
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].Index), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colWidth: 100,
        rowSpan: "3",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].TransId
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].TransId), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colWidth: 120,
        rowSpan: "3",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].CreatedDateText
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].CreatedDateText), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colWidth: 90,
        rowSpan: "3",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].Status
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].Status), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colWidth: 90,
        rowSpan: "3",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].AffName
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].AffName), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colWidth: 120,
        rowSpan: "3",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].AffPlayerName
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].AffPlayerName), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colWidth: 100,
        rowSpan: "3",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].PlayerName
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].PlayerName), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colSpan: "5",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].Amount
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].Amount)), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Row"], {
        key: "thead-2"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].InAffPlayerCurrency
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].InAffPlayerCurrency), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        colSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].InPlayerCurrency
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].InPlayerCurrency), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        header: true,
        rowSpan: "2",
        colWidth: 120,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].BasedAmount
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["headerText"].BasedAmount)), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Row"], {
        key: "thead-2"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "p-0",
        header: true,
        colWidth: 50
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "p-0",
        header: true,
        colWidth: 120
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "p-0",
        header: true,
        colWidth: 50
      }), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "p-0",
        header: true,
        colWidth: 120
      }))];
    }
  }, {
    key: "_renderDataSection",
    value: function _renderDataSection(dataList) {
      var dataRows = [];

      if (dataList.length) {
        for (var i = 0; i < dataList.length; i++) {
          var dataItem = dataList[i];
          dataRows.push(this._buildDataRow(dataItem, i + 1));
        }
      } else {
        dataRows.push(react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Row"], {
          key: "no-info"
        }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
          className: "text-center",
          colSpan: "12"
        }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_16__["globalResource"].NoInfo)));
      }

      return dataRows;
    }
  }, {
    key: "_buildDataRow",
    value: function _buildDataRow(dataItem, index) {
      var isTotalRow = !dataItem.TransId;
      var affPlayerAmount = !isTotalRow && Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_14__["formatDecimal"])(dataItem.AffPlayerAmount);
      var amount = !isTotalRow && Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_14__["formatDecimal"])(dataItem.Amount);
      var basedAmount = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_14__["formatDecimal"])(dataItem.BasedAmount);
      return react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Row"], {
        key: "dataRow-".concat(index)
      }, isTotalRow ? react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_10__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-center",
        colSpan: "11",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_17__["totalText"]
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_17__["totalText"]), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-right font-weight-bold",
        title: basedAmount
      }, basedAmount)) : react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_10__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-center",
        title: index
      }, index), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-center",
        title: dataItem.TransId
      }, dataItem.TransId), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-center",
        title: dataItem.CreatedDateText
      }, dataItem.CreatedDateText), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-center",
        title: dataItem.Status
      }, dataItem.Status), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        title: dataItem.AffName
      }, dataItem.AffName), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        title: dataItem.AffPlayerName
      }, dataItem.AffPlayerName), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        title: dataItem.PlayerName
      }, dataItem.PlayerName), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-center",
        title: dataItem.AffPlayerCurrency
      }, dataItem.AffPlayerCurrency), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-right",
        title: affPlayerAmount
      }, affPlayerAmount), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-center",
        title: dataItem.PlayerCurrency
      }, dataItem.PlayerCurrency), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-right",
        title: amount
      }, amount), react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Cell"], {
        className: "text-right",
        title: basedAmount
      }, basedAmount)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          gridData = _this$state.gridData,
          total = _this$state.total;
      return gridData && react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement("div", {
        className: "table-responsive table-striped"
      }, react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_13__["Table"], {
        minWidth: 1000,
        autoWidth: true,
        bodyHeight: 300,
        header: this._renderHeader(),
        body: this._renderDataSection(gridData),
        footer: total && this._renderDataSection([total]),
        containerPadding: 20,
        isPaging: true,
        pageOption: this.props.pagingOption,
        onPaging: this.handlePaging
      }));
    }
  }]);

  return GridData;
}(react__WEBPACK_IMPORTED_MODULE_10__["PureComponent"]);

function mapStateToProps(_ref) {
  var pagingOption = _ref.pagingOption,
      param = _ref.param;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default()({}, {
    pagingOption: pagingOption,
    param: param
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_12__["bindActionCreators"])({
    setPagingOption: _actions__WEBPACK_IMPORTED_MODULE_15__["setPagingOption"],
    toggleLoader: _actions__WEBPACK_IMPORTED_MODULE_15__["toggleLoader"],
    setParam: _actions__WEBPACK_IMPORTED_MODULE_15__["setParam"],
    fetchData: _actions__WEBPACK_IMPORTED_MODULE_15__["fetchData"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_11__["connect"])(mapStateToProps, mapDispatchToProps)(GridData));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/index.jsx":
/*!***************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/index.jsx ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs3/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reducers */ "./Areas/Portal/www/source/js/pages/report/transfer-report/reducers/index.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/AppContainer */ "./Areas/Portal/www/source/js/pages/report/transfer-report/components/AppContainer.jsx");
/* harmony import */ var _modules_store__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../modules/store */ "./Areas/Portal/www/source/js/modules/store.js");












var App =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(App, _React$Component);

  function App(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, App);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(App).call(this, props));
    _this.store = Object(_modules_store__WEBPACK_IMPORTED_MODULE_10__["configureStore"])(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, window.initialState), _reducers__WEBPACK_IMPORTED_MODULE_8__["default"]);
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

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/libs/constants.js":
/*!***********************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/libs/constants.js ***!
  \***********************************************************************************/
/*! exports provided: totalText, reportName, mappingColumns, headerText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "totalText", function() { return totalText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportName", function() { return reportName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mappingColumns", function() { return mappingColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerText", function() { return headerText; });
var totalText = 'Total (all pages)';
var reportName = 'TRANSFER BALANCE FOR PLAYER REPORT ';
var mappingColumns = {
  Index: 'Index',
  TransId: 'TransId',
  Date: 'CreatedDateText',
  Affiliate: 'AffName',
  AffiliatePlayer: 'AffPlayerName',
  Player: 'PlayerName',
  AffPlayerCurrency: 'AffPlayerCurrency',
  AffPlayerAmount: 'AffPlayerAmount',
  Status: 'Status',
  PlayerCurrency: 'PlayerCurrency',
  Amount: 'Amount',
  BasedAmount: 'BasedAmount'
};
var headerText = {
  Index: '#',
  TransId: 'Transaction Id',
  CreatedDateText: 'Date',
  Status: 'Status',
  AffName: 'Affiliate',
  AffPlayerName: 'Aff.Payment Player',
  PlayerName: 'Player',
  Amount: 'Amount',
  BasedAmount: 'Base Currency',
  InAffPlayerCurrency: "In Aff Payment Player's Currency",
  InPlayerCurrency: "In Player's Currency"
};

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/libs/reportExcel.js":
/*!*************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/libs/reportExcel.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReportExcel; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator */ "./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_excel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../modules/excel */ "./Areas/Portal/www/source/js/modules/excel.js");
/* harmony import */ var _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../modules/excelStyleConstant */ "./Areas/Portal/www/source/js/modules/excelStyleConstant.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./Areas/Portal/www/source/js/pages/report/transfer-report/libs/constants.js");






var _subColSpanOfAmountCl;




var TITLE_ROW_INDEX = 0;
var HEADER_ROW_INDEX = 1;
var SUB_HEADER_ROW_INDEX = 2;
var DATA_ROW_INDEX = 3;
var configInfo = {
  TOTAL_COLUMN: 12,
  TOTAL_STATIC_COLUMN: 8,
  INDEX_AMOUNT_COLUMN: 7,
  COLSPAN_OF_AMOUNT_COLUMN: 5,
  INDEX_IN_AFF_PLAYER_CURRENCY: 7,
  INDEX_IN_PLAYER_CURRENCY: 9,
  COLSPAN_OF_IN_PLAYER_CURRENCY: 2,
  COLSPAN_OF_IN_AFF_PLAYER_CURRENCY: 2,
  INDEX_BASE_CURRENCY: 11,
  INDEX_OF_INDEX_COLUMN: 0
};
var subColSpanOfAmountCloumn = (_subColSpanOfAmountCl = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_subColSpanOfAmountCl, configInfo.INDEX_IN_AFF_PLAYER_CURRENCY, {
  isShowColumn: true,
  colIndex: configInfo.INDEX_IN_AFF_PLAYER_CURRENCY,
  colSpan: configInfo.COLSPAN_OF_IN_AFF_PLAYER_CURRENCY,
  colSpanHeaderText: _constants__WEBPACK_IMPORTED_MODULE_7__["headerText"].InAffPlayerCurrency
}), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_subColSpanOfAmountCl, configInfo.INDEX_IN_AFF_PLAYER_CURRENCY + 1, {
  isShowColumn: false
}), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_subColSpanOfAmountCl, configInfo.INDEX_IN_PLAYER_CURRENCY, {
  isShowColumn: true,
  colIndex: configInfo.INDEX_IN_PLAYER_CURRENCY,
  colSpan: configInfo.COLSPAN_OF_IN_PLAYER_CURRENCY,
  colSpanHeaderText: _constants__WEBPACK_IMPORTED_MODULE_7__["headerText"].InPlayerCurrency
}), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_subColSpanOfAmountCl, configInfo.INDEX_IN_PLAYER_CURRENCY + 1, {
  isShowColumn: false
}), _subColSpanOfAmountCl);
var MAIN_SECTION_STYLE = 'mainSectionStyle';
var TOTAL_SECTION_STYLE = 'totalSectionStyle';

var ReportExcel =
/*#__PURE__*/
function () {
  function ReportExcel(data, title) {
    var _this = this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ReportExcel);

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "_createDataRow", function (item, colIndexStart, style) {
      var totalStaticColumn = configInfo.TOTAL_COLUMN;

      for (var j = colIndexStart; j < totalStaticColumn; j++) {
        var address = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
          c: j,
          r: _this.currentRowIndex
        });
        _this.worksheet[address] = _this._buildDataColumn(item, style, j);
      }
    });

    this.worksheet = {};
    this.title = title;
    this.data = data;
    this.currentRowIndex = DATA_ROW_INDEX;
    this.mergeConfig = [];
    this.columnConfigs = this._getcolumnConfigs();
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ReportExcel, [{
    key: "export",
    value: function _export() {
      var _this2 = this;

      _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].process(function () {
        _this2._createTitle();

        _this2._createHeader();

        _this2._createBodyData();

        _this2._createTotalRow();

        _this2._createExcelConfig();

        _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].export(_this2.worksheet, _this2.title);
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
          c: configInfo.TOTAL_COLUMN - 1
        }
      });
      var address = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
        c: 0,
        r: TITLE_ROW_INDEX
      });
      this.worksheet[address] = {
        t: "s",
        v: this.title,
        s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["titleCellStyle"]
      };
    }
  }, {
    key: "_createHeader",
    value: function _createHeader() {
      var length = configInfo.TOTAL_STATIC_COLUMN;

      for (var i = 0; i < length; i++) {
        if (i === configInfo.INDEX_AMOUNT_COLUMN) {
          this._buildColspanColumn(HEADER_ROW_INDEX, configInfo.INDEX_AMOUNT_COLUMN, configInfo.COLSPAN_OF_AMOUNT_COLUMN, _constants__WEBPACK_IMPORTED_MODULE_7__["headerText"].Amount, subColSpanOfAmountCloumn);
        } else {
          var fieldName = this.columnConfigs[i].field;
          var address = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
            c: i,
            r: HEADER_ROW_INDEX
          });
          this.worksheet[address] = {
            t: "s",
            v: _constants__WEBPACK_IMPORTED_MODULE_7__["headerText"][fieldName],
            s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["headerCellStyle"]
          };
          var nextRowAddress = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
            c: i,
            r: HEADER_ROW_INDEX + 1
          });
          this.worksheet[nextRowAddress] = {
            t: "s",
            s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["mergedHeaderCellByRowspanStyle"]
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
    value: function _buildColspanColumn(rowIndex, colIndex, colSpan, colSpanHeaderText, subColSpans) {
      this._buildMergeColumn(rowIndex, colIndex, colSpan, colSpanHeaderText);

      var totalColumn = colIndex + colSpan;

      for (var i = colIndex; i < totalColumn; i++) {
        var subColSpan = subColSpans && subColSpans[i];

        if (!!subColSpan) {
          subColSpan.isShowColumn && this._buildMergeColumn(SUB_HEADER_ROW_INDEX, subColSpan.colIndex, subColSpan.colSpan, subColSpan.colSpanHeaderText);
        } else {
          var address = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
            c: i,
            r: rowIndex + 1
          });
          var fieldName = this.columnConfigs[i].field;
          this.worksheet[address] = {
            t: "s",
            v: _constants__WEBPACK_IMPORTED_MODULE_7__["headerText"][fieldName],
            s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["headerCellStyle"]
          };
        }
      }
    }
  }, {
    key: "_buildMergeColumn",
    value: function _buildMergeColumn(rowIndex, colIndex, colSpan, colSpanHeaderText) {
      var colSpanCellAddress = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
        c: colIndex,
        r: rowIndex
      });
      this.worksheet[colSpanCellAddress] = {
        t: "s",
        v: colSpanHeaderText,
        s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["headerCellStyle"]
      };

      for (var i = 1; i < colSpan; i++) {
        var nextCellAddress = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
          c: colIndex + i,
          r: rowIndex
        });
        this.worksheet[nextCellAddress] = {
          t: "s",
          s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["mergedHeaderCellByColspanStyle"]
        };
      }

      this.mergeConfig.push({
        s: {
          r: rowIndex,
          c: colIndex
        },
        e: {
          r: rowIndex,
          c: colIndex + colSpan - 1
        }
      });
    }
  }, {
    key: "_createBodyData",
    value: function _createBodyData() {
      var mainData = this.data.MainData;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_1___default()(mainData), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          this._createDataRow(item, configInfo.INDEX_OF_INDEX_COLUMN, MAIN_SECTION_STYLE);

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
      var itemTotal = this.data.Total;

      if (itemTotal) {
        this.mergeConfig.push({
          s: {
            r: this.currentRowIndex,
            c: 0
          },
          e: {
            r: this.currentRowIndex,
            c: configInfo.INDEX_BASE_CURRENCY - 1
          }
        });
        var addressTotal = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
          c: 0,
          r: this.currentRowIndex
        });
        this.worksheet[addressTotal] = {
          t: "s",
          v: _constants__WEBPACK_IMPORTED_MODULE_7__["totalText"],
          s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].center
        };

        this._createDataRow(itemTotal, configInfo.INDEX_BASE_CURRENCY, TOTAL_SECTION_STYLE);
      }
    }
  }, {
    key: "_buildDataColumn",
    value: function _buildDataColumn(item, sectionStyleName, colIndex) {
      var columnConfig = this.columnConfigs[colIndex];
      var fieldName = columnConfig.field;
      var value = fieldName === _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].Index ? this.currentRowIndex - 2 : item[columnConfig.field];
      return {
        t: _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellType(value),
        v: value,
        s: columnConfig[sectionStyleName]
      };
    }
  }, {
    key: "_createExcelConfig",
    value: function _createExcelConfig() {
      var _context;

      var cellStart = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
        r: 0,
        c: 0
      });
      var cellEnd = _modules_excel__WEBPACK_IMPORTED_MODULE_5__["default"].getCellAddress({
        r: this.currentRowIndex,
        c: configInfo.TOTAL_COLUMN
      });
      this.worksheet["!merges"] = this.mergeConfig;
      this.worksheet["!ref"] = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context = "".concat(cellStart, ":")).call(_context, cellEnd);
      var cols = [{
        wpx: 50
      }, {
        wpx: 150
      }, {
        wpx: 200
      }, {
        wpx: 150
      }, {
        wpx: 150
      }, {
        wpx: 150
      }, {
        wpx: 150
      }, {
        wpx: 100
      }, {
        wpx: 150
      }, {
        wpx: 100
      }, {
        wpx: 150
      }, {
        wpx: 150
      }];
      this.worksheet['!cols'] = cols;
    }
  }, {
    key: "_getcolumnConfigs",
    value: function _getcolumnConfigs() {
      var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12;

      return [(_ref = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].Index
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].default), _ref), (_ref2 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].TransId
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref2, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref2, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].default), _ref2), (_ref3 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].Date
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref3, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref3, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].default), _ref3), (_ref4 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].Status
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref4, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref4, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].default), _ref4), (_ref5 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].Affiliate
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref5, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref5, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].default), _ref5), (_ref6 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].AffiliatePlayer
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref6, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref6, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].default), _ref6), (_ref7 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].Player
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref7, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref7, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].default), _ref7), (_ref8 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].AffPlayerCurrency
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref8, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref8, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].default), _ref8), (_ref9 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].AffPlayerAmount
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref9, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref9, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].decimal), _ref9), (_ref10 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].PlayerCurrency
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref10, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref10, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].default), _ref10), (_ref11 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].Amount
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref11, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref11, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].decimal), _ref11), (_ref12 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_7__["mappingColumns"].BasedAmount
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref12, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_ref12, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["totalCellStyle"].decimal), _ref12)];
    }
  }]);

  return ReportExcel;
}();



/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/transfer-report/reducers/index.js":
/*!***********************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/transfer-report/reducers/index.js ***!
  \***********************************************************************************/
/*! exports provided: reportTitle, param, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportTitle", function() { return reportTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "param", function() { return param; });
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
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions/types */ "./Areas/Portal/www/source/js/pages/report/transfer-report/actions/types.js");




var _context, _context2;






var baseCurrencyList = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])([], {});
var now = new Date();

var defaultToday = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_2___default()(_context = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_2___default()(_context2 = "".concat(now.getMonth(), "/")).call(_context2, now.getDate(), "/")).call(_context, now.getFullYear());

var today = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(defaultToday, {});
var isProduction = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(false, {});
var reportTitle = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])('', _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_REPORT_TITLE"], function (prevState, action) {
  return action.data;
}));
var param = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(null, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_PARAM"], function (prevState, action) {
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, prevState, action.data);
}));
/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_3__["combineReducers"])({
  param: param,
  today: today,
  isProduction: isProduction,
  reportTitle: reportTitle,
  isShowLoader: _reducers_loaderReducer__WEBPACK_IMPORTED_MODULE_5__["isShowLoader"],
  pagingOption: _reducers_pagingReducer__WEBPACK_IMPORTED_MODULE_4__["pagingOption"],
  baseCurrencyList: baseCurrencyList
}));

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
//# sourceMappingURL=8-9f0f4eacfa5664e229dd.chunk.js.map