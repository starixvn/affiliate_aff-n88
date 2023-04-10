(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/actions/index.js":
/*!************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/actions/index.js ***!
  \************************************************************************************/
/*! exports provided: setPagingOption, setReportTitle, setParam, setProductList, fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReportTitle", function() { return setReportTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParam", function() { return setParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setProductList", function() { return setProductList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/actions/types.js");
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
var setProductList = function setProductList(data) {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_2__["SET_PRODUCT_LIST"],
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
              url = 'Portal/PlayerGgrReport/GetPlayerGgrReportData';
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

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/actions/types.js":
/*!************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/actions/types.js ***!
  \************************************************************************************/
/*! exports provided: SET_PARAM, SET_REPORT_TITLE, SET_PRODUCT_LIST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PARAM", function() { return SET_PARAM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REPORT_TITLE", function() { return SET_REPORT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_PRODUCT_LIST", function() { return SET_PRODUCT_LIST; });
var SET_PARAM = 'PLAYER_GGR_REPORT_SET_PARAM';
var SET_REPORT_TITLE = 'PLAYER_GGR_REPORT_SET_REPORT_TITLE';
var SET_PRODUCT_LIST = 'PLAYER_GGR_REPORT_SET_PRODUCT_LIST';

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/AppContainer.jsx":
/*!***********************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/AppContainer.jsx ***!
  \***********************************************************************************************/
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
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/Filter.jsx");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Content */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/Content.jsx");
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

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/Content.jsx":
/*!******************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/Content.jsx ***!
  \******************************************************************************************/
/*! exports provided: Content, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return Content; });
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
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
/* harmony import */ var _GridData__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./GridData */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/GridData.jsx");
/* harmony import */ var _components_ReportTitle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../components/ReportTitle */ "./Areas/Portal/www/source/js/components/ReportTitle.jsx");
/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../actions/loaderAction */ "./Areas/Portal/www/source/js/actions/loaderAction.js");
/* harmony import */ var _libs_reportExcel__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../libs/reportExcel */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/libs/reportExcel.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/actions/index.js");



















var Content =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default()(Content, _Component);

  function Content(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Content);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Content).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleExportExcel",
    /*#__PURE__*/
    _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
    /*#__PURE__*/
    _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var _this$props, param, reportTitle, productList, newParam, data, reportExcel;

      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.props.toggleLoader(true);

              _this$props = _this.props, param = _this$props.param, reportTitle = _this$props.reportTitle, productList = _this$props.productList;
              newParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default()({}, param, {
                IsExportExcel: true
              });
              _context.next = 5;
              return _this.props.fetchData(newParam);

            case 5:
              data = _context.sent;

              if (data) {
                reportExcel = new _libs_reportExcel__WEBPACK_IMPORTED_MODULE_17__["default"](data, reportTitle, _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_1___default()(productList).call(productList, function (p) {
                  return p.checked;
                }));
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

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Content, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var reportTitle = this.props.reportTitle;
      return nextProps.reportTitle !== reportTitle;
    }
  }, {
    key: "_buildReportTitle",
    value: function _buildReportTitle() {
      var reportTitle = this.props.reportTitle;
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "d-flex align-items-center"
      }, reportTitle, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("button", {
        type: "button",
        className: "ml-auto btn btn-link btn-excel",
        onClick: this.handleExportExcel,
        title: "Export Excel"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("span", {
        className: "oi icon-excel"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var reportTitle = this.props.reportTitle;
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "data-content my-2 report-content-container"
      }, reportTitle && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_components_ReportTitle__WEBPACK_IMPORTED_MODULE_15__["default"], {
        content: this._buildReportTitle()
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_GridData__WEBPACK_IMPORTED_MODULE_14__["default"], null));
    }
  }]);

  return Content;
}(react__WEBPACK_IMPORTED_MODULE_11__["Component"]);

