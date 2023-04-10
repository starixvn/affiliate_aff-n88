(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dailyEarning~dailyEarningDetail~playerDetail"],{

/***/ "./Areas/Portal/www/source/js/components/select/components/Option.jsx":
/*!****************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/select/components/Option.jsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);


var Option = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(function (props, ref) {
  var itemData = props.itemData,
      onChange = props.onChange,
      id = props.id;

  var handleChange = function handleChange(event) {
    event.stopPropagation();
    var newItemData = {
      key: itemData.key,
      value: itemData.value
    };
    onChange && onChange(newItemData);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "select-item",
    id: id,
    onClick: handleChange,
    ref: ref
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "option-label"
  }, itemData.value));
});
Option.propTypes = {
  itemData: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (Option);

/***/ }),

/***/ "./Areas/Portal/www/source/js/components/select/components/Select.jsx":
/*!****************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/select/components/Select.jsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Select; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/trim */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/trim.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/includes */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/includes.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3__);
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _SelectLabel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./SelectLabel */ "./Areas/Portal/www/source/js/components/select/components/SelectLabel.jsx");
/* harmony import */ var _SelectOptionList__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./SelectOptionList */ "./Areas/Portal/www/source/js/components/select/components/SelectOptionList.jsx");















var KEY_NAME = "key";
var VALUE_NAME = "value";
var id = 1;

var Select =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default()(Select, _Component);

  function Select(props) {
    var _selectedItem2;

    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Select);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Select).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "onChangeHandler", function (selectedItem) {
      _this.onToggle();

      _this.setState({
        selectedItem: selectedItem
      });

      _this._callBackToParent(selectedItem.key);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "onToggle", function () {
      _this.setState(function (prevState) {
        return {
          showOptionList: !prevState.showOptionList,
          inputOption: ''
        };
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "_handleChangeInput", function (event) {
      var target = event.target;

      _this.setState(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, target.name, target.value));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "_close", function () {
      _this.setState({
        showOptionList: false,
        inputOption: ''
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "_handleDocumentClick", function (event) {
      var clickOutside = _this.wrapper && !_this.wrapper.contains(event.target);

      if (clickOutside && _this.state.showOptionList) {
        _this.selectOptionsRef.current._resetSelectingOption();

        _this._close();
      }
    });

    _this.id = "select-".concat(props.id || id++);
    _this.selectOptionsRef = Object(react__WEBPACK_IMPORTED_MODULE_11__["createRef"])();
    var dataSource = props.dataSource,
        keyField = props.keyField,
        valueField = props.valueField,
        selectedKey = props.selectedKey;

    var _selectedItem = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default()(dataSource).call(dataSource, function (i) {
      return i[keyField] == selectedKey;
    })[0] || {};

    _this.state = {
      showOptionList: false,
      inputOption: '',
      selectedItem: (_selectedItem2 = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_selectedItem2, KEY_NAME, _selectedItem[keyField]), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_selectedItem2, VALUE_NAME, _selectedItem[valueField]), _selectedItem2)
    };
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('click', this._handleDocumentClick);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._handleDocumentClick);
    }
  }, {
    key: "_callBackToParent",
    value: function _callBackToParent(selectedKey) {
      this.props.onChange && this.props.onChange(selectedKey);
    }
  }, {
    key: "_convertDataSource",
    value: function _convertDataSource(inputOption) {
      var _this$props = this.props,
          keyField = _this$props.keyField,
          valueField = _this$props.valueField,
          dataSource = _this$props.dataSource;

      var dataSourceAfterFilter = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_3___default()(dataSource).call(dataSource, function (i) {
        var _context;

        return _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_2___default()(_context = i[valueField].toLowerCase()).call(_context, inputOption || '');
      });

      return _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default()(dataSourceAfterFilter).call(dataSourceAfterFilter, function (item) {
        var _ref;

        return _ref = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref, KEY_NAME, item[keyField]), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref, VALUE_NAME, item[valueField]), _ref;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          inputOption = _this$state.inputOption,
          selectedItem = _this$state.selectedItem;
      var _this$props2 = this.props,
          isDisable = _this$props2.isDisable,
          hasInputOption = _this$props2.hasInputOption;

      var dataSource = this._convertDataSource(_babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0___default()(inputOption).call(inputOption).toLowerCase());

      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "select-container",
        id: this.id,
        ref: function ref(element) {
          return _this2.wrapper = element;
        }
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SelectLabel__WEBPACK_IMPORTED_MODULE_13__["default"], {
        selectedText: selectedItem.value,
        onToggle: this.onToggle,
        isDisable: isDisable
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "select-options-container",
        style: {
          display: this.state.showOptionList ? "block" : "none"
        }
      }, hasInputOption && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("ul", {
        className: "select-options"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("input", {
        type: "text",
        name: "inputOption",
        value: inputOption,
        className: "w-100",
        onChange: this._handleChangeInput
      })), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SelectOptionList__WEBPACK_IMPORTED_MODULE_14__["default"], {
        id: this.id,
        ref: this.selectOptionsRef,
        dataSource: dataSource,
        onChange: this.onChangeHandler
      })));
    }
  }]);

  return Select;
}(react__WEBPACK_IMPORTED_MODULE_11__["Component"]);

