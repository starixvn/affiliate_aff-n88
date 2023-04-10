(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["playerDetail"],{

/***/ "./Areas/Portal/www/source/js/modules/excel.js":
/*!*****************************************************!*\
  !*** ./Areas/Portal/www/source/js/modules/excel.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Excel; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/typeof */ "./node_modules/@babel/runtime-corejs3/helpers/typeof.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_typeof__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);






var EXCEL_TYPE = "xlsx";
var MapExcelType = {
  "number": "n",
  "string": "s",
  "boolean": "b",
  "object": "d"
};
var _XLSX = null;

var Excel =
/*#__PURE__*/
function () {
  function Excel() {
    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Excel);
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Excel, null, [{
    key: "process",
    value: function () {
      var _process = _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3___default()(
      /*#__PURE__*/
      _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(callback) {
        return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.all(/*! import() | xlsx-style */[__webpack_require__.e("vendors~xlsx-style"), __webpack_require__.e("xlsx-style")]).then(__webpack_require__.t.bind(null, /*! xlsx-style-sparta */ "./node_modules/xlsx-style-sparta/xlsx.js", 7));

              case 2:
                _XLSX = _context.sent;

                if (_XLSX) {
                  callback && callback();
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function process(_x) {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }, {
    key: "export",
    value: function _export(worksheet, fileName) {
      var sheetName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Sheet 1';
      var option = {
        bookType: EXCEL_TYPE,
        bookSST: false,
        type: 'binary'
      };
      var workbook = {
        SheetNames: [sheetName],
        Sheets: {},
        Props: {}
      };
      workbook.Sheets[sheetName] = worksheet;

      var workbookOutput = _XLSX.write(workbook, option);

      this.download(workbookOutput, fileName);
    }
  }, {
    key: "getCellType",
    value: function getCellType(value) {
      return MapExcelType[_babel_runtime_corejs3_helpers_typeof__WEBPACK_IMPORTED_MODULE_1___default()(value)];
    }
  }, {
    key: "getCellAddress",
    value: function getCellAddress(cellObject) {
      return _XLSX.utils.encode_cell(cellObject);
    }
  }, {
    key: "download",
    value: function download(workbookOut, fileName) {
      var blob = new Blob([this.sheetToArrayBuffer(workbookOut)], {
        type: "application/octet-stream"
      });
      this.downloadFromBolb(blob, fileName);
    }
  }, {
    key: "downloadFromBolb",
    value: function downloadFromBolb(blob, fileName) {
      var _context2;

      var fileNameDownload = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_0___default()(_context2 = "".concat(fileName, ".")).call(_context2, EXCEL_TYPE); // IE 10+


      if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, fileNameDownload);
      } else {
        var element = window.document.createElement('a');
        element.href = window.URL.createObjectURL(blob);
        element.download = fileNameDownload;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }
  }, {
    key: "sheetToArrayBuffer",
    value: function sheetToArrayBuffer(s) {
      var buffer = new ArrayBuffer(s.length);
      var view = new Uint8Array(buffer);

      for (var i = 0; i <= s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }

      return buffer;
    }
  }]);

  return Excel;
}();



/***/ }),

/***/ "./Areas/Portal/www/source/js/modules/excelStyleConstant.js":
/*!******************************************************************!*\
  !*** ./Areas/Portal/www/source/js/modules/excelStyleConstant.js ***!
  \******************************************************************/
/*! exports provided: titleCellStyle, headerCellStyle, mergedHeaderCellByRowspanStyle, mergedHeaderCellByColspanStyle, bodyCellStyle, totalCellStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleCellStyle", function() { return titleCellStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headerCellStyle", function() { return headerCellStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergedHeaderCellByRowspanStyle", function() { return mergedHeaderCellByRowspanStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergedHeaderCellByColspanStyle", function() { return mergedHeaderCellByColspanStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bodyCellStyle", function() { return bodyCellStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "totalCellStyle", function() { return totalCellStyle; });
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs3/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);

var titleCellStyle = {
  font: {
    bold: true,
    color: {
      rgb: "333333"
    }
  },
  fill: {
    patternType: "solid",
    fgColor: {
      rgb: "cdd3d9"
    }
  }
};
var headerCellStyle = {
  font: {
    bold: true,
    color: {
      rgb: "333333"
    },
    sz: "12"
  },
  alignment: {
    horizontal: "center",
    vertical: "center"
  },
  fill: {
    patternType: "solid",
    fgColor: {
      rgb: "e0e0e0"
    }
  },
  border: {
    left: {
      style: "thin",
      color: {
        rgb: "cccccc"
      }
    },
    right: {
      style: "thin",
      color: {
        rgb: "cccccc"
      }
    },
    top: {
      style: "thin",
      color: {
        rgb: "cccccc"
      }
    },
    bottom: {
      style: "thin",
      color: {
        rgb: "cccccc"
      }
    }
  }
};
var mergedHeaderCellByRowspanStyle = {
  border: {
    left: {
      style: "thin",
      color: {
        rgb: "cccccc"
      }
    },
    right: {
      style: "thin",
      color: {
        rgb: "cccccc"
      }
    }
  }
};
var mergedHeaderCellByColspanStyle = {
  border: {
    top: {
      style: "thin",
      color: {
        rgb: "cccccc"
      }
    },
    bottom: {
      style: "thin",
      color: {
        rgb: "cccccc"
      }
    }
  }
};
var bodyTextStyle = {
  alignment: {
    vertical: "center"
  }
};
var bodyDecimalStyle = {
  numFmt: "#,##0.00"
};
var bodyCellStyle = {
  rowspan: bodyTextStyle,
  center: {
    alignment: _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, bodyTextStyle.alignment, {
      horizontal: "center"
    })
  },
  left: {
    alignment: _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, bodyTextStyle.alignment, {
      horizontal: "left"
    })
  },
  right: {
    alignment: _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, bodyTextStyle.alignment, {
      horizontal: "right"
    })
  },
  number: {
    numFmt: "#,##0"
  },
  decimal: bodyDecimalStyle,
  negativeDecimal: _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, bodyDecimalStyle, {
    font: {
      color: {
        rgb: "FF0000"
      }
    }
  }),
  percent: {
    numFmt: '#,##0.00%'
  }
};
var totalTextStyle = {
  font: {
    bold: true
  },
  fill: {
    patternType: "solid",
    fgColor: {
      rgb: "ffc4a8"
    }
  }
};

var totalDecimalStyle = _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, totalTextStyle, {
  numFmt: "#,##0.00"
});

var totalCellStyle = {
  default: totalTextStyle,
  rowspan: _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, totalTextStyle, {
    alignment: {
      horizontal: "center",
      vertical: "center"
    }
  }),
  center: _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, totalTextStyle, {
    alignment: {
      vertical: "center",
      horizontal: "center"
    }
  }),
  right: _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, totalTextStyle, {
    alignment: {
      vertical: "center",
      horizontal: "right"
    }
  }),
  number: _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, totalTextStyle, {
    numFmt: "#,##0"
  }),
  decimal: totalDecimalStyle,
  negativeDecimal: _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, totalDecimalStyle, {
    font: {
      bold: true,
      color: {
        rgb: "FF0000"
      }
    }
  })
};

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/AppContainer.jsx":
/*!***********************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/AppContainer.jsx ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../layouts/AppLayout */ "./Areas/Portal/www/source/js/layouts/AppLayout.jsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Filter */ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/Filter.jsx");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Content */ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/Content.jsx");





var AppContainer = function AppContainer(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_AppLayout__WEBPACK_IMPORTED_MODULE_1__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_2__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(AppContainer));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/Content.jsx":
/*!******************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/Content.jsx ***!
  \******************************************************************************************/
/*! exports provided: Content, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Content", function() { return Content; });
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs3/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3__);
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
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @9softstudio/react-fixed-table-header */ "./node_modules/@9softstudio/react-fixed-table-header/dist/index.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../modules/numberFormat */ "./Areas/Portal/www/source/js/modules/numberFormat.js");
/* harmony import */ var _modules_constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../modules/constants */ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/modules/constants.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/actions/index.js");
/* harmony import */ var _modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../modules/htmlHelper */ "./Areas/Portal/www/source/js/modules/htmlHelper.js");
/* harmony import */ var _SortingCell__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./SortingCell */ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/SortingCell.jsx");




















var Content =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default()(Content, _PureComponent);

  function Content(props) {
    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, Content);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7___default()(Content).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handleClickHeader", function (selectedColumn) {
      var _this$props = _this.props,
          param = _this$props.param,
          pagingOption = _this$props.pagingOption,
          sortingColumn = _this$props.sortingColumn;

      var postParam = _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, param, {
        pageIndex: pagingOption.PageIndex,
        pageSize: pagingOption.PageSize,
        sortById: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["SortByIdList"][sortingColumn.ColumnName]
      });

      if (sortingColumn.ColumnName === selectedColumn) {
        var newSortingColumn = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default()({}, sortingColumn, {
          IsSortAsc: !sortingColumn.IsSortAsc
        });

        _this.props.setSortingColumn(newSortingColumn);

        _this._fetchData(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, postParam, {
          isSortAsc: !sortingColumn.IsSortAsc
        }));
      } else {
        _this.props.setSortingColumn({
          IsSortAsc: false,
          ColumnName: selectedColumn
        });

        _this._fetchData(_babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, postParam, {
          isSortAsc: false,
          sortById: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["SortByIdList"][selectedColumn]
        }));
      }
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_8___default()(_this), "handlePaging", function (pageIndex, pageSize) {
      var _this$props2 = _this.props,
          param = _this$props2.param,
          sortingColumn = _this$props2.sortingColumn;

      var newParam = _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default()({}, param, {
        pageIndex: pageIndex,
        pageSize: pageSize,
        sortById: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["SortByIdList"][sortingColumn.ColumnName],
        isSortAsc: sortingColumn.IsSortAsc
      });

      _this._fetchData(newParam);
    });

    _this.state = {
      data: null
    };
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(Content, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          param = _this$props3.param,
          pagingOption = _this$props3.pagingOption;
      var isDifferent = param !== prevProps.param;

      if (isDifferent) {
        var postParam = _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, param, {
          pageIndex: 1,
          pageSize: pagingOption.PageSize
        });

        this._fetchData(postParam);
      }

      if (param.isClickLink || isDifferent) {
        this.setState({
          isSortAsc: false,
          sortingColumn: 'Turnover'
        });
      }
    }
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData2 = _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(param) {
        var affId, postData, data;
        return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.props.toggleLoaderUserPanel(true);
                affId = this.props.affId;
                postData = _babel_runtime_corejs3_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_3___default()({}, param, {
                  affId: affId
                });
                _context.next = 5;
                return this.props.fetchData(postData);

              case 5:
                data = _context.sent;
                this.setState({
                  data: data ? data.MainData : null
                });
                this.props.setPagingOption({
                  TotalItem: data ? data.TotalItem : 0,
                  PageIndex: param.pageIndex,
                  PageSize: param.pageSize
                });
                this.props.toggleLoaderUserPanel(false);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _fetchData(_x) {
        return _fetchData2.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: "_renderHeader",
    value: function _renderHeader() {
      var _this$props4 = this.props,
          sortingColumn = _this$props4.sortingColumn,
          isDepositFeePercent = _this$props4.isDepositFeePercent,
          isWithdrawalFeePercent = _this$props4.isWithdrawalFeePercent;
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Row"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        header: true,
        colWidth: 30
      }, "#"), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'Username',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].UserName,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'IbcUsername',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].IbcUserName,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'RegisteredDate',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].RegisteredDateText,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'FirstDepositDate',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].FirstDepositDateText,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'FirstDepositAmount',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].FirstDepositAmount,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'Turnover',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].Turnover,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'Ggr',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].Ggr,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'Deposit',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].Deposit,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'Withdrawal',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].Withdrawal,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'Bonus',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].Bonus,
        handleClickHeader: this.handleClickHeader
      }), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'Rebate',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].Rebate,
        handleClickHeader: this.handleClickHeader
      }), isDepositFeePercent && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'DepositFee',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].DepositFee,
        handleClickHeader: this.handleClickHeader
      }), isWithdrawalFeePercent && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SortingCell__WEBPACK_IMPORTED_MODULE_19__["default"], {
        isSortAsc: sortingColumn.IsSortAsc,
        sortingColumn: sortingColumn.ColumnName,
        columnName: 'WithdrawalFee',
        title: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["headerText"].WithdrawalFee,
        handleClickHeader: this.handleClickHeader
      }));
    }
  }, {
    key: "_renderDataSection",
    value: function _renderDataSection(dataList) {
      var _this$props5 = this.props,
          param = _this$props5.param,
          isDepositFeePercent = _this$props5.isDepositFeePercent,
          isWithdrawalFeePercent = _this$props5.isWithdrawalFeePercent;
      var productColumnClassName = param.productId === _modules_constants__WEBPACK_IMPORTED_MODULE_16__["selectedAllProduct"] ? 'text-right' : 'text-right highlight';
      var dataRows = [];

      if (dataList.length) {
        var pagingOption = this.props.pagingOption;
        var startIndex = (pagingOption.PageIndex - 1) * pagingOption.PageSize + 1;

        for (var i = 0; i < dataList.length; i++) {
          var dataItem = dataList[i];
          dataRows.push(this._buildDataRow(dataItem, startIndex + i, productColumnClassName, isDepositFeePercent, isWithdrawalFeePercent));
        }
      } else {
        var colSpan = 12 + (isDepositFeePercent ? 1 : 0) + (isWithdrawalFeePercent ? 1 : 0);
        dataRows.push(react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Row"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
          className: "text-center",
          colSpan: colSpan
        }, _modules_constants__WEBPACK_IMPORTED_MODULE_16__["globalResource"].NoInfo)));
      }

      return dataRows;
    }
  }, {
    key: "_buildDataRow",
    value: function _buildDataRow(dataItem, rowNumber, productColumnClassName, isDepositFeePercent, isWithdrawalFeePercent) {
      var turnover = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__["formatDecimal"])(dataItem.Turnover);
      var ggr = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__["formatDecimal"])(dataItem.Ggr);
      var bonus = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__["formatDecimal"])(dataItem.Bonus);
      var rebate = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__["formatDecimal"])(dataItem.Rebate);
      var deposit = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__["formatDecimal"])(dataItem.Deposit);
      var withdrawal = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__["formatDecimal"])(dataItem.Withdrawal);
      var depositFee = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__["formatDecimal"])(dataItem.DepositFee);
      var withdrawalFee = Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__["formatDecimal"])(dataItem.WithdrawalFee);
      var userName = Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_18__["htmlDecode"])(dataItem.UserName);
      var firstDepositAmount = dataItem.FirstDepositAmount == null ? '' : Object(_modules_numberFormat__WEBPACK_IMPORTED_MODULE_15__["formatDecimal"])(dataItem.FirstDepositAmount);
      return react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Row"], null, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-center",
        title: rowNumber
      }, rowNumber), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        title: userName
      }, userName), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        title: dataItem.IbcUserName
      }, dataItem.IbcUserName), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-center",
        title: dataItem.RegisteredDateText
      }, dataItem.RegisteredDateText), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-center",
        title: dataItem.FirstDepositDateText
      }, dataItem.FirstDepositDateText), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-right",
        title: firstDepositAmount
      }, firstDepositAmount), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: productColumnClassName,
        title: turnover
      }, turnover), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: productColumnClassName,
        title: ggr
      }, ggr), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-right",
        title: deposit
      }, deposit), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-right",
        title: withdrawal
      }, withdrawal), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-right",
        title: bonus
      }, bonus), react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-right",
        title: rebate
      }, rebate), isDepositFeePercent && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-right",
        title: depositFee
      }, depositFee), isWithdrawalFeePercent && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Cell"], {
        className: "text-right",
        title: withdrawalFee
      }, withdrawalFee));
    }
  }, {
    key: "render",
    value: function render() {
      var pagingOption = this.props.pagingOption;
      var data = this.state.data;
      return data && react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "table-responsive table-striped my-2 player-detail"
      }, react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_14__["Table"], {
        maxWidth: _modules_constants__WEBPACK_IMPORTED_MODULE_16__["maxWidth"],
        bodyHeight: 300,
        header: this._renderHeader(),
        body: this._renderDataSection(data),
        containerPadding: 10,
        isPaging: true,
        pageOption: pagingOption,
        onPaging: this.handlePaging
      }));
    }
  }]);

  return Content;
}(react__WEBPACK_IMPORTED_MODULE_11__["PureComponent"]);