function mapStateToProps(_ref2) {
  var reportTitle = _ref2.reportTitle,
      param = _ref2.param,
      productList = _ref2.productList;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default()({}, {
    reportTitle: reportTitle,
    param: param,
    productList: productList
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_13__["bindActionCreators"])({
    toggleLoader: _actions_loaderAction__WEBPACK_IMPORTED_MODULE_16__["toggleLoader"],
    fetchData: _actions__WEBPACK_IMPORTED_MODULE_18__["fetchData"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_12__["connect"])(mapStateToProps, mapDispatchToProps)(Content));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/Filter.jsx":
/*!*****************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/Filter.jsx ***!
  \*****************************************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/every */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/every.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs3/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5__);
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
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @9softstudio/react-datepicker */ "./node_modules/@9softstudio/react-datepicker/dist/index.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/actions/index.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../modules/utils */ "./Areas/Portal/www/source/js/modules/utils.js");
/* harmony import */ var _modules_constants__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../modules/constants */ "./Areas/Portal/www/source/js/modules/constants.js");
/* harmony import */ var _modules_globalResource__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../modules/globalResource */ "./Areas/Portal/www/source/js/modules/globalResource.js");
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../libs/constants */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/libs/constants.js");
























var Filter =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_11___default()(Filter, _Component);

  function Filter(props) {
    var _context, _context2, _context3, _context4;

    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, Filter);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(Filter).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handlePressEnter", function (event) {
      if (event.charCode === 13) {
        event.preventDefault();

        _this.handleClickSearch();
      }
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChangeFromDate", function (momentDate) {
      _this.setState(function (prevState) {
        return Object(_modules_utils__WEBPACK_IMPORTED_MODULE_20__["handleAfterChangeFromDate"])(momentDate, prevState.toDate, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["sixMonth"]);
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChangeToDate", function (momentDate) {
      _this.setState(function (prevState) {
        return Object(_modules_utils__WEBPACK_IMPORTED_MODULE_20__["handleAfterChangeToDate"])(momentDate, prevState.fromDate, _modules_constants__WEBPACK_IMPORTED_MODULE_21__["sixMonth"]);
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChangeProduct", function (item, selectedProductList) {
      _this.setState(function (_ref) {
        var productList = _ref.productList;
        return {
          selectedProductList: selectedProductList,
          productList: Object(_modules_utils__WEBPACK_IMPORTED_MODULE_20__["handleChangeMultipleSelected"])(productList, selectedProductList)
        };
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleChange", function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;

      _this.setState(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()({}, name, value));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_12___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_10___default()(_this), "handleClickSearch", function () {
      var _this$state = _this.state,
          selectedProductList = _this$state.selectedProductList,
          selectedBaseCurrency = _this$state.selectedBaseCurrency,
          fromDate = _this$state.fromDate,
          toDate = _this$state.toDate,
          affName = _this$state.affName,
          playerName = _this$state.playerName,
          productList = _this$state.productList;
      var pagingOption = _this.props.pagingOption;

      _this._updateReportTitle();

      var param = {
        AffName: affName,
        PlayerName: playerName,
        FromDate: fromDate,
        ToDate: toDate,
        BaseCurrencyId: Number(selectedBaseCurrency),
        ProductIds: selectedProductList,
        PageIndex: 1,
        PageSize: pagingOption.PageSize
      };

      _this.props.setProductList(productList);

      _this.props.setParam(param);
    });

    var _this$props = _this.props,
        today = _this$props.today,
        _productList = _this$props.productList,
        baseCurrencyList = _this$props.baseCurrencyList;
    var now = new Date(today);
    var currentMonth = now.getMonth() + 1;
    var currentYear = now.getFullYear();
    _this.nowString = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context2 = "".concat(currentMonth, "/")).call(_context2, now.getDate(), "/")).call(_context, currentYear);
    var initialState = {
      affName: '',
      playerName: '',
      fromDate: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context3 = "".concat(currentMonth, "/01/")).call(_context3, currentYear),
      toDate: _this.nowString,
      productList: _productList,
      selectedProductList: _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_4___default()(_context4 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default()(_productList).call(_productList, function (item) {
        return item.checked;
      })).call(_context4, function (item) {
        return item.key;
      }).join(','),
      selectedBaseCurrency: baseCurrencyList.length && baseCurrencyList[0].ExchangeId || _modules_constants__WEBPACK_IMPORTED_MODULE_21__["defaultBaseCurrency"],
      isFromAffReport: false
    };
    var paramFromAffReport = Object(_modules_utils__WEBPACK_IMPORTED_MODULE_20__["getCookie"])('paramFromAffReport');

    if (paramFromAffReport !== '') {
      var param = JSON.parse(paramFromAffReport);
      initialState = _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_2___default()({}, initialState, {
        affName: param.affName,
        fromDate: param.fromDate,
        productList: Object(_modules_utils__WEBPACK_IMPORTED_MODULE_20__["handleChangeMultipleSelected"])(_productList, param.productIds),
        selectedProductList: param.productIds,
        selectedBaseCurrency: param.baseCurrencyId,
        isFromAffReport: true
      });
      var toDate = new Date(param.toDate);
      var maxDateOfMonth = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0);

      if (maxDateOfMonth < now) {
        var _context5, _context6;

        initialState.toDate = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context5 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context6 = "".concat(maxDateOfMonth.getMonth() + 1, "/")).call(_context6, maxDateOfMonth.getDate(), "/")).call(_context5, maxDateOfMonth.getFullYear());
      }
    }

    _this.state = initialState;
    document.cookie = "paramFromAffReport=; path=".concat(Object(_modules_utils__WEBPACK_IMPORTED_MODULE_20__["resolveClientUrl"])('Portal/PlayerGgrReport'));
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(Filter, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.state.isFromAffReport && this.handleClickSearch();
    }
  }, {
    key: "_updateReportTitle",
    value: function _updateReportTitle() {
      var reportTitle = this._buildReportTitle();

      this.props.setReportTitle(reportTitle);
    }
  }, {
    key: "_buildReportTitle",
    value: function _buildReportTitle() {
      var _context7, _context8, _context9, _context10, _context11, _context12, _context13, _context14;

      var baseCurrencyList = this.props.baseCurrencyList;
      var _this$state2 = this.state,
          fromDate = _this$state2.fromDate,
          toDate = _this$state2.toDate,
          affName = _this$state2.affName,
          playerName = _this$state2.playerName,
          selectedBaseCurrency = _this$state2.selectedBaseCurrency,
          productList = _this$state2.productList;
      var affNameTitle = "".concat(affName && '- Affiliate contains \'' + affName + '\'');
      var playerNameTitle = "".concat(playerName && '- Player contains \'' + playerName + '\'');
      var productName = _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_1___default()(productList).call(productList, function (p) {
        return p.checked;
      }) ? 'All Products' : _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_4___default()(_context7 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default()(productList).call(productList, function (p) {
        return p.checked;
      })).call(_context7, function (p) {
        return p.name;
      }).join(',');

      var fromToTitle = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context8 = "FROM ".concat(fromDate, " TO ")).call(_context8, toDate);

      var baseCurrency = _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_4___default()(_context9 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default()(baseCurrencyList).call(baseCurrencyList, function (x) {
        return x.ExchangeId == selectedBaseCurrency;
      })).call(_context9, function (b) {
        return b.Code;
      }).join(',');

      return _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context10 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context11 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context12 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context13 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_5___default()(_context14 = "".concat(_libs_constants__WEBPACK_IMPORTED_MODULE_23__["reportName"])).call(_context14, affNameTitle)).call(_context13, playerNameTitle, " - ")).call(_context12, productName, " - ")).call(_context11, fromToTitle, " - Base Currency ")).call(_context10, baseCurrency);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          baseCurrencyList = _this$props2.baseCurrencyList,
          isProduction = _this$props2.isProduction;
      var _this$state3 = this.state,
          productList = _this$state3.productList,
          selectedBaseCurrency = _this$state3.selectedBaseCurrency,
          fromDate = _this$state3.fromDate,
          toDate = _this$state3.toDate,
          affName = _this$state3.affName,
          playerName = _this$state3.playerName;
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
        name: "affName",
        id: "Affiliate",
        maxLength: "30",
        onKeyPress: this.handlePressEnter,
        onChange: this.handleChange,
        value: affName
      })), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        for: "Player",
        className: "mr-sm-2"
      }, "Player"), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Input"], {
        type: "text",
        name: "playerName",
        id: "Player",
        maxLength: "30",
        onKeyPress: this.handlePressEnter,
        onChange: this.handleChange,
        value: playerName
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
      }, _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_4___default()(baseCurrencyList).call(baseCurrencyList, function (c) {
        return react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("option", {
          key: c.ExchangeId,
          value: c.ExchangeId
        }, c.Code);
      }), !isProduction && react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("option", {
        value: "20"
      }, "UUS"))), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2",
        style: {
          width: 175
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
      })), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        className: "mr-sm-2"
      }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_22__["globalResource"].From), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_18__["DatePicker"], {
        minDate: _modules_constants__WEBPACK_IMPORTED_MODULE_21__["minDate"],
        maxDate: this.nowString,
        date: fromDate,
        iconElement: react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("span", {
          className: "oi oi-calendar icon-calendar ml-1"
        }),
        onChange: this.handleChangeFromDate
      })), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["FormGroup"], {
        className: "my-sm-1 mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Label"], {
        className: "mr-sm-2"
      }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_22__["globalResource"].To), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_18__["DatePicker"], {
        minDate: fromDate,
        maxDate: this.nowString,
        date: toDate,
        iconElement: react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("span", {
          className: "oi oi-calendar icon-calendar ml-1"
        }),
        onChange: this.handleChangeToDate
      })), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_16__["Button"], {
        outline: true,
        color: "primary",
        type: "button",
        onClick: this.handleClickSearch
      }, react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("span", {
        className: "oi oi-magnifying-glass"
      }), " Search")), react__WEBPACK_IMPORTED_MODULE_13___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: _libs_constants__WEBPACK_IMPORTED_MODULE_23__["NOTE"]
        }
      }));
    }
  }]);

  return Filter;
}(react__WEBPACK_IMPORTED_MODULE_13__["Component"]);

