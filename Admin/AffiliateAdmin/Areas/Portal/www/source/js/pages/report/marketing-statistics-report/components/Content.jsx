import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';;
import { bindActionCreators } from 'redux';

import ReportTitle from '../../../../components/ReportTitle';
import { setLanguageCodeList } from '../actions';

import Detail from './Detail';
import GridData from './GridData';

export const Content = (props) => {

    const { param } = props;
    const [title, setTitle] = useState('');

    useEffect(() => {
        props.setLanguageCodeList(_handleLanguageCodeList());
    }, []);

    useEffect(() => {
        const titleString = _buildTitleString();

        setTitle(titleString);
    }, [JSON.stringify(props.param)]);

    const _handleLanguageCodeList = () => {
        const { languageList } = props;

        const list = {};
        for (let languageItem of languageList) {
            list[languageItem.LanguageCode] = languageItem.LanguageName;
        }

        return list;
    }

    const _buildTitleString = () => {
        const { AffUserName, LanguageCode, FromDate, ToDate } = param || {};

        let title = '';
        if (param) {
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

    return title && (
        <div id="marketing-statistics-report-container" className="data-content my-2 report-content-container">
            <ReportTitle content={_renderReportTitle()} />
            <GridData />
            <Detail />
        </div>
    )
}

function mapStateToProps({ param, languageList, languageCodeList }) {
    return Object.assign({}, { param, languageList, languageCodeList });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setLanguageCodeList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Content));