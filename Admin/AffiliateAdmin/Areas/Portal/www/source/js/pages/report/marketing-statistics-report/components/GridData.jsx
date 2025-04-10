import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'reactstrap';
import { Pager } from '@9softstudio/react-fixed-table-header';

import { fetchData, toggleLoader, setPagingOption, setParam, setDetailGridData } from '../actions';
import { format } from '../../../../modules/numberFormat';
import { headerText } from '../libs/constants';
import { globalResource } from '../../../../modules/globalResource';

export const GridData = (props) => {
    const [total, setTotal] = useState(null);
    const [gridData, setGridData] = useState(null);
    const [expandedState, setExpandedState] = useState({});

    useEffect(() => {
        _fetchData(props.param);
    }, [props.param]);

    useEffect(() => {
        if (gridData) {
            _toggleExpandAll();
        }
    }, [props.expandAffChannel]);

    const _fetchData = async (param) => {
        if (!param) return;

        props.toggleLoader(true);

        const rawData = await props.fetchData(param);
        if (rawData) {
            const { MainData, Total, TotalItem } = rawData;

            props.setPagingOption({ TotalItem, PageIndex: param.PageIndex, PageSize: param.PageSize })

            setTotal(Total);

            const processedGridData = _processGridData(MainData);
            setGridData(processedGridData);

            const initialExpandedState = {};
            processedGridData?.forEach(item => {
                initialExpandedState[item.AffUserName] = true;
            });
            setExpandedState(initialExpandedState);
        }
        props.toggleLoader(false);
    }

    const _processGridData = (rawData) => {
        if (!rawData) return null;

        return Object.values(rawData.reduce((acc, item) => {
            const { AffUserName, ChannelName, TotalClick, UniqueClick, SignUps, Fdm, ChannelLink } = item;

            if (!acc[AffUserName]) {
                acc[AffUserName] = {
                    AffUserName,
                    TotalClick: 0,
                    UniqueClick: 0,
                    SignUps: 0,
                    Fdm: 0,
                    Channels: []
                };
            }

            const affiliate = acc[AffUserName];
            affiliate.TotalClick += TotalClick;
            affiliate.UniqueClick += UniqueClick;
            affiliate.SignUps += SignUps;
            affiliate.Fdm += Fdm;

            affiliate.Channels.push({
                ChannelName,
                TotalClick,
                UniqueClick,
                SignUps,
                Fdm,
                ChannelLink
            });

            return acc;
        }, {}));
    }

    const _toggleExpandAll = () => {
        if (!gridData) return;

        const newExpandedState = {};
        gridData.forEach(item => {
            newExpandedState[item.AffUserName] = props.expandAffChannel;
        });

        setExpandedState(newExpandedState);
    }

    const _handleDetailGridData = (affUserName, channelName) => {
        const { LanguageCode } = props.param;

        const affiliate = gridData?.find(item => item.AffUserName === affUserName);
        const channel = affiliate?.Channels.find(item => item.ChannelName === channelName);

        if (!channel?.ChannelLink) {
            return props.setDetailGridData([]);
        }

        const links = LanguageCode === ''
            ? channel.ChannelLink
            : channel.ChannelLink.filter(item => item.MarketName === props.languageCodeList[LanguageCode]);

        props.setDetailGridData(links);
    }

    const _toggleAffiliate = (affUserName) => {
        setExpandedState(prevState => ({
            ...prevState,
            [affUserName]: !prevState[affUserName]
        }));
    }

    const _renderTableCell = (value, className = "text-right") => (
        <td title={value} className={className}>{format(value)}</td>
    );

    const _renderCommonCells = (item) => (
        <>
            {_renderTableCell(item.TotalClick)}
            {_renderTableCell(item.UniqueClick)}
            {_renderTableCell(item.SignUps)}
            {_renderTableCell(item.Fdm)}
        </>
    );

    const _renderHeader = () => (
        <tr>
            <th title={headerText.Affiliate} width='50%'>{headerText.Affiliate}</th>
            <th title={headerText.TotalClick} width='12.5%'>{headerText.TotalClick}</th>
            <th title={headerText.UniqueClick} width='12.5%'>{headerText.UniqueClick}</th>
            <th title={headerText.SignUps} width='12.5%'>{headerText.SignUps}</th>
            <th title={headerText.Fdm} width='12.5%'>{headerText.Fdm}</th>
        </tr>
    );

    const _renderNoData = () => (
        <tr>
            <td colSpan="5" className="text-center">{globalResource.NoInfo}</td>
        </tr>
    );

    const _renderAffiliateRow = (affiliate, onToggle) => (
        <tr key={`aff-${affiliate.AffUserName}`} className="affiliate-row">
            <td title={affiliate.AffUserName} onClick={() => onToggle(affiliate.AffUserName)}>
                <div className="p-0 th-wrapper">
                    <strong>{affiliate.AffUserName}</strong>
                    <div className="icon-container">
                        <span className={`caret ${expandedState[affiliate.AffUserName] ? 'expand current' : 'collapsed'}`}></span>
                    </div>
                </div>
            </td>
            {_renderCommonCells(affiliate)}
        </tr>
    );

    const _renderChannelRow = (channel, affiliate, channelIndex) => (
        <tr key={`channel-${affiliate}-${channelIndex}`} className="channel-row">
            <td title={channel.ChannelName} className="pl-4">
                <span className="channel-name"
                    onClick={() => _handleDetailGridData(affiliate, channel.ChannelName)}>
                    {channel.ChannelName}
                </span>
            </td>
            {_renderCommonCells(channel)}
        </tr>
    );

    const _renderTotalRow = (totalData) => (
        <tr key="total" className="total-row">
            <td title={headerText.Total}>{headerText.Total}</td>
            {_renderCommonCells(totalData)}
        </tr>
    );

    const _renderChannelRows = (affiliate) => (
        expandedState[affiliate.AffUserName]
            ? affiliate.Channels.map((channel, idx) =>
                _renderChannelRow(channel, affiliate.AffUserName, idx)
            ) : []
    );

    const _renderDataSection = (dataList) => {
        if (!dataList?.length) return _renderNoData();

        const rows = [];
        dataList.forEach(affiliate => {
            rows.push(_renderAffiliateRow(affiliate, _toggleAffiliate));
            rows.push(..._renderChannelRows(affiliate));
        });

        return rows;
    }

    const _handlePaging = (index, size) => {
        const newPaging = { PageIndex: index, PageSize: size };
        props.setPagingOption(newPaging);
        props.setParam({ ...props.param, ...newPaging });
    }

    return gridData && (
        <Fragment>
            <div className="table-responsive">
                <Table className="freeze-table">
                    <thead>{_renderHeader()}</thead>
                    <tbody>{_renderDataSection(gridData)}</tbody>
                    <tfoot>{total && _renderTotalRow(total)}</tfoot>
                </Table>
            </div>
            <Pager
                pageOption={props.pagingOption}
                onPaging={_handlePaging}
            />
        </Fragment>
    );
}

function mapStateToProps({ param, pagingOption, expandAffChannel, languageCodeList }) {
    return { param, pagingOption, expandAffChannel, languageCodeList };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchData, toggleLoader, setPagingOption, setParam, setDetailGridData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(GridData));