function mapStateToProps(state) {
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, {
    productList: state.productList,
    pagingOption: state.pagingOption,
    baseCurrencyList: state.baseCurrencyList,
    isProduction: state.isProduction,
    today: state.today,
    param: state.param
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_15__["bindActionCreators"])({
    setReportTitle: _actions__WEBPACK_IMPORTED_MODULE_19__["setReportTitle"],
    setParam: _actions__WEBPACK_IMPORTED_MODULE_19__["setParam"],
    setProductList: _actions__WEBPACK_IMPORTED_MODULE_19__["setProductList"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_14__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/GridData.jsx":
/*!*******************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/GridData.jsx ***!
  \*******************************************************************************************/
/*! exports provided: GridData, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GridData", function() { return GridData; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs3/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "./node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @9softstudio/react-fixed-table-header */ "./node_modules/@9softstudio/react-fixed-table-header/dist/index.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _modules_numberFormat__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../modules/numberFormat */ "./Areas/Portal/www/source/js/modules/numberFormat.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/actions/index.js");
/* harmony import */ var _actions_loaderAction__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../actions/loaderAction */ "./Areas/Portal/www/source/js/actions/loaderAction.js");
/* harmony import */ var _modules_globalResource__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../../modules/globalResource */ "./Areas/Portal/www/source/js/modules/globalResource.js");
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../libs/constants */ "./Areas/Portal/www/source/js/pages/report/libs/constants.js");
/* harmony import */ var _libs_constants__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../libs/constants */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/libs/constants.js");























var GridData =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_10___default()(GridData, _PureComponent);

  function GridData(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5___default()(this, GridData);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_7___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_8___default()(GridData).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_9___default()(_this), "_renderProductColumns", function (index) {
      return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_12___default.a.Fragment, {
        key: index
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("th", {
        width: 100,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].Turnover
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].Turnover), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("th", {
        width: 100,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].Ggr
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].Ggr));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_9___default()(_this), "handlePaging", function (index, size) {
      var newPaging = {
        PageIndex: index,
        PageSize: size
      };

      var newParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, _this.props.param, newPaging);

      _this.fetchData(newParam);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_9___default()(_this), "_getMinWidthOfTable", function (numberOfProduct) {
      var minWidth = 600 + numberOfProduct * 2 * 100;
      return minWidth;
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_11___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_9___default()(_this), "_resetScroll", function () {
      if (!!_this.tableRef.current) {
        _this.tableRef.current.scrollTop = 0;
        _this.tableRef.current.scrollLeft = 0;
      }
    });

    _this.state = {
      gridData: null,
      total: null
    };
    _this.tableRef = Object(react__WEBPACK_IMPORTED_MODULE_12__["createRef"])();
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(GridData, [{
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
      var _fetchData = _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(param) {
        var data, MainData, Total, TotalItem;
        return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._resetScroll();

                this.props.toggleLoader(true);
                _context.next = 4;
                return this.props.fetchData(param);

              case 4:
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

              case 7:
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
    value: function _renderHeader(selectedProducts) {
      var _this2 = this;

      return [react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("tr", {
        className: "freeze-row freeze-row-h1",
        key: "thead-1"
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("th", {
        className: "freeze-column-header freeze-column-header-0",
        width: 120,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].AffName
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].AffName), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("th", {
        className: "freeze-column-header freeze-column-header-1",
        width: 120,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].PlayerName
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].PlayerName), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("th", {
        width: 120,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].RegistrationDateText
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].RegistrationDateText), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("th", {
        width: 120,
        rowSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].FdmDateText
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].FdmDateText), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("th", {
        width: 200,
        colSpan: "2",
        height: 28,
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].AllSelectedProducts
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_22__["headerText"].AllSelectedProducts), _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default()(selectedProducts).call(selectedProducts, function (item) {
        return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("th", {
          key: item.key,
          width: 200,
          colSpan: "2",
          title: item.name
        }, item.name);
      })), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("tr", {
        className: "freeze-row freeze-row-h2",
        key: "thead-2"
      }, this._renderProductColumns('totalProduct'), _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default()(selectedProducts).call(selectedProducts, function (item, index) {
        return _this2._renderProductColumns(index);
      }))];
    }
  }, {
    key: "_renderDataSection",
    value: function _renderDataSection(dataList, selectedProducts) {
      var dataRows = [];

      if (dataList.length) {
        for (var i = 0; i < dataList.length; i++) {
          var dataItem = dataList[i];
          dataRows.push(this._buildDataRow(dataItem, i, selectedProducts));
        }
      } else {
        dataRows.push(react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("tr", {
          key: "no-info"
        }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
          className: "text-center",
          colSpan: 6 + selectedProducts.length * 2
        }, _modules_globalResource__WEBPACK_IMPORTED_MODULE_20__["globalResource"].NoInfo)));
      }

      return dataRows;
    }
  }, {
    key: "_buildDataRow",
    value: function _buildDataRow(dataItem, index, selectedProducts) {
      var isTotalRow = !dataItem.AffName && !dataItem.PlayerName;
      var totalTurnover = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_17__["formatDecimal"])(dataItem.TotalTurnover);
      var totalGgr = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_17__["formatDecimal"])(dataItem.TotalGgr);
      return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("tr", {
        key: "dataRow-".concat(index)
      }, isTotalRow ? react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
        className: "freeze-column freeze-column-0 text-right",
        colSpan: "2",
        title: _libs_constants__WEBPACK_IMPORTED_MODULE_22__["totalText"]
      }, _libs_constants__WEBPACK_IMPORTED_MODULE_22__["totalText"]) : react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_12__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
        className: "freeze-column freeze-column-0",
        title: dataItem.AffName
      }, dataItem.AffName), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
        className: "freeze-column freeze-column-1",
        title: dataItem.PlayerName
      }, dataItem.PlayerName)), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
        className: "text-center",
        title: dataItem.RegistrationDateText
      }, dataItem.RegistrationDateText), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
        className: "text-center",
        title: dataItem.FdmDateText
      }, dataItem.FdmDateText), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
        className: "text-right font-weight-bold",
        title: totalTurnover
      }, totalTurnover), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
        className: "text-right font-weight-bold",
        title: totalGgr
      }, totalGgr), this._buildProductCells(dataItem.ProductReportList, selectedProducts));
    }
  }, {
    key: "_buildProductCells",
    value: function _buildProductCells(productReportList, selectedProducts) {
      return _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default()(selectedProducts).call(selectedProducts, function (item) {
        var info = productReportList[item.key] || _libs_constants__WEBPACK_IMPORTED_MODULE_22__["defaultGgrProductReport"];
        var turnover = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_17__["formatDecimal"])(info.Turnover);
        var ggr = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_17__["formatDecimal"])(info.Ggr);
        return react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_12___default.a.Fragment, {
          key: item.key
        }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
          className: "text-right",
          title: turnover
        }, turnover), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("td", {
          className: "text-right",
          title: ggr
        }, ggr));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _context2;

      var _this$state = this.state,
          gridData = _this$state.gridData,
          total = _this$state.total;

      var selectedProducts = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_0___default()(_context2 = this.props.productList).call(_context2, function (p) {
        return p.checked;
      });

      var minWidth = this._getMinWidthOfTable(selectedProducts.length);

      var maxHeight = Object(_libs_constants__WEBPACK_IMPORTED_MODULE_21__["getMaxHeight"])();
      return gridData && react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_12__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("div", {
        className: "table-responsive ggr-report-table-container",
        style: {
          'max-height': maxHeight
        },
        ref: this.tableRef
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_15__["Table"], {
        className: "freeze-table",
        style: {
          minWidth: minWidth
        }
      }, react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("thead", null, this._renderHeader(selectedProducts)), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("tbody", null, this._renderDataSection(gridData, selectedProducts)), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement("tfoot", null, total && this._renderDataSection([total], selectedProducts)))), react__WEBPACK_IMPORTED_MODULE_12___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_16__["Pager"], {
        pageOption: this.props.pagingOption,
        onPaging: this.handlePaging
      }));
    }
  }]);

  return GridData;
}(react__WEBPACK_IMPORTED_MODULE_12__["PureComponent"]);

