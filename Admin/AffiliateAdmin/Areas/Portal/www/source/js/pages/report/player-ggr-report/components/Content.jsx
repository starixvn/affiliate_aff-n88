import React, { Component, createRef } from "react";

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GridData from './GridData';
import ReportTitle from '../../../../components/ReportTitle';

import { toggleLoader } from '../../../../actions/loaderAction';
//import ReportExcel from '../modules/reportExcel';
import { post } from '../../../../modules/ajaxRequest';

export class Content extends Component {
    constructor(props) {
        super(props);

        this.gridDataRef = createRef();
    }

    shouldComponentUpdate(nextProps) {
        const { reportTitle } = this.props;

        return nextProps.reportTitle !== reportTitle;
    }

    handleClickBreadcrumb = () => {
        this.gridDataRef.current._resetScroll();
        this.props.setViewLevel(viewLevel.main);
    }

    handleExportExcel = async () => {
        this.props.toggleLoader(true);
        const { param, reportTitle, currentViewLevel } = this.props;
        const isMainView = currentViewLevel === viewLevel.main;
        const url = `Portal/Report/${isMainView ? 'GetMainData' : 'GetDetailData'}`;
        const postData = Object.assign({}, param, { IsExportExcel: true });
        const response = await post(url, postData);
        // if (response && response.status === 200) {
        //     const reportExcel = new ReportExcel(response.data, reportTitle, isMainView);
        //     reportExcel.export();
        // }
        this.props.toggleLoader(false);
    }

    _buildReportTitle() {
        const { reportTitle } = this.props;

        return (
            <div className="d-flex align-items-center">
                {reportTitle}
                <button type="button" className="ml-auto btn btn-link btn-excel" onClick={this.handleExportExcel} title="Export Excel">
                    <span className="oi icon-excel"></span>
                </button>
            </div>
        )
    }

    render() {
        const { reportTitle, isN8B } = this.props;

        return (
            <div className="data-content my-2 report-content-container">
                {
                    reportTitle && (
                        <ReportTitle content={this._buildReportTitle()} />
                    )
                }
                <GridData ref={this.gridDataRef} />
            </div>
        );
    }
}

function mapStateToProps({ reportTitle, currentViewLevel, param }) {
    return Object.assign({}, { reportTitle, currentViewLevel, param });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ toggleLoader }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);