function mapStateToProps(_ref) {
  var affCommonInfo = _ref.affCommonInfo,
      playerDetail = _ref.playerDetail;
  var param = playerDetail.param,
      pagingOption = playerDetail.pagingOption,
      sortingColumn = playerDetail.sortingColumn;
  var affId = affCommonInfo.affId,
      isDepositFeePercent = affCommonInfo.isDepositFeePercent,
      isWithdrawalFeePercent = affCommonInfo.isWithdrawalFeePercent;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_2___default()({}, {
    param: param,
    pagingOption: pagingOption,
    affId: affId,
    sortingColumn: sortingColumn,
    isDepositFeePercent: isDepositFeePercent,
    isWithdrawalFeePercent: isWithdrawalFeePercent
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_13__["bindActionCreators"])({
    setPagingOption: _actions__WEBPACK_IMPORTED_MODULE_17__["setPagingOption"],
    toggleLoaderUserPanel: _actions__WEBPACK_IMPORTED_MODULE_17__["toggleLoaderUserPanel"],
    fetchData: _actions__WEBPACK_IMPORTED_MODULE_17__["fetchData"],
    setSortingColumn: _actions__WEBPACK_IMPORTED_MODULE_17__["setSortingColumn"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_12__["connect"])(mapStateToProps, mapDispatchToProps)(Content));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/Filter.jsx":
/*!*****************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/Filter.jsx ***!
  \*****************************************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/object/assign */ "./node_modules/@babel/runtime-corejs3/core-js-stable/object/assign.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/find */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/find.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/filter */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/filter.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/map */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/map.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs3/regenerator */ "./node_modules/@babel/runtime-corejs3/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs3/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6__);
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
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @9softstudio/react-monthpicker */ "./node_modules/@9softstudio/react-monthpicker/dist/index.js");
/* harmony import */ var _9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _modules_constants__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../modules/constants */ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/modules/constants.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../actions */ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/actions/index.js");
/* harmony import */ var _modules_reportExcel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../modules/reportExcel */ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/modules/reportExcel.js");
/* harmony import */ var _modules_htmlHelper__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../modules/htmlHelper */ "./Areas/Portal/www/source/js/modules/htmlHelper.js");
/* harmony import */ var _components_select__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../components/select */ "./Areas/Portal/www/source/js/components/select/index.jsx");
/* harmony import */ var _components_multiple_select__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../../../components/multiple-select */ "./Areas/Portal/www/source/js/components/multiple-select/index.jsx");
/* harmony import */ var _modules_utils__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../../modules/utils */ "./Areas/Portal/www/source/js/modules/utils.js");


