function mapStateToProps(_ref) {
  var pagingOption = _ref.pagingOption,
      param = _ref.param,
      productList = _ref.productList;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, {
    pagingOption: pagingOption,
    param: param,
    productList: productList
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_14__["bindActionCreators"])({
    setPagingOption: _actions__WEBPACK_IMPORTED_MODULE_18__["setPagingOption"],
    toggleLoader: _actions_loaderAction__WEBPACK_IMPORTED_MODULE_19__["toggleLoader"],
    setParam: _actions__WEBPACK_IMPORTED_MODULE_18__["setParam"],
    fetchData: _actions__WEBPACK_IMPORTED_MODULE_18__["fetchData"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_13__["connect"])(mapStateToProps, mapDispatchToProps)(GridData));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/index.jsx":
/*!*****************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/index.jsx ***!
  \*****************************************************************************/
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
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reducers */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/reducers/index.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/AppContainer */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/components/AppContainer.jsx");
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
    var productList = window.initialState.productList;
    var newProductList = Object(_modules_utils__WEBPACK_IMPORTED_MODULE_11__["convertListToMutilpleSelected"])(productList, 'ProductId', 'ProductName');
    _this.store = Object(_modules_store__WEBPACK_IMPORTED_MODULE_10__["configureStore"])(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, window.initialState, {
      productList: newProductList
    }), _reducers__WEBPACK_IMPORTED_MODULE_8__["default"]);
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

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/libs/constants.js":
/*!*************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/libs/constants.js ***!
  \*************************************************************************************/
/*! exports provided: totalText, reportName, mappingColumns, headerText, defaultGgrProductReport, NOTE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "totalText", function() { return totalText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportName", function() { return reportName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mappingColumns", function() { return mappingColumns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerText", function() { return headerText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultGgrProductReport", function() { return defaultGgrProductReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOTE", function() { return NOTE; });
var totalText = 'Total';
var reportName = 'PLAYER GGR REPORT ';
var mappingColumns = {
  AffName: 'AffName',
  PlayerName: 'PlayerName',
  RegistrationDateText: 'RegistrationDateText',
  FdmDateText: 'FdmDateText',
  AllSelectedProducts: 'AllSelectedProducts',
  TotalTurnover: 'TotalTurnover',
  TotalGgr: 'TotalGgr',
  Turnover: 'Turnover',
  Ggr: 'Ggr'
};
var headerText = {
  AffName: 'Affiliate',
  PlayerName: 'Player',
  RegistrationDateText: 'Registration Date',
  FdmDateText: 'FDM Date',
  AllSelectedProducts: 'All Selected Products',
  TotalTurnover: 'Turnover',
  TotalGgr: 'GGR',
  Turnover: 'Turnover',
  Ggr: 'GGR'
};
var defaultGgrProductReport = {
  Turnover: 0,
  Ggr: 0
};
var NOTE = '<strong class="text-danger">*</strong> Note: The GGR of the P2P Fixed Rate product are actually the Revenue amounts which are used to calculated the Revenue Share for P2P Products.';

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/libs/reportExcel.js":
/*!***************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/libs/reportExcel.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReportExcel; });
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs3/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator */ "./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _modules_excel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../modules/excel */ "./Areas/Portal/www/source/js/modules/excel.js");
/* harmony import */ var _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../modules/excelStyleConstant */ "./Areas/Portal/www/source/js/modules/excelStyleConstant.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./constants */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/libs/constants.js");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../modules/utils */ "./Areas/Portal/www/source/js/modules/utils.js");











