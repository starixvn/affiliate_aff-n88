import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DatePicker } from '@9softstudio/react-datepicker';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { globalResource } from '../../../../modules/globalResource';
import { formatUnit, handleAfterChangeFromDate, handleAfterChangeToDate } from '../../../../modules/utils';
import { setParam, setExpandAffChannel, setDetailGridData } from '../actions';

export const Filter = (props) => {
    const { today, languageList } = props;

    const now = new Date(today);
    const nowMonth = now.getMonth() + 1;
    const nowYear = now.getFullYear();
    const nowDay = now.getDate();

    const nowString = `${formatUnit(nowMonth)}/${formatUnit(nowDay)}/${nowYear}`;
    const defaultFromDate = `${formatUnit(nowMonth)}/01/${nowYear}`;

    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(nowYear - 1);

    const oneYearAgoString = `${formatUnit(oneYearAgo.getMonth() + 1)}/${formatUnit(oneYearAgo.getDate())}/${oneYearAgo.getFullYear()}`;

    const [date, setDate] = useState({ fromDate: defaultFromDate, toDate: nowString });
    const [affUserName, setAffUserName] = useState('');
    const [languageCode, setLanguageCode] = useState('');
    const [includedInActive, setIncludedInActive] = useState(false);

    const _handlePressEnter = (event) => {
        if (event.charCode === 13) {
            event.preventDefault();

            _handleSearch();
        }
    }

    const _handleSearch = () => {
        const { pagingOption } = props;
        const { fromDate, toDate } = date;

        const param = Object.assign({}, {
            AffUserName: affUserName,
            FromDate: fromDate,
            ToDate: toDate,
            LanguageCode: languageCode || _getAllLanguageCode(),
            IncludedInActive: includedInActive,
            PageIndex: 1,
            PageSize: pagingOption.PageSize
        });

        props.setParam(param);
        props.setDetailGridData(null);
    }

    const _handleChangeDate = (momentDate, type) => {
        const monthRange = 1;

        setDate((prev) => {
            const { fromDate, toDate } =
                type === 'from'
                    ? handleAfterChangeFromDate(momentDate, prev.toDate, monthRange)
                    : handleAfterChangeToDate(momentDate, prev.fromDate, monthRange);

            return { ...prev, fromDate, toDate };
        });
    };

    const _handleExpand = () => {
        props.setExpandAffChannel(!props.expandAffChannel)
    }

    const _getAllLanguageCode = () => {
        const languageCodes = languageList.map(item => item.LanguageCode);
        return languageCodes.join(',');
    }

    return (
        <div className="filter-container">
            <Form inline tag="div">
                <FormGroup className="mr-sm-2 my-2">
                    <Label className="mr-sm-2">{globalResource.From}</Label>
                    <DatePicker minDate={oneYearAgoString} maxDate={nowString} date={date.fromDate}
                        iconElement={(<span className="oi oi-calendar icon-calendar ml-1"></span>)}
                        onChange={(momentDate) => _handleChangeDate(momentDate, 'from')} />
                </FormGroup>
                <FormGroup className="mr-sm-2 my-2">
                    <Label className="mr-sm-2">{globalResource.To}</Label>
                    <DatePicker minDate={date.fromDate} maxDate={nowString} date={date.toDate}
                        iconElement={(<span className="oi oi-calendar icon-calendar ml-1"></span>)}
                        onChange={(momentDate) => _handleChangeDate(momentDate, 'to')} />
                </FormGroup>
                <FormGroup className="mr-sm-2 my-2">
                    <Label htmlFor="Affiliate" className="mr-sm-2">Affiliate</Label>
                    <Input type="text" name="affUserName" id="affUserName" maxLength="30"
                        onKeyPress={_handlePressEnter}
                        onChange={(e) => setAffUserName(e.target.value)}
                        value={affUserName} />
                </FormGroup>
                <FormGroup className="mr-sm-2 my-2">
                    <Label htmlFor="languageCode" className="mr-sm-2">Language</Label>
                    <Input type="select" name="languageCode" id="languageCode"
                        value={languageCode}
                        onChange={(e) => setLanguageCode(e.target.value)}>
                        <option value="">All Language</option>
                        {
                            languageList.map(item => {
                                return (<option key={`language-${item.ShortedLanguageCode}`} value={item.LanguageCode}>{item.LanguageName}</option>)
                            })
                        }
                    </Input>
                </FormGroup>
                <FormGroup className="mr-sm-2 my-2">
                    <Label check>
                        Include Inactive Tracking Link
                        <Input name="includedInActive" className="ml-1" type="checkbox"
                            checked={includedInActive}
                            onChange={e => setIncludedInActive(e.target.checked)} />
                    </Label>
                </FormGroup>
                <FormGroup className="mr-sm-2 my-2">
                    <Button outline className="mr-sm-2" color="primary" type="button" onClick={_handleSearch}>
                        <span className="oi oi-magnifying-glass"></span> {globalResource.Search}
                    </Button>
                </FormGroup>
                <FormGroup className="mr-sm-2 my-2">
                    <Button outline className="mr-sm-2" color="primary" type="button" onClick={_handleExpand}>
                        Collapse/Expand
                    </Button>
                </FormGroup>
            </Form>
            <p><strong className="text-danger">* </strong>Note: Data is available from {oneYearAgoString}.</p>
        </div>
    )
}

function mapStateToProps({ pagingOption, languageList, today, expandAffChannel }) {
    return Object.assign({}, { pagingOption, languageList, today, expandAffChannel });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setParam, setExpandAffChannel, setDetailGridData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Filter));