var Filter =
/*#__PURE__*/
function (_PureComponent) {
  _babel_runtime_corejs3_helpers_inherits__WEBPACK_IMPORTED_MODULE_12___default()(Filter, _PureComponent);

  function Filter(props) {
    var _context5;

    var _this;

    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7___default()(this, Filter);

    _this = _babel_runtime_corejs3_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_9___default()(this, _babel_runtime_corejs3_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_10___default()(Filter).call(this, props));

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "handleSelectMonth", function (month, year) {
      _this.setState({
        monthDate: new Date(year, month - 1)
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "handleChangeProduct", function (selectedProduct) {
      _this.setState({
        selectedProduct: selectedProduct
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "handleChangeBaseCurrency", function (event) {
      var selectedBaseCurrency = Number(event.target.value);

      _this.setState({
        selectedBaseCurrency: selectedBaseCurrency
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "handleChangeCurrency", function (item, selectedCurrencyList) {
      var currencyList = Object(_modules_utils__WEBPACK_IMPORTED_MODULE_25__["handleChangeMultipleSelected"])(_this.state.currencyList, selectedCurrencyList);

      _this.setState({
        selectedCurrencyList: selectedCurrencyList,
        currencyList: currencyList
      });
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "handleFormatMonthPicker", function (month, year) {
      var _context;

      return _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6___default()(_context = "".concat(_modules_constants__WEBPACK_IMPORTED_MODULE_19__["shortedMonthNames"][month - 1], "-")).call(_context, year);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "handleSearch", function (monthDate) {
      var _context2;

      var _this$state = _this.state,
          selectedProduct = _this$state.selectedProduct,
          selectedBaseCurrency = _this$state.selectedBaseCurrency,
          selectedCurrencyList = _this$state.selectedCurrencyList;
      var param = {
        productId: selectedProduct,
        baseCurrencyId: selectedBaseCurrency,
        currencyIds: selectedCurrencyList,
        monthDate: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6___default()(_context2 = "".concat(monthDate.getMonth() + 1, "/1/")).call(_context2, monthDate.getFullYear())
      };

      _this.props.setParam(param);

      _this.props.setSortingColumn(_modules_constants__WEBPACK_IMPORTED_MODULE_19__["SortingColumnDefault"]);
    });

    _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_13___default()(_babel_runtime_corejs3_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_11___default()(_this), "handleExportExcel",
    /*#__PURE__*/
    _babel_runtime_corejs3_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_5___default()(
    /*#__PURE__*/
    _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee() {
      var _context3;

      var _this$state2, selectedProduct, monthDate, selectedBaseCurrency, selectedCurrencyList, _this$props, affId, sortingColumn, isDepositFeePercent, isWithdrawalFeePercent, param, data, title, reportExcel;

      return _babel_runtime_corejs3_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this$state2 = _this.state, selectedProduct = _this$state2.selectedProduct, monthDate = _this$state2.monthDate, selectedBaseCurrency = _this$state2.selectedBaseCurrency, selectedCurrencyList = _this$state2.selectedCurrencyList;
              _this$props = _this.props, affId = _this$props.affId, sortingColumn = _this$props.sortingColumn, isDepositFeePercent = _this$props.isDepositFeePercent, isWithdrawalFeePercent = _this$props.isWithdrawalFeePercent;
              param = {
                IsExportExcel: true,
                productId: selectedProduct,
                baseCurrencyId: selectedBaseCurrency,
                currencyIds: selectedCurrencyList,
                monthDate: _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6___default()(_context3 = "".concat(monthDate.getMonth() + 1, "/1/")).call(_context3, monthDate.getFullYear()),
                affId: affId,
                sortById: _modules_constants__WEBPACK_IMPORTED_MODULE_19__["SortByIdList"][sortingColumn.ColumnName],
                isSortAsc: sortingColumn.IsSortAsc
              };
              _context4.next = 5;
              return _this.props.fetchData(param);

            case 5:
              data = _context4.sent;

              if (data) {
                title = _this._getReportTitle();
                reportExcel = new _modules_reportExcel__WEBPACK_IMPORTED_MODULE_21__["default"](data, title, isDepositFeePercent, isWithdrawalFeePercent);
                reportExcel.export();
              }

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee);
    })));

    var _this$props2 = _this.props,
        today = _this$props2.today,
        baseCurrencyList = _this$props2.baseCurrencyList,
        _currencyList = _this$props2.currencyList;

    var _monthDate = new Date(today);

    _this.state = {
      selectedProduct: _modules_constants__WEBPACK_IMPORTED_MODULE_19__["selectedAllProduct"],
      monthDate: _monthDate,
      selectedBaseCurrency: baseCurrencyList && baseCurrencyList.length && baseCurrencyList[0].ExchangeId || _modules_constants__WEBPACK_IMPORTED_MODULE_19__["defaultBaseCurrency"],
      selectedCurrencyList: _currencyList && _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3___default()(_context5 = _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2___default()(_currencyList).call(_currencyList, function (item) {
        return item.checked;
      })).call(_context5, function (item) {
        return item.key;
      }).join(',') || '',
      currencyList: _currencyList
    };
    return _this;
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_8___default()(Filter, [{
    key: "_getReportTitle",
    value: function _getReportTitle() {
      var _context6, _context7;

      var baseCurrencyList = this.props.baseCurrencyList;
      var _this$state3 = this.state,
          selectedProduct = _this$state3.selectedProduct,
          monthDate = _this$state3.monthDate,
          selectedBaseCurrency = _this$state3.selectedBaseCurrency;
      var productTitle = selectedProduct === 0 ? 'All Products' : this._getSelectedProductName(selectedProduct);
      var selectedMonthTitle = this.handleFormatMonthPicker(monthDate.getMonth() + 1, monthDate.getFullYear());
      var currency = baseCurrencyList ? _babel_runtime_corejs3_core_js_stable_instance_filter__WEBPACK_IMPORTED_MODULE_2___default()(baseCurrencyList).call(baseCurrencyList, function (x) {
        return x.ExchangeId == selectedBaseCurrency;
      }) : [];
      return _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6___default()(_context6 = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6___default()(_context7 = "Player Detail - ".concat(currency[0] && "Base Currency ".concat(currency[0].Code, " - ") || '')).call(_context7, productTitle, " - ")).call(_context6, selectedMonthTitle);
    }
  }, {
    key: "_getSelectedProductName",
    value: function _getSelectedProductName(productId) {
      var _context8;

      var selectedProduct = _babel_runtime_corejs3_core_js_stable_instance_find__WEBPACK_IMPORTED_MODULE_1___default()(_context8 = this.props.productList).call(_context8, function (p) {
        return p.ProductId === productId;
      });

      return selectedProduct ? selectedProduct.ProductName : '';
    }
  }, {
    key: "render",
    value: function render() {
      var _context9,
          _this2 = this;

      var _this$state4 = this.state,
          selectedProduct = _this$state4.selectedProduct,
          selectedBaseCurrency = _this$state4.selectedBaseCurrency,
          monthDate = _this$state4.monthDate,
          currencyList = _this$state4.currencyList;
      var _this$props3 = this.props,
          productList = _this$props3.productList,
          baseCurrencyList = _this$props3.baseCurrencyList,
          isProduction = _this$props3.isProduction;

      var dataSource = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_6___default()(_context9 = [{
        ProductId: _modules_constants__WEBPACK_IMPORTED_MODULE_19__["selectedAllProduct"],
        ProductName: _modules_constants__WEBPACK_IMPORTED_MODULE_19__["globalResource"].All
      }]).call(_context9, productList);

      return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("div", {
        className: "filter-container"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Form"], {
        inline: true,
        tag: "div"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["FormGroup"], {
        className: "mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Label"], {
        className: "mr-2"
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_19__["globalResource"].Product), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components_select__WEBPACK_IMPORTED_MODULE_23__["default"], {
        dataSource: dataSource,
        keyField: "ProductId",
        valueField: "ProductName",
        hasInputOption: true,
        selectedKey: selectedProduct,
        onChange: this.handleChangeProduct
      })), baseCurrencyList && baseCurrencyList.length !== 0 && react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["FormGroup"], {
        className: "mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Label"], {
        className: "mr-2"
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_19__["globalResource"].BaseCurrency), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Input"], {
        type: "select",
        name: "BaseCurrency",
        id: "BaseCurrency",
        value: selectedBaseCurrency,
        onChange: this.handleChangeBaseCurrency
      }, _babel_runtime_corejs3_core_js_stable_instance_map__WEBPACK_IMPORTED_MODULE_3___default()(baseCurrencyList).call(baseCurrencyList, function (c) {
        return react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("option", {
          key: c.ExchangeId,
          value: c.ExchangeId
        }, Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_22__["htmlDecode"])(c.Code));
      }), !isProduction && react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("option", {
        value: "20"
      }, "UUS"))), !isProduction && currencyList && currencyList.length !== 0 && react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["FormGroup"], {
        className: "mr-sm-2 multiple-currency-filter"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Label"], {
        for: "Currency",
        className: "mr-2"
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_19__["globalResource"].Currency), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_components_multiple_select__WEBPACK_IMPORTED_MODULE_24__["default"], {
        dataSource: currencyList,
        keyField: "key",
        valueField: "name",
        statusField: "checked",
        maxDisplayItemCount: 1,
        noneSelectedLabel: "None Select",
        selectedAllLabel: "All",
        onChange: this.handleChangeCurrency
      })), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["FormGroup"], {
        className: "mr-sm-2"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Label"], {
        className: "mr-sm-2"
      }, _modules_constants__WEBPACK_IMPORTED_MODULE_19__["resource"].Month), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_18___default.a, {
        minMonth: _modules_constants__WEBPACK_IMPORTED_MODULE_19__["minMonthDate"].month,
        minYear: _modules_constants__WEBPACK_IMPORTED_MODULE_19__["minMonthDate"].year,
        selectedDropdownYear: monthDate.getFullYear(),
        selectedMonth: monthDate.getMonth() + 1,
        onSelect: this.handleSelectMonth,
        onFormat: this.handleFormatMonthPicker,
        iconElement: react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("span", {
          className: "oi oi-calendar icon-calendar ml-1"
        })
      })), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Button"], {
        outline: true,
        color: "primary",
        type: "button",
        onClick: function onClick() {
          return _this2.handleSearch(monthDate);
        }
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("span", {
        className: "oi oi-magnifying-glass"
      }), " ", _modules_constants__WEBPACK_IMPORTED_MODULE_19__["globalResource"].Search), react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_17__["Button"], {
        color: "link",
        type: "button",
        className: "ml-auto btn-excel",
        onClick: this.handleExportExcel,
        title: "Export Excel"
      }, react__WEBPACK_IMPORTED_MODULE_14___default.a.createElement("span", {
        className: "oi icon-excel"
      }))));
    }
  }]);

  return Filter;
}(react__WEBPACK_IMPORTED_MODULE_14__["PureComponent"]);

