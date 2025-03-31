import React, { useEffect, useState, useMemo, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'reactstrap';
import { Pager } from '@9softstudio/react-fixed-table-header';

import { fetchData, toggleLoader, setPagingOption, setParam, setDetailGridData } from '../actions';
import { format } from '../../../../modules/numberFormat';
import { headerText } from '../libs/constants';
import { globalResource } from '../../../../modules/globalResource';

export const GridData = (props) => {
    const [data, setData] = useState(null);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        _fetchData(props.param);
    }, [props.param]);

    const _fetchData = async (param) => {
        props.toggleLoader(true);
        const rawData = await props.fetchData(param);
        if (rawData) {
            const { MainData, Total, TotalItem } = rawData;

            props.setPagingOption({ TotalItem: TotalItem, PageIndex: param.PageIndex, PageSize: param.PageSize })

            const processedData = MainData && MainData.map(item => ({
                ...item,
                Expanded: props.expandAffChannel || false
            }));

            setTotal(Total);
            setData(processedData);
        }
        props.toggleLoader(false);
    }

    const _handleMainData = useMemo(() => {
        if (!data) return null;

        const groupByAffiliate = data.reduce((acc, item) => {
            const { AffUserName, ChannelName, TotalClick, UniqueClick, SignUps, Fdm, Expanded, ChannelLink } = item;

            if (!acc[AffUserName]) {
                acc[AffUserName] = {
                    AffUserName,
                    Expanded: Expanded,
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
        }, {});

        return Object.values(groupByAffiliate);
    }, [JSON.stringify(data)]);

    useEffect(() => {
        if (data) {
            _toggleExpandAll();
        }
    }, [props.expandAffChannel]);

    const _toggleExpandAll = () => {
        const newExpandState = props.expandAffChannel;
        setData(prevData => {
            if (!prevData) return null;

            return prevData.map(item => ({
                ...item,
                Expanded: newExpandState
            }));
        });
    }

    const _handleDetailGridData = (data, affUserName, channelName) => {
        const { LanguageCode } = props.param;
        const rawData = data?.find(item => item.AffUserName === affUserName && item.ChannelName === channelName);

        if (!rawData?.ChannelLink) return;

        const links = LanguageCode.includes(',')
            ? rawData.ChannelLink
            : rawData.ChannelLink.filter(item => item.MarketName === props.languageCodeList[LanguageCode]);

        props.setDetailGridData(links);
    }

    const _renderHeader = () => {
        return (
            <tr>
                <th title={headerText.Affiliate} width='50%'>{headerText.Affiliate}</th>
                <th title={headerText.TotalClick} width='12.5%'>{headerText.TotalClick}</th>
                <th title={headerText.UniqueClick} width='12.5%'>{headerText.UniqueClick}</th>
                <th title={headerText.SignUps} width='12.5%'>{headerText.SignUps}</th>
                <th title={headerText.Fdm} width='12.5%'>{headerText.Fdm}</th>
            </tr>
        );
    }

    const _toggleAffiliate = (affUserName) => {
        setData(prevData => {
            if (!prevData) return null;

            const targetAff = prevData.find(item => item.AffUserName === affUserName);
            if (!targetAff) return prevData;

            return prevData.map(item => {
                if (item.AffUserName === affUserName) {
                    return {
                        ...item,
                        Expanded: !item.Expanded
                    };
                }
                return item;
            });
        });
    }

    const _renderNoData = () => (
        <tr>
            <td colSpan="5" className="text-center">{globalResource.NoInfo}</td>
        </tr>
    );

    const _renderAffiliateRow = (affiliate, onToggle) => {
        const isExpanded = affiliate.Expanded;
        const totalClick = format(affiliate.TotalClick);
        const uniqueClick = format(affiliate.UniqueClick);
        const signUps = format(affiliate.SignUps);
        const fdm = format(affiliate.Fdm);

        return (
            <tr key={`aff-${affiliate.AffUserName}`}
                className="affiliate-row">
                <td title={affiliate.AffUserName} onClick={() => onToggle(affiliate.AffUserName)}>
                    <div className="p-0 th-wrapper">
                        <strong>{affiliate.AffUserName}</strong>
                        <div className="icon-container">
                            <span className={`caret ${isExpanded ? 'expand current' : 'collapsed'}`}></span>
                        </div>
                    </div>
                </td>
                <td title={totalClick} className="text-right">{totalClick}</td>
                <td title={uniqueClick} className="text-right">{uniqueClick}</td>
                <td title={signUps} className="text-right">{signUps}</td>
                <td title={fdm} className="text-right">{fdm}</td>
            </tr>
        )
    };

    const _renderChannelRow = (channel, affiliate, channelIndex) => {
        const channelName = channel.ChannelName;
        const totalClick = format(channel.TotalClick);
        const uniqueClick = format(channel.UniqueClick);
        const signUps = format(channel.SignUps);
        const fdm = format(channel.Fdm);

        return (
            <tr key={`channel-${affiliate}-${channelIndex}`} className="channel-row">
                <td title={channelName} className="pl-4 channel-name"
                    onClick={() => _handleDetailGridData(data, affiliate, channelName)}>
                    {channelName}
                </td>
                <td title={totalClick} className="text-right">{totalClick}</td>
                <td title={uniqueClick} className="text-right">{uniqueClick}</td>
                <td title={signUps} className="text-right">{signUps}</td>
                <td title={fdm} className="text-right">{fdm}</td>
            </tr>
        )
    };

    const _renderTotalRow = (totalData) => {
        const totalClick = format(totalData.TotalClick);
        const uniqueClick = format(totalData.UniqueClick);
        const signUps = format(totalData.SignUps);
        const fdm = format(totalData.Fdm);

        return (
            <tr key="total" className="total-row">
                <td title={headerText.Total}>{headerText.Total}</td>
                <td title={totalClick} className="text-right">{totalClick}</td>
                <td title={uniqueClick} className="text-right">{uniqueClick}</td>
                <td title={signUps} className="text-right">{signUps}</td>
                <td title={fdm} className="text-right">{fdm}</td>
            </tr>
        )
    };

    const _renderChannelRows = (affiliate) => {
        if (!affiliate.Expanded) return [];
        return affiliate.Channels.map((channel, channelIndex) =>
            _renderChannelRow(channel, affiliate.AffUserName, channelIndex)
        );
    };

    const _renderDataSection = (dataList) => {
        if (!dataList || !dataList.length) {
            return _renderNoData();
        }

        const rows = [];
        dataList.forEach(affiliate => {
            rows.push(_renderAffiliateRow(affiliate, _toggleAffiliate));
            rows.push(..._renderChannelRows(affiliate));
        });

        return rows;
    }

    const _handlePaging = (index, size) => {
        const newPaging = {
            PageIndex: index,
            PageSize: size
        };
        const newParam = Object.assign({}, props.param, newPaging);

        props.setPagingOption(newParam);
        props.setParam(newParam);
    }

    return data && (
        <Fragment>
            <div className="table-responsive marketing-statistics-report-table-container">
                <Table className="freeze-table">
                    <thead>
                        {_renderHeader()}
                    </thead>
                    <tbody>
                        {_renderDataSection(_handleMainData)}
                    </tbody>
                    <tfoot>
                        {total && _renderTotalRow(total)}
                    </tfoot>
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
    return Object.assign({}, { param, pagingOption, expandAffChannel, languageCodeList });
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchData, toggleLoader, setPagingOption, setParam, setDetailGridData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(GridData));