var TITLE_ROW_INDEX = 0;
var HEADER_ROW_INDEX = 1;
var DATA_ROW_INDEX = 3;
var configInfo = {
  TOTAL_STATIC_COLUMN: 6,
  INDEX_ALL_SELECT_PRODUCT_COLUMN: 4,
  INDEX_DYNAMIC_PRODUCT_COLUMN: 5,
  INDEX_TOTAL_TURNOVER_COLUMN: 4,
  INDEX_AFFILIATE_COLUMN: 0,
  INDEX_PLAYER_COLUMN: 1,
  INDEX_REGISTRATION_DATE_COLUMN: 2,
  COLSPAN_OF_ONE_PRODUCT: 2
};
var MAIN_SECTION_STYLE = 'mainSectionStyle';
var TOTAL_SECTION_STYLE = 'totalSectionStyle';

var ReportExcel =
/*#__PURE__*/
function () {
  function ReportExcel(data, title, selectedProductList) {
    var _this = this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, ReportExcel);

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(this, "_createDataRow", function (item, colIndexStart, style) {
      var _context;

      var totalStaticColumn = configInfo.TOTAL_STATIC_COLUMN;

      for (var j = colIndexStart; j < totalStaticColumn; j++) {
        var address = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
          c: j,
          r: _this.currentRowIndex
        });
        _this.worksheet[address] = _this._buildDataColumn(item, style, j);
      }

      var indexDynamicColumn = 0;

      _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3___default()(_context = _this.selectedProductList).call(_context, function (product) {
        var productInfo = item.ProductReportList[product.key] || _constants__WEBPACK_IMPORTED_MODULE_9__["defaultGgrProductReport"];

        for (var _j = 0; _j < configInfo.COLSPAN_OF_ONE_PRODUCT; _j++) {
          var colIndex = totalStaticColumn + indexDynamicColumn;

          var _address = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
            c: colIndex,
            r: _this.currentRowIndex
          });

          _this.worksheet[_address] = _this._buildDataColumn(productInfo, style, colIndex);
          indexDynamicColumn++;
        }
      });
    });

    this.worksheet = {};
    this.title = title;
    this.data = data;
    this.currentRowIndex = DATA_ROW_INDEX;
    this.mergeConfig = [];
    this.selectedProductList = selectedProductList;
    this.columnConfigs = this._getcolumnConfigs(selectedProductList);
    this.TotalColumn = configInfo.TOTAL_STATIC_COLUMN + selectedProductList.length * configInfo.COLSPAN_OF_ONE_PRODUCT;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(ReportExcel, [{
    key: "export",
    value: function _export() {
      var _this2 = this;

      _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].process(function () {
        _this2._createTitle();

        _this2._createHeader();

        _this2._createBodyData();

        _this2._createTotalRow();

        _this2._createExcelConfig();

        _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].export(_this2.worksheet, _constants__WEBPACK_IMPORTED_MODULE_9__["reportName"] + ' - ' + Object(_modules_utils__WEBPACK_IMPORTED_MODULE_10__["formatDateTime"])(new Date(), 'MM.dd.yyyy hh.mm.ss'));
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
          c: this.TotalColumn - 1
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
      var length = configInfo.TOTAL_STATIC_COLUMN - 1 + this.selectedProductList.length;

      for (var i = 0; i < length; i++) {
        if (i === configInfo.INDEX_ALL_SELECT_PRODUCT_COLUMN) {
          this._buildColspanColumn(HEADER_ROW_INDEX, configInfo.INDEX_TOTAL_TURNOVER_COLUMN, configInfo.COLSPAN_OF_ONE_PRODUCT, _constants__WEBPACK_IMPORTED_MODULE_9__["headerText"].AllSelectedProducts);
        } else if (i > configInfo.INDEX_ALL_SELECT_PRODUCT_COLUMN) {
          var index = i - configInfo.INDEX_DYNAMIC_PRODUCT_COLUMN;
          var productInfo = this.selectedProductList[index];
          var indexTurnoverColumnOfProduct = configInfo.TOTAL_STATIC_COLUMN + index * configInfo.COLSPAN_OF_ONE_PRODUCT;

          this._buildColspanColumn(HEADER_ROW_INDEX, indexTurnoverColumnOfProduct, configInfo.COLSPAN_OF_ONE_PRODUCT, productInfo.name);
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
          v: _constants__WEBPACK_IMPORTED_MODULE_9__["headerText"][fieldName],
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
        for (var _iterator = _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_2___default()(mainData), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          this._createDataRow(item, configInfo.INDEX_AFFILIATE_COLUMN, MAIN_SECTION_STYLE);

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
            c: configInfo.INDEX_PLAYER_COLUMN
          }
        });
        var addressTotal = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
          c: 0,
          r: this.currentRowIndex
        });
        this.worksheet[addressTotal] = {
          t: "s",
          v: _constants__WEBPACK_IMPORTED_MODULE_9__["totalText"],
          s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].right
        };

        this._createDataRow(itemTotal, configInfo.INDEX_REGISTRATION_DATE_COLUMN, TOTAL_SECTION_STYLE);
      }
    }
  }, {
    key: "_buildDataColumn",
    value: function _buildDataColumn(item, sectionStyleName, colIndex) {
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
      var _context2, _context3;

      var cellStart = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
        r: 0,
        c: 0
      });
      var cellEnd = _modules_excel__WEBPACK_IMPORTED_MODULE_7__["default"].getCellAddress({
        r: this.currentRowIndex,
        c: this.TotalColumn
      });
      this.worksheet["!merges"] = this.mergeConfig;
      this.worksheet["!ref"] = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1___default()(_context2 = "".concat(cellStart, ":")).call(_context2, cellEnd);
      var cols = [{
        wpx: 100
      }, {
        wpx: 100
      }, {
        wpx: 150
      }, {
        wpx: 150
      }, {
        wpx: 100
      }, {
        wpx: 100
      }];

      _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3___default()(_context3 = this.selectedProductList).call(_context3, function (item) {
        cols.push({
          wpx: 100
        }, {
          wpx: 100
        });
      });

      this.worksheet['!cols'] = cols;
    }
  }, {
    key: "_getcolumnConfigs",
    value: function _getcolumnConfigs(selectedProductList) {
      var _ref, _ref2, _ref3, _ref4, _ref5, _ref6;

      var styleOfColumnTotal = _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal, {
        font: {
          bold: true
        }
      });

      var columnConfigList = [(_ref = {
        field: _constants__WEBPACK_IMPORTED_MODULE_9__["mappingColumns"].AffName
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].default), _ref), (_ref2 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_9__["mappingColumns"].PlayerName
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref2, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref2, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].default), _ref2), (_ref3 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_9__["mappingColumns"].RegistrationDateText
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref3, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref3, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].default), _ref3), (_ref4 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_9__["mappingColumns"].FdmDateText
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref4, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref4, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].default), _ref4), (_ref5 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_9__["mappingColumns"].TotalTurnover
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref5, MAIN_SECTION_STYLE, styleOfColumnTotal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref5, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref5), (_ref6 = {
        field: _constants__WEBPACK_IMPORTED_MODULE_9__["mappingColumns"].TotalGgr
      }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref6, MAIN_SECTION_STYLE, styleOfColumnTotal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_ref6, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _ref6)];

      _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3___default()(selectedProductList).call(selectedProductList, function (item) {
        var _columnConfigList$pus, _columnConfigList$pus2;

        columnConfigList.push((_columnConfigList$pus = {
          field: _constants__WEBPACK_IMPORTED_MODULE_9__["mappingColumns"].Turnover
        }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_columnConfigList$pus, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_columnConfigList$pus, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _columnConfigList$pus), (_columnConfigList$pus2 = {
          field: _constants__WEBPACK_IMPORTED_MODULE_9__["mappingColumns"].Ggr
        }, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_columnConfigList$pus2, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_columnConfigList$pus2, TOTAL_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_8__["totalCellStyle"].decimal), _columnConfigList$pus2));
      });

      return columnConfigList;
    }
  }]);

  return ReportExcel;
}();



/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/reducers/index.js":
/*!*************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/report/player-ggr-report/reducers/index.js ***!
  \*************************************************************************************/
/*! exports provided: productList, reportTitle, param, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productList", function() { return productList; });
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
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions/types */ "./Areas/Portal/www/source/js/pages/report/player-ggr-report/actions/types.js");




var _context, _context2;






var baseCurrencyList = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])([], {});
var now = new Date();

var defaultToday = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_2___default()(_context = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_2___default()(_context2 = "".concat(now.getMonth(), "/")).call(_context2, now.getDate(), "/")).call(_context, now.getFullYear());

var today = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(defaultToday, {});
var isProduction = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])(false, {});
var productList = Object(_modules_createReducer__WEBPACK_IMPORTED_MODULE_6__["default"])([], _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, _actions_types__WEBPACK_IMPORTED_MODULE_7__["SET_PRODUCT_LIST"], function (prevState, action) {
  return action.data;
}));
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
  productList: productList,
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
//# sourceMappingURL=7-f4e33eb87eb0b92c4545.chunk.js.map