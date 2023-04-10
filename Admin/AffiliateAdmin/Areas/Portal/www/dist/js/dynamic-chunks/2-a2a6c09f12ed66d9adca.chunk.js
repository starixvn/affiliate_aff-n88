(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./Areas/Portal/www/source/js/components/multiple-select/components/MultipleSelect.jsx":
/*!*********************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/multiple-select/components/MultipleSelect.jsx ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultipleSelect; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/trim */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/trim.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/every */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/every.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js/get-iterator */ "./node_modules/@babel/runtime-corejs3/core-js/get-iterator.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/includes */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/includes.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs3/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs3/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs3/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/inherits */ "./node_modules/@babel/runtime-corejs3/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _MultipleSelectLabel__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./MultipleSelectLabel */ "./Areas/Portal/www/source/js/components/multiple-select/components/MultipleSelectLabel.jsx");
/* harmony import */ var _MultipleSelectOptionList__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./MultipleSelectOptionList */ "./Areas/Portal/www/source/js/components/multiple-select/components/MultipleSelectOptionList.jsx");
/* harmony import */ var _OptionAll__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./OptionAll */ "./Areas/Portal/www/source/js/components/multiple-select/components/OptionAll.jsx");



















var KEY_NAME = "key";
var VALUE_NAME = "value";
var STATUS_NAME = "checked";
var id = 1;