_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(Select, "propTypes", {
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.object).isRequired,
  keyField: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.string,
  valueField: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.string,
  selectedKey: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.string]).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func,
  hasInputOption: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.bool,
  isDisable: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.bool
});

_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(Select, "defaultProps", {
  keyField: KEY_NAME,
  valueField: VALUE_NAME,
  hasInputOption: false,
  isDisable: false
});



/***/ }),

/***/ "./Areas/Portal/www/source/js/components/select/components/SelectLabel.jsx":
/*!*********************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/select/components/SelectLabel.jsx ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var SelectLabel = function SelectLabel(props) {
  var selectedText = props.selectedText,
      isDisable = props.isDisable;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    type: "button",
    className: "select-label",
    disabled: isDisable,
    onClick: props.onToggle
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "text-display",
    title: selectedText
  }, selectedText), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
    className: "caret"
  }));
};

SelectLabel.propTypes = {
  selectedText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  isDisable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (SelectLabel);

/***/ }),

/***/ "./Areas/Portal/www/source/js/components/select/components/SelectOptionList.jsx":
/*!**************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/select/components/SelectOptionList.jsx ***!
  \**************************************************************************************/
/*! exports provided: SelectOptionList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectOptionList", function() { return SelectOptionList; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_find_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/find-index */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/find-index.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_find_index__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_find_index__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/includes */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/includes.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_3__);
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Option */ "./Areas/Portal/www/source/js/components/select/components/Option.jsx");