function mapStateToProps(_ref2) {
  var today = _ref2.today,
      affCommonInfo = _ref2.affCommonInfo,
      playerDetail = _ref2.playerDetail,
      productList = _ref2.productList,
      currencyList = _ref2.currencyList,
      baseCurrencyList = _ref2.baseCurrencyList,
      isProduction = _ref2.isProduction;
  var param = playerDetail.param,
      sortingColumn = playerDetail.sortingColumn;
  var affId = affCommonInfo.affId,
      isDepositFeePercent = affCommonInfo.isDepositFeePercent,
      isWithdrawalFeePercent = affCommonInfo.isWithdrawalFeePercent;
  return _babel_runtime_corejs3_core_js_stable_object_assign__WEBPACK_IMPORTED_MODULE_0___default()({}, {
    param: param,
    affId: affId,
    today: today,
    sortingColumn: sortingColumn,
    productList: productList,
    currencyList: currencyList,
    baseCurrencyList: baseCurrencyList,
    isProduction: isProduction,
    isDepositFeePercent: isDepositFeePercent,
    isWithdrawalFeePercent: isWithdrawalFeePercent
  });
}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_16__["bindActionCreators"])({
    setParam: _actions__WEBPACK_IMPORTED_MODULE_20__["setParam"],
    fetchData: _actions__WEBPACK_IMPORTED_MODULE_20__["fetchData"],
    setSortingColumn: _actions__WEBPACK_IMPORTED_MODULE_20__["setSortingColumn"]
  }, dispatch);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_15__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/SortingCell.jsx":
/*!**********************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/player-detail/components/SortingCell.jsx ***!
  \**********************************************************************************************/
/*! exports provided: SortingCell, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortingCell", function() { return SortingCell; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "./node_modules/reactstrap/es/index.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @9softstudio/react-fixed-table-header */ "./node_modules/@9softstudio/react-fixed-table-header/dist/index.js");
/* harmony import */ var _9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_2__);



var SortingCell = function SortingCell(props) {
  var isSortAsc = props.isSortAsc,
      sortingColumn = props.sortingColumn,
      columnName = props.columnName,
      title = props.title;
  var isSelectedColumn = sortingColumn === columnName;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_fixed_table_header__WEBPACK_IMPORTED_MODULE_2__["Cell"], {
    header: true,
    colWidth: 100,
    className: "th"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    className: "p-0 th-wrapper",
    color: "link",
    onClick: function onClick() {
      return props.handleClickHeader(columnName);
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "icon-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "caret asc ".concat(isSelectedColumn && isSortAsc ? "current" : '')
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "caret desc ".concat(isSelectedColumn && !isSortAsc ? "current" : '')
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(SortingCell));

/***/ }),

/***/ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/modules/reportExcel.js":
/*!******************************************************************************************!*\
  !*** ./Areas/Portal/www/source/js/pages/user-panel/player-detail/modules/reportExcel.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReportExcel; });
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs3/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/concat */ "./node_modules/@babel/runtime-corejs3/core-js-stable/instance/concat.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs3/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs3/helpers/createClass */ "./node_modules/@babel/runtime-corejs3/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_excel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../modules/excel */ "./Areas/Portal/www/source/js/modules/excel.js");
/* harmony import */ var _modules_htmlHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../modules/htmlHelper */ "./Areas/Portal/www/source/js/modules/htmlHelper.js");
/* harmony import */ var _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../modules/excelStyleConstant */ "./Areas/Portal/www/source/js/modules/excelStyleConstant.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./Areas/Portal/www/source/js/pages/user-panel/player-detail/modules/constants.js");








var HEADER_ROW_INDEX = 0;
var DATA_ROW_INDEX = 1;
var TOTAL_COLUMN = 12;
var MAIN_SECTION_STYLE = 'mainSectionStyle';
var fields = {
  Index: 'Index',
  UserName: 'UserName',
  IbcUserName: 'IbcUserName',
  RegisteredDateText: 'RegisteredDateText',
  FirstDepositDateText: 'FirstDepositDateText',
  FirstDepositAmount: 'FirstDepositAmount',
  Turnover: 'Turnover',
  Ggr: 'Ggr',
  Deposit: 'Deposit',
  Withdrawal: 'Withdrawal',
  Bonus: 'Bonus',
  Rebate: 'Rebate',
  DepositFee: 'DepositFee',
  WithdrawalFee: 'WithdrawalFee'
};

var ReportExcel =
/*#__PURE__*/
function () {
  function ReportExcel(data, title, isDepositFeePercent, isWithdrawalPercent) {
    _babel_runtime_corejs3_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ReportExcel);

    this.data = data;
    this.title = title;
    this.isDepositFeePercent = isDepositFeePercent;
    this.isWithdrawalPercent = isWithdrawalPercent;
    this.column = 2 - (isDepositFeePercent ? 1 : 0) - (isWithdrawalPercent ? 1 : 0);
    this.worksheet = {};
    this.currentRowIndex = DATA_ROW_INDEX;
    this.mergeConfig = [];
    this.columnConfigs = this._getcolumnConfigs(isDepositFeePercent, isWithdrawalPercent);
  }

  _babel_runtime_corejs3_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ReportExcel, [{
    key: "export",
    value: function _export() {
      var _this = this;

      _modules_excel__WEBPACK_IMPORTED_MODULE_4__["default"].process(function () {
        _this._createHeader(_this.column);

        _this._createBodyData(_this.column);

        _this._createExcelConfig(_this.isDepositFeePercent, _this.isWithdrawalPercent, _this.column);

        _modules_excel__WEBPACK_IMPORTED_MODULE_4__["default"].export(_this.worksheet, _this.title);
      });
    }
  }, {
    key: "_createHeader",
    value: function _createHeader(column) {
      for (var i = 0; i < TOTAL_COLUMN - column; i++) {
        var fieldName = this.columnConfigs[i].field;
        var address = _modules_excel__WEBPACK_IMPORTED_MODULE_4__["default"].getCellAddress({
          c: i,
          r: HEADER_ROW_INDEX
        });
        this.worksheet[address] = {
          t: "s",
          v: _constants__WEBPACK_IMPORTED_MODULE_7__["headerText"][fieldName],
          s: _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["headerCellStyle"]
        };
      }
    }
  }, {
    key: "_createBodyData",
    value: function _createBodyData(column) {
      var mainData = this.data.MainData;

      for (var i = 0; i < mainData.length; i++) {
        var item = mainData[i];

        for (var j = 0; j < TOTAL_COLUMN - column; j++) {
          var address = _modules_excel__WEBPACK_IMPORTED_MODULE_4__["default"].getCellAddress({
            c: j,
            r: this.currentRowIndex
          });
          this.worksheet[address] = this._buildDataRow(item, MAIN_SECTION_STYLE, i, j);
        }

        this.currentRowIndex++;
      }
    }
  }, {
    key: "_buildDataRow",
    value: function _buildDataRow(item, sectionStyleName, rowIndex, colIndex) {
      var columnConfig = this.columnConfigs[colIndex];
      var fieldName = columnConfig.field;
      var value = fieldName === fields.Index ? rowIndex + 1 : item[fieldName];

      if (fieldName === fields.FirstDepositAmount) {
        value = value === null ? '' : value;
      }

      return {
        t: _modules_excel__WEBPACK_IMPORTED_MODULE_4__["default"].getCellType(value),
        v: Object(_modules_htmlHelper__WEBPACK_IMPORTED_MODULE_5__["htmlDecode"])(value),
        s: columnConfig[sectionStyleName]
      };
    }
  }, {
    key: "_createExcelConfig",
    value: function _createExcelConfig(isDepositFeePercent, isWithdrawalPercent, column) {
      var _context;

      var cellStart = _modules_excel__WEBPACK_IMPORTED_MODULE_4__["default"].getCellAddress({
        r: 0,
        c: 0
      });
      var cellEnd = _modules_excel__WEBPACK_IMPORTED_MODULE_4__["default"].getCellAddress({
        r: this.currentRowIndex,
        c: TOTAL_COLUMN - column
      });
      this.worksheet["!ref"] = _babel_runtime_corejs3_core_js_stable_instance_concat__WEBPACK_IMPORTED_MODULE_1___default()(_context = "".concat(cellStart, ":")).call(_context, cellEnd);
      var columnList = [{
        wpx: 70
      }, {
        wpx: 200
      }, {
        wpx: 200
      }, {
        wpx: 200
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
        wpx: 150
      }, {
        wpx: 150
      }, {
        wpx: 150
      }];

      if (isDepositFeePercent) {
        columnList.push({
          wpx: 150
        });
      }

      if (isWithdrawalPercent) {
        columnList.push({
          wpx: 150
        });
      }

      this.worksheet['!cols'] = columnList;
    }
  }, {
    key: "_getcolumnConfigs",
    value: function _getcolumnConfigs(isDepositFeePercent, isWithdrawalPercent) {
      var columnlist = [_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.Index
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.UserName
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.IbcUserName
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].left), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.RegisteredDateText
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.FirstDepositDateText
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].center), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.FirstDepositAmount
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.Turnover
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.Ggr
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.Deposit
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.Withdrawal
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.Bonus
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal), _babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
        field: fields.Rebate
      }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal)];

      if (isDepositFeePercent) {
        columnlist.push(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
          field: fields.DepositFee
        }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal));
      }

      if (isWithdrawalPercent) {
        columnlist.push(_babel_runtime_corejs3_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({
          field: fields.WithdrawalFee
        }, MAIN_SECTION_STYLE, _modules_excelStyleConstant__WEBPACK_IMPORTED_MODULE_6__["bodyCellStyle"].decimal));
      }

      return columnlist;
    }
  }]);

  return ReportExcel;
}();



/***/ })

}]);
//# sourceMappingURL=playerDetail-1a09fdff10467251f6b0.chunk.js.map