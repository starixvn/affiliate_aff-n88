import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';;

import ReportTitle from '../../../../components/ReportTitle';
import GridData from './GridData';

export const Content = (props) => {

    const { param } = props;
    const [title, setTitle] = useState('');

    useEffect(() => {
        const titleString = _buildTitleString();

        setTitle(titleString);
    }, [JSON.stringify(param)]);

    const _buildTitleString = () => {
        let title = '';

        if (param) {
            const { AffUserName, LanguageCode, FromDate, ToDate } = param;
            const { languageCodeList } = props;

            title = [
                'MARKETING PAGE STATISTICS',
                AffUserName,
                languageCodeList[LanguageCode],
                FromDate && ToDate ? `FROM ${FromDate} TO ${ToDate}` : null
            ].filter(Boolean).join(' - ');
        }

        return title;
    }

    const _renderReportTitle = () => {
        return <div className="d-flex align-items-center">
            {title}
            {/*                
                <button type="button" className="ml-auto btn btn-link btn-excel" title="Export Excel">
                <span className="oi icon-excel"></span>
            </button>
            */ }
        </div>
    };

    return (
        <div className="data-content my-2 report-content-container marketing-report-container">
            {title && <ReportTitle content={_renderReportTitle()} />}
            <GridData />
        </div>
    )
}

function mapStateToProps({ param, languageCodeList }) {
    return Object.assign({}, { param, languageCodeList });
}

export default connect(mapStateToProps)(React.memo(Content));