import React, { PureComponent, createRef, Fragment } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'reactstrap';
import { Pager } from '@9softstudio/react-fixed-table-header';

import { formatDecimal } from '../../../../modules/numberFormat';
import { setPagingOption, setViewLevel, setParam } from '../actions';
import { post } from '../../../../modules/ajaxRequest';
import { toggleLoader } from '../../../../actions/loaderAction';
import { globalResource } from '../../../../modules/globalResource';
import { totalText, headerText } from '../libs/constants';

export class GridData extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            gridData: null,
            total: null
        }

        this.tableRef = createRef();
    }

    componentDidUpdate(prevProps) {
        const { param } = this.props;

        if (!!param && param !== prevProps.param) {
            //this.fetchData(param);
            this.setState({gridData: []})
        }
    }

    async fetchData(param) {
        this._resetScroll();
        this.props.toggleLoader(true);
        const url = 'Portal/PlayerGgrReport/GetPlayerGgrReport';
        const response = await post(url, param);

        if (response && response.status === 200) {
            const { MainData, Total, TotalItem } = response.data;

            this.setState({ gridData: MainData, total: Total });
            this.props.setPagingOption({ TotalItem, PageIndex: param.PageIndex, PageSize: param.PageSize });
        }
        this.props.toggleLoader(false);
    }

    _renderProductColumns = () => {
        return (
            <React.Fragment>
                <th width={100} title={headerText.Turnover}>{headerText.Turnover}</th>
                <th width={100} title={headerText.Ggr}>{headerText.Ggr}</th>
            </React.Fragment>
        );
    }

    _renderHeader(selectedProducts) {
        return [
            <tr className="freeze-row freeze-row-h1" key="thead-1">
                <th className="freeze-column-header freeze-column-header-0" width={120} rowSpan="2" title={headerText.AffName}>{headerText.AffName}</th>
                <th className="freeze-column-header freeze-column-header-1" width={120} rowSpan="2" title={headerText.PlayerName}>{headerText.PlayerName}</th>
                <th width={120} rowSpan="2" title={headerText.RegistrationDate}>{headerText.RegistrationDate}</th>
                <th width={120} rowSpan="2" title={headerText.FdmDate}>{headerText.FdmDate}</th>
                <th width={200} colSpan="2" height={28} title={headerText.AllSelectedProducts}>{headerText.AllSelectedProducts}</th>
                {
                    selectedProducts.map(item => {
                        return (
                            <th width={200} colSpan="2" title={item.name}>{item.name}</th>
                        )
                    })
                }
            </tr>,
            <tr className="freeze-row freeze-row-h2" key="thead-2">
                {
                    this._renderProductColumns()
                }
                {
                    selectedProducts.map(item => {
                        return this._renderProductColumns()
                    })
                }
            </tr>
        ];
    }

    _renderDataSection(dataList, selectedProducts) {
        const dataRows = [];

        if (dataList.length) {

            for (let i = 0; i < dataList.length; i++) {
                const dataItem = dataList[i];
                dataRows.push(this._buildDataRow(dataItem, i, selectedProducts));
            }
        }
        else {
            dataRows.push(<tr key="no-info">
                <td className="text-center" colSpan={6 + (selectedProducts.length * 2)}>{globalResource.NoInfo}</td>
            </tr>);
        }

        return dataRows;
    }

    _buildDataRow(dataItem, index, selectedProducts) {
        const isTotalRow = !!dataItem.AffName === null;
        const totalTurnover = formatDecimal(dataItem.TotalTurnover);
        const totalGgr = formatDecimal(dataItem.TotalGgr);

        return (
            <tr key={`dataRow-${index}`}>
                {
                    isTotalRow ? (
                        <td className="freeze-column freeze-column-0 text-right" title={totalText}>{totalText}</td>
                    ) : (
                        <Fragment>
                            <td className="freeze-column freeze-column-0" title={dataItem.AffName}>{dataItem.AffName}</td>
                            <td className="freeze-column freeze-column-1" title={dataItem.PlayerName}>{dataItem.PlayerName}</td>
                        </Fragment>
                    )
                }
                <td className="text-center" title={dataItem.RegistrationDate}>{dataItem.RegistrationDate}</td>
                <td className="text-center" title={dataItem.FdmDate}>{dataItem.FdmDate}</td>
                <td className="text-right" title={totalTurnover}>{totalTurnover}</td>
                <td className="text-right" title={totalGgr}>{totalGgr}</td>
                {this._buildProductCells(dataItem.ProductReportList, selectedProducts)}
            </tr>
        )
    }

    _buildProductCells(productReportList, selectedProducts) {
        return selectedProducts.map(item => {
            const info = productReportList[item.key];

            const turnover = formatDecimal(info.Turnover);
            const ggr = formatDecimal(info.Ggr);

            return (
                <React.Fragment>
                    <td className="text-right" title={turnover}>{turnover}</td>
                    <td className="text-right" title={ggr}>{ggr}</td>
                </React.Fragment>
            )
        })
    }

    handleViewMonthOnMonth = (UserName) => {
        const { param, pagingOption } = this.props;

        const postParam = Object.assign({}, param, {
            UserName,
            SortType: sortByMonthOnMonthView.Month,
            SortDirectionType: sortDirectionType.descending,
            PageIndex: 1,
            PageSize: pagingOption.PageSize
        })

        this.props.setViewLevel(viewLevel.monthOnMonth);
        this.props.setParam(postParam);

        this._resetScroll();
    }

    handlePaging = (index, size) => {
        const newPaging = {
            PageIndex: index,
            PageSize: size
        };
        this.props.setPagingOption(newPaging);

        const newParam = Object.assign({}, this.props.param, newPaging);
        this.fetchData(newParam);
    }

    _getMinWidthOfTable = (numberOfProduct) => {
        let minWidth = 600 + numberOfProduct * 2 * 100;

        return minWidth
    }

    _resetScroll = () => {
        if (!!this.tableRef.current) {
            this.tableRef.current.scrollTop = 0;
            this.tableRef.current.scrollLeft = 0;
        }
    }

    render() {
        const { gridData, total } = this.state;
        const selectedProducts = this.props.productList.filter(p => p.checked);
        const minWidth = this._getMinWidthOfTable(selectedProducts.length);

        return gridData && (
            <Fragment>
                <div className="table-responsive ggr-report-table-container" style={{ 'max-height': (window.innerHeight || 775) - 320 }} ref={this.tableRef}>
                    <Table className="freeze-table" style={{ minWidth: minWidth }}>
                        <thead>
                            {
                                this._renderHeader(selectedProducts)
                            }
                        </thead>
                        <tbody>
                            {
                                this._renderDataSection(gridData, selectedProducts)
                            }
                        </tbody>
                        <tfoot>
                            {total && this._renderDataSection([total], selectedProducts)}
                        </tfoot>
                    </Table>
                </div>
                <Pager
                    pageOption={this.props.pagingOption}
                    onPaging={this.handlePaging} />
            </Fragment>
        );
    }
}

function mapStateToProps({ pagingOption, param, currentViewLevel, productList }) {
    return Object.assign({}, { pagingOption, param, currentViewLevel, productList });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setPagingOption, toggleLoader, setViewLevel, setParam }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(GridData);