var keys = {
  Up: 38,
  Down: 40,
  Enter: 13
};
var SelectOptionList =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default()(SelectOptionList, _PureComponent);

  function SelectOptionList(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, SelectOptionList);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(SelectOptionList).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleMouseOver", function (e) {
      var _context;

      if (_babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_3___default()(_context = _this.selectOptionsRef.current.innerHTML).call(_context, e.target.outerHTML)) {
        var _context2;

        var selectedOption = _this.state.selectedOption;
        selectedOption && selectedOption.current && selectedOption.current.classList.remove("hover");

        var selectedIndex = _babel_runtime_corejs3_core_js_stable_instance_find_index__WEBPACK_IMPORTED_MODULE_2___default()(_context2 = _this.optionRefs).call(_context2, function (op) {
          var _context3;

          return _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_3___default()(_context3 = op.current.outerHTML).call(_context3, e.target.outerHTML);
        });

        if (selectedIndex !== -1) {
          var newOption = _this.optionRefs[selectedIndex];
          newOption.current.classList.add("hover");

          _this.setState({
            selectedIndex: selectedIndex,
            selectedOption: newOption
          });
        }
      }
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "_resetSelectingOption", function () {
      var selectedOption = _this.state.selectedOption;
      selectedOption && selectedOption.current && selectedOption.current.classList.remove("hover");
      _this.selectOptionsRef.current.scrollTop = 0;

      _this.setState({
        selectedIndex: 0,
        selectedOption: null
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleKeyPress", function (e) {
      var keyCode = e.keyCode;
      var _this$state = _this.state,
          selectedIndex = _this$state.selectedIndex,
          selectedOption = _this$state.selectedOption,
          minLength = _this$state.minLength,
          maxLength = _this$state.maxLength;

      if (e.target.name !== "inputOption") {
        return;
      }

      if (!selectedOption && !selectedIndex) {
        if (keyCode === keys.Down) {
          var newOption = _this.optionRefs[0];
          newOption.current.classList.add("hover");

          _this.setState({
            selectedIndex: 0,
            selectedOption: newOption
          });

          return;
        }

        return;
      } //press enter


      if (keyCode === keys.Enter) {
        selectedOption.current.classList.remove("hover");
        var itemData = _this.props.dataSource[selectedIndex];
        var newItemData = {
          key: itemData.key,
          value: itemData.value
        };

        _this.props.onChange(newItemData);

        return;
      }

      if (keyCode === keys.Up || keyCode === keys.Down) {
        var newIndex = selectedIndex; //press up

        if (keyCode === 38 && selectedIndex > minLength) {
          newIndex = selectedIndex - 1;
        } //press down


        if (keyCode === 40 && selectedIndex < maxLength) {
          newIndex = selectedIndex + 1;
        }

        if (newIndex !== selectedIndex) {
          var offsetHeight = selectedOption.current.offsetHeight;
          selectedOption.current.classList.remove("hover");
          var _newOption = _this.optionRefs[newIndex];

          _newOption.current.classList.add("hover");

          _this.selectOptionsRef.current.scrollTop = (newIndex - 14) * offsetHeight;

          _this.setState({
            selectedIndex: newIndex,
            selectedOption: _newOption
          });
        }
      }
    });

    var dataSource = props.dataSource;
    _this.optionRefs = _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default()(dataSource).call(dataSource, function () {
      return Object(react__WEBPACK_IMPORTED_MODULE_11__["createRef"])();
    });
    _this.selectOptionsRef = Object(react__WEBPACK_IMPORTED_MODULE_11__["createRef"])();
    _this.state = {
      selectedIndex: 0,
      selectedOption: null,
      minLength: 0,
      maxLength: dataSource.length - 1
    };
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(SelectOptionList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
      document.addEventListener("mouseover", this.handleMouseOver);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
      document.removeEventListener("mouseover", this.handleMouseOver);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var dataSource = this.props.dataSource;

      if (!!dataSource.length && dataSource.length !== prevProps.dataSource.length) {
        this._resetSelectingOption();

        this.setState({
          maxLength: dataSource.length - 1
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          dataSource = _this$props.dataSource,
          id = _this$props.id;
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("ul", {
        className: "select-options",
        ref: this.selectOptionsRef
      }, _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default()(dataSource).call(dataSource, function (item, index) {
        var _context4, _context5;

        return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_Option__WEBPACK_IMPORTED_MODULE_13__["default"], {
          ref: _this2.optionRefs[index],
          id: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context4 = "".concat(id, "-optionItem-")).call(_context4, index),
          key: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context5 = "".concat(id, "optionItem")).call(_context5, index),
          itemData: item,
          onChange: _this2.props.onChange
        });
      }));
    }
  }]);

  return SelectOptionList;
}(react__WEBPACK_IMPORTED_MODULE_11__["PureComponent"]);
SelectOptionList.propTypes = {
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.object).isRequired,
  id: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.string]).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_12___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (SelectOptionList);

/***/ }),

/***/ "./Areas/Portal/www/source/js/components/select/index.jsx":
/*!****************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/select/index.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Select */ "./Areas/Portal/www/source/js/components/select/components/Select.jsx");

/* harmony default export */ __webpack_exports__["default"] = (_components_Select__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!*********************************************************************************************************!*\
  !*** delegated ../../../node_modules/prop-types/index.js from dll-reference react_379d6d8a6f9eccf63149 ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! dll-reference react_379d6d8a6f9eccf63149 */ "dll-reference react_379d6d8a6f9eccf63149"))(0);

/***/ })

}]);
//# sourceMappingURL=dailyEarning~dailyEarningDetail~playerDetail-f13704c30ed1b8df0854.chunk.js.map