var MultipleSelect =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_12___default()(MultipleSelect, _Component);

  function MultipleSelect(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7___default()(this, MultipleSelect);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_9___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_10___default()(MultipleSelect).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "onChangeHandler", function (item) {
      var _selectedItem;

      var _this$props = _this.props,
          keyField = _this$props.keyField,
          valueField = _this$props.valueField,
          statusField = _this$props.statusField,
          dataSource = _this$props.dataSource;
      var selectedItem = (_selectedItem = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_selectedItem, keyField, item.key), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_selectedItem, valueField, item.value), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_selectedItem, statusField, item.checked), _selectedItem);

      var newDataSource = _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_6___default()(dataSource).call(dataSource, function (option) {
        var _ref;

        var newItem = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_5___default()({}, option);

        if (newItem[keyField] === item.key) {
          newItem[statusField] = item.checked;
        }

        return _ref = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_ref, KEY_NAME, newItem[keyField]), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_ref, VALUE_NAME, newItem[valueField]), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_ref, STATUS_NAME, newItem[statusField]), _ref;
      });

      _this._callBackToParent(selectedItem, newDataSource);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "onToggle", function () {
      _this.setState(function (prevState) {
        return {
          showOptionList: !prevState.showOptionList,
          inputOption: ''
        };
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "checkAllHandler", function (checked) {
      var _this$props2 = _this.props,
          keyField = _this$props2.keyField,
          valueField = _this$props2.valueField,
          dataSource = _this$props2.dataSource;

      var newDataSource = _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_6___default()(dataSource).call(dataSource, function (item) {
        return {
          key: item[keyField],
          value: item[valueField],
          checked: checked
        };
      });

      _this._callBackToParent(null, newDataSource);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "_handleChangeInput", function (event) {
      var target = event.target;

      _this.setState(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()({}, target.name, target.value));
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "_close", function () {
      _this.setState({
        showOptionList: false,
        inputOption: ''
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "_handleDocumentClick", function (event) {
      var clickOutside = _this.wrapper && !_this.wrapper.contains(event.target);

      if (clickOutside && _this.state.showOptionList) {
        _this._close();
      }
    });

    _this.id = "multiple-select-".concat(props.id || id++);
    _this.state = {
      showOptionList: false,
      inputOption: ''
    };
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_8___default()(MultipleSelect, [{
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
    value: function _callBackToParent(selectedItem, newDataSource) {
      var selectedItemsKey = this._getSelectedItemKey(newDataSource);

      this.props.onChange && this.props.onChange(selectedItem, selectedItemsKey);
    }
  }, {
    key: "_convertDataSource",
    value: function _convertDataSource(inputOption) {
      var _this$props3 = this.props,
          keyField = _this$props3.keyField,
          valueField = _this$props3.valueField,
          statusField = _this$props3.statusField,
          dataSource = _this$props3.dataSource;

      var dataSourceAfterFilter = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_4___default()(dataSource).call(dataSource, function (i) {
        var _context;

        return _babel_runtime_corejs3_core_js_stable_instance_includes__WEBPACK_IMPORTED_MODULE_3___default()(_context = i[valueField].toLowerCase()).call(_context, inputOption || '');
      });

      return _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_6___default()(dataSourceAfterFilter).call(dataSourceAfterFilter, function (item) {
        var _ref2;

        return _ref2 = {}, _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_ref2, KEY_NAME, item[keyField]), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_ref2, VALUE_NAME, item[valueField]), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_ref2, STATUS_NAME, item[statusField]), _ref2;
      });
    }
  }, {
    key: "_getSelectedItemKey",
    value: function _getSelectedItemKey(dataSource) {
      var selectedItemKey = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _babel_runtime_corejs3_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_2___default()(dataSource), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.checked) {
            selectedItemKey.push(item.key);
          }
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

      return selectedItemKey.join(",");
    }
  }, {
    key: "_renderOptionAll",
    value: function _renderOptionAll(dataSource) {
      var checkedItemCount = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_4___default()(dataSource).call(dataSource, function (x) {
        return x.checked;
      }).length;

      var checkedAll = checkedItemCount === dataSource.length;
      var _this$props4 = this.props,
          optionAllLabel = _this$props4.optionAllLabel,
          isDisable = _this$props4.isDisable;
      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_OptionAll__WEBPACK_IMPORTED_MODULE_18__["default"], {
        id: this.id,
        checked: checkedAll,
        label: optionAllLabel,
        onChange: this.checkAllHandler,
        isDisable: isDisable
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _context2,
          _this2 = this;

      var inputOption = this.state.inputOption;
      var _this$props5 = this.props,
          noneSelectedLabel = _this$props5.noneSelectedLabel,
          maxDisplayItemCount = _this$props5.maxDisplayItemCount,
          hasAllOption = _this$props5.hasAllOption,
          isDisable = _this$props5.isDisable,
          hasInputOption = _this$props5.hasInputOption,
          statusField = _this$props5.statusField,
          selectedAllLabel = _this$props5.selectedAllLabel;

      var isSelectedAll = _babel_runtime_corejs3_core_js_stable_instance_every__WEBPACK_IMPORTED_MODULE_1___default()(_context2 = this.props.dataSource).call(_context2, function (d) {
        return d[statusField];
      });

      var inputOptionTrim = _babel_runtime_corejs3_core_js_stable_instance_trim__WEBPACK_IMPORTED_MODULE_0___default()(inputOption).call(inputOption);

      var dataSource = this._convertDataSource(inputOptionTrim.toLowerCase());

      var dataSourceLabel = this._convertDataSource();

      var selectedItems = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_4___default()(dataSourceLabel).call(dataSourceLabel, function (item) {
        return item.checked;
      });

      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "multiple-select-container",
        id: this.id,
        ref: function ref(element) {
          return _this2.wrapper = element;
        }
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_MultipleSelectLabel__WEBPACK_IMPORTED_MODULE_16__["default"], {
        selectedItems: selectedItems,
        onToggle: this.onToggle,
        noneSelectedLabel: noneSelectedLabel,
        isSelectedAll: isSelectedAll,
        selectedAllLabel: selectedAllLabel,
        maxDisplayItemCount: maxDisplayItemCount
      }), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "multiple-select-default multiple-select-options-container",
        style: {
          display: this.state.showOptionList ? "block" : "none"
        }
      }, hasInputOption && react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("ul", {
        className: "multiple-select-options"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("input", {
        type: "text",
        name: "inputOption",
        value: inputOption,
        className: "w-100",
        onChange: this._handleChangeInput
      })), hasAllOption && !inputOptionTrim && this._renderOptionAll(dataSource), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_MultipleSelectOptionList__WEBPACK_IMPORTED_MODULE_17__["default"], {
        id: this.id,
        dataSource: dataSource,
        onChange: this.onChangeHandler,
        isDisable: isDisable
      })));
    }
  }]);

  return MultipleSelect;
}(react__WEBPACK_IMPORTED_MODULE_14__["Component"]);

_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(MultipleSelect, "propTypes", {
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.object).isRequired,
  keyField: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.string,
  valueField: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.string,
  statusField: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.string,
  noneSelectedLabel: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.string,
  optionAllLabel: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.string,
  maxDisplayItemCount: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.number,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.func,
  hasAllOption: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.bool,
  hasInputOption: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.bool,
  isDisable: prop_types__WEBPACK_IMPORTED_MODULE_15___default.a.bool
});

_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(MultipleSelect, "defaultProps", {
  keyField: KEY_NAME,
  valueField: VALUE_NAME,
  statusField: STATUS_NAME,
  hasAllOption: true,
  hasInputOption: false,
  isDisable: false
});



/***/ }),

/***/ "./Areas/Portal/www/source/js/components/multiple-select/components/MultipleSelectLabel.jsx":
/*!**************************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/multiple-select/components/MultipleSelectLabel.jsx ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);



var NO_SELECTED_LABEL = "Select options";
var MAX_SELECTED_ITEM_FOR_DISPLAY = 3;

function getSelectedItemsString(props) {
  var selectedItems = props.selectedItems,
      noneSelectedLabel = props.noneSelectedLabel,
      maxDisplayItemCount = props.maxDisplayItemCount,
      isSelectedAll = props.isSelectedAll,
      selectedAllLabel = props.selectedAllLabel;

  var selectedValues = _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_0___default()(selectedItems).call(selectedItems, function (item) {
    return item.value;
  });

  var displayText = noneSelectedLabel;
  var selectedItemCount = selectedValues.length;

  if (selectedItemCount >= maxDisplayItemCount) {
    displayText = "".concat(selectedItemCount, " selected");
  } else if (selectedItemCount >= 1) {
    displayText = selectedValues.join(", ");
  }

  if (isSelectedAll && !!selectedAllLabel) {
    displayText = selectedAllLabel;
  }

  return displayText;
}

var MultipleSelectLabel = function MultipleSelectLabel(props) {
  var selectedItemString = getSelectedItemsString(props);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
    type: "button",
    className: "multiple-select-default multiple-select-label",
    onClick: props.onToggle
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "text-display",
    title: selectedItemString
  }, selectedItemString), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("b", {
    className: "caret"
  }));
};

MultipleSelectLabel.propTypes = {
  selectedItems: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object).isRequired,
  noneSelectedLabel: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  isSelectedAll: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  selectedAllLabel: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  maxDisplayItemCount: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number
};
MultipleSelectLabel.defaultProps = {
  isSelectedAll: false,
  selectedAllLabel: '',
  noneSelectedLabel: NO_SELECTED_LABEL,
  maxDisplayItemCount: MAX_SELECTED_ITEM_FOR_DISPLAY
};
/* harmony default export */ __webpack_exports__["default"] = (MultipleSelectLabel);

/***/ }),

/***/ "./Areas/Portal/www/source/js/components/multiple-select/components/MultipleSelectOptionList.jsx":
/*!*******************************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/multiple-select/components/MultipleSelectOptionList.jsx ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Option */ "./Areas/Portal/www/source/js/components/multiple-select/components/Option.jsx");






var MultipleSelectOptionList = function MultipleSelectOptionList(props) {
  var dataSource = props.dataSource,
      onChange = props.onChange,
      id = props.id,
      isDisable = props.isDisable;
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("ul", {
    className: "multiple-select-options"
  }, _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_1___default()(dataSource).call(dataSource, function (item, index) {
    var _context, _context2;

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Option__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context = "".concat(id, "-optionItem-")).call(_context, index),
      key: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context2 = "".concat(id, "optionItem")).call(_context2, index),
      itemData: item,
      onChange: onChange,
      isDisable: isDisable
    });
  }));
};

MultipleSelectOptionList.propTypes = {
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object).isRequired,
  id: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string]).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,
  isDisable: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (MultipleSelectOptionList);

/***/ }),

/***/ "./Areas/Portal/www/source/js/components/multiple-select/components/Option.jsx":
/*!*************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/multiple-select/components/Option.jsx ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);



var Option = function Option(props) {
  var itemData = props.itemData,
      onChange = props.onChange,
      id = props.id,
      isDisable = props.isDisable;

  var handleChange = function handleChange(event) {
    event.stopPropagation();
    var newItemData = {
      key: itemData.key,
      value: itemData.value,
      checked: !itemData.checked
    };
    onChange && onChange(newItemData);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    className: "multiple-select-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
    id: id,
    type: "checkbox",
    className: "option-checkbox",
    checked: itemData.checked,
    onChange: handleChange,
    disabled: isDisable
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
    className: "option-label",
    htmlFor: id
  }, itemData.value));
};

Option.propTypes = {
  itemData: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isDisable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (Option);

/***/ }),

/***/ "./Areas/Portal/www/source/js/components/multiple-select/components/OptionAll.jsx":
/*!****************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/multiple-select/components/OptionAll.jsx ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Option */ "./Areas/Portal/www/source/js/components/multiple-select/components/Option.jsx");



var LABEL = "All";
var DEFAULT_CHECKED = false;
var DEFAULT_DISABLE = false;

var OptionAll = function OptionAll(props) {
  var id = props.id,
      checked = props.checked,
      label = props.label,
      onChange = props.onChange,
      isDisable = props.isDisable;
  var itemData = {
    key: "All",
    value: label,
    checked: checked
  };

  var changeHandler = function changeHandler(_ref) {
    var checked = _ref.checked;
    onChange && onChange(checked);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "multiple-select-options multiple-select-option-all"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Option__WEBPACK_IMPORTED_MODULE_2__["default"], {
    id: "".concat(id, "-optionItemAll"),
    itemData: itemData,
    onChange: changeHandler,
    isDisable: isDisable
  }));
};

OptionAll.propTypes = {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]).isRequired,
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isDisable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
};
OptionAll.defaultProps = {
  label: LABEL,
  checked: DEFAULT_CHECKED,
  isDisable: DEFAULT_DISABLE
};
/* harmony default export */ __webpack_exports__["default"] = (OptionAll);

/***/ }),

/***/ "./Areas/Portal/www/source/js/components/multiple-select/index.jsx":
/*!*************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/components/multiple-select/index.jsx ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_MultipleSelect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/MultipleSelect */ "./Areas/Portal/www/source/js/components/multiple-select/components/MultipleSelect.jsx");

/* harmony default export */ __webpack_exports__["default"] = (_components_MultipleSelect__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/every.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/every.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/every */ "./node_modules/core-js-pure/stable/instance/every.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/includes.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs3/core-js-stable/instance/includes.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js-pure/stable/instance/includes */ "./node_modules/core-js-pure/stable/instance/includes.js");

/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/every.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/every.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../../modules/es.array.every */ "./node_modules/core-js-pure/modules/es.array.every.js");
var entryVirtual = __webpack_require__(/*! ../../../internals/entry-virtual */ "./node_modules/core-js-pure/internals/entry-virtual.js");

module.exports = entryVirtual('Array').every;


/***/ }),

/***/ "./node_modules/core-js-pure/es/array/virtual/includes.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/array/virtual/includes.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../../modules/es.array.includes */ "./node_modules/core-js-pure/modules/es.array.includes.js");
var entryVirtual = __webpack_require__(/*! ../../../internals/entry-virtual */ "./node_modules/core-js-pure/internals/entry-virtual.js");

module.exports = entryVirtual('Array').includes;


/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/every.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/every.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var every = __webpack_require__(/*! ../array/virtual/every */ "./node_modules/core-js-pure/es/array/virtual/every.js");

var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  var own = it.every;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.every) ? every : own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/es/instance/includes.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/es/instance/includes.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayIncludes = __webpack_require__(/*! ../array/virtual/includes */ "./node_modules/core-js-pure/es/array/virtual/includes.js");
var stringIncludes = __webpack_require__(/*! ../string/virtual/includes */ "./node_modules/core-js-pure/es/string/virtual/includes.js");

var ArrayPrototype = Array.prototype;
var StringPrototype = String.prototype;

module.exports = function (it) {
  var own = it.includes;
  if (it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.includes)) return arrayIncludes;
  if (typeof it === 'string' || it === StringPrototype || (it instanceof String && own === StringPrototype.includes)) {
    return stringIncludes;
  } return own;
};


/***/ }),

/***/ "./node_modules/core-js-pure/es/string/virtual/includes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/es/string/virtual/includes.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../../modules/es.string.includes */ "./node_modules/core-js-pure/modules/es.string.includes.js");
var entryVirtual = __webpack_require__(/*! ../../../internals/entry-virtual */ "./node_modules/core-js-pure/internals/entry-virtual.js");

module.exports = entryVirtual('String').includes;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/correct-is-regexp-logic.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/correct-is-regexp-logic.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-regexp.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-regexp.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/validate-string-method-arguments.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/validate-string-method-arguments.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "./node_modules/core-js-pure/internals/is-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) {
    throw TypeError('String.prototype.' + NAME + " doesn't accept regex");
  } return String(requireObjectCoercible(that));
};


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.every.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.every.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var arrayMethods = __webpack_require__(/*! ../internals/array-methods */ "./node_modules/core-js-pure/internals/array-methods.js");
var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js-pure/internals/sloppy-array-method.js");

var internalEvery = arrayMethods(4);
var SLOPPY_METHOD = sloppyArrayMethod('every');

// `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every
$({ target: 'Array', proto: true, forced: SLOPPY_METHOD }, {
  every: function every(callbackfn /* , thisArg */) {
    return internalEvery(this, callbackfn, arguments[1]);
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.includes.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.includes.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var arrayIncludes = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js-pure/internals/array-includes.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js-pure/internals/add-to-unscopables.js");

var internalIncludes = arrayIncludes(true);

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return internalIncludes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.string.includes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.string.includes.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var validateArguments = __webpack_require__(/*! ../internals/validate-string-method-arguments */ "./node_modules/core-js-pure/internals/validate-string-method-arguments.js");
var correctIsRegExpLogic = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "./node_modules/core-js-pure/internals/correct-is-regexp-logic.js");

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~validateArguments(this, searchString, 'includes')
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/every.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/every.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../../es/instance/every */ "./node_modules/core-js-pure/es/instance/every.js");


/***/ }),

/***/ "./node_modules/core-js-pure/stable/instance/includes.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/stable/instance/includes.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../../es/instance/includes */ "./node_modules/core-js-pure/es/instance/includes.js");


/***/ })

}]);
//# sourceMappingURL=2-a2a6c09f12ed66d9adca.chunk.js.map