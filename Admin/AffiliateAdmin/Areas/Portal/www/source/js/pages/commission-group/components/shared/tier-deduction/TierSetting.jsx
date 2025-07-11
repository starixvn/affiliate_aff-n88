import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { bindActionCreators } from 'redux';

import { setSelectedGroup } from '../../../actions';

import TierSettingItem from './TierSettingItem';
import { removeTierItem } from '../../../modules/service';
import { isValidNumber } from '../../../../../modules/utils';
import { FIRST_ITEM_INDEX, MinNetTurnover, MinNetWin, regexAcceptNegativeAmountFormat, tierSettingDefault, MAX_PERCENTAGE } from '../../../modules/constant';

export class TierSetting extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleAdd = () => {
        const { isFirstTierSetting, groupProductId, selectedGroup } = this.props;
        const { IsCheckedMinFTDCount, IsCheckedMinTotalDeposit } = selectedGroup;

        const tierList = selectedGroup.TierSettingList.filter(
            t => t.GroupProductId === groupProductId
        );
        const lastTier = tierList[tierList.length - 1];

        const baseTier = {
            GroupId: selectedGroup.GroupId,
            TierId: lastTier.TierId + 1,
            GroupProductId: groupProductId,
            MinAmount:
                lastTier.MinAmount < 1 || Number.isNaN(lastTier.MinAmount)
                    ? 1
                    : lastTier.MinAmount + 1,
            MinQm: tierSettingDefault.MinQm,
            Commission:
                lastTier.Commission + 0.1 <= MAX_PERCENTAGE
                    ? lastTier.Commission + 0.1
                    : MAX_PERCENTAGE
        };

        let minFTD = 0;
        let minTotal = 0;

        if (isFirstTierSetting) {
            minFTD = IsCheckedMinFTDCount ? lastTier.MinFTDCount + 1 : 0;
            minTotal = IsCheckedMinTotalDeposit ? lastTier.MinTotalDeposit + 1 : 0;
        } else {
            const firstGroupProductId = selectedGroup.PlatformFeeList[0].GroupProductId;
            const firstTierList = selectedGroup.TierSettingList.filter(
                t => t.GroupProductId === firstGroupProductId
            );
            const nextTier = firstTierList[tierList.length];

            minFTD = nextTier
                ? nextTier.MinFTDCount
                : IsCheckedMinFTDCount
                    ? lastTier.MinFTDCount + 1
                    : 0;

            minTotal = nextTier
                ? nextTier.MinTotalDeposit
                : IsCheckedMinTotalDeposit
                    ? lastTier.MinTotalDeposit + 1
                    : 0;
        }

        const newTierItem = {
            ...baseTier,
            MinFTDCount: minFTD,
            MinTotalDeposit: minTotal
        };

        this.props.setSelectedGroup({
            TierSettingList: [...selectedGroup.TierSettingList, newTierItem]
        });
    };

    handleRemove = (tierId, groupProductId) => {
        const { TierSettingList } = this.props.selectedGroup;
        const tierSettingList = removeTierItem(tierId, groupProductId, TierSettingList);

        this.props.setSelectedGroup({ TierSettingList: tierSettingList });
    }

    handleChangeInput = (tierId, tierItemValue) => {
        const { MinAmount, MinQm } = tierItemValue;

        if ((!MinAmount || regexAcceptNegativeAmountFormat.test(MinAmount)) &&
            (!MinQm || isValidNumber(MinQm))) {

            const { selectedGroup, groupProductId } = this.props;

            const tierSettingList = selectedGroup.TierSettingList.map(item => {
                if (item.TierId === tierId && item.GroupProductId === groupProductId) {
                    return {
                        ...item,
                        ...tierItemValue
                    };
                }

                return item;
            });

            this.props.setSelectedGroup({ TierSettingList: tierSettingList });
        }
    }

    handleChangeValueWithCheckbox = (tierId, name, value) => {
        const { isFirstTierSetting, selectedGroup, groupProductId } = this.props;

        if (isFirstTierSetting) {
            const currentTierList = selectedGroup.TierSettingList.filter(t => t.GroupProductId === groupProductId);
            const currentTierIndex = currentTierList.findIndex(t => t.TierId === tierId);

            const newTierSettingList = selectedGroup.TierSettingList.map(t => {
                if (t.TierId === tierId && t.GroupProductId === groupProductId) {
                    return {
                        ...t,
                        [name]: value
                    };
                }

                if (t.GroupProductId !== groupProductId) {
                    const updatedTierSetting = selectedGroup.TierSettingList.filter(c => c.GroupProductId === t.GroupProductId);
                    const updatedTierIndex = updatedTierSetting.findIndex(c => c.TierId === t.TierId);

                    if (updatedTierIndex !== -1 && updatedTierIndex === currentTierIndex && updatedTierSetting[updatedTierIndex][name] === currentTierList[currentTierIndex][name]) {
                        return {
                            ...t,
                            [name]: value
                        };
                    }

                }

                return t;
            });

            this.props.setSelectedGroup({ TierSettingList: newTierSettingList });
        }
    }

    handleCheck = (e) => {
        const { name, checked } = e.target;

        if (!checked) {
            this.handleResetTierSettingData(name === 'IsCheckedMinFTDCount' ? 'MinFTDCount' : 'MinTotalDeposit');
        }

        this.props.setSelectedGroup({ [name]: checked });
    }

    handleResetTierSettingData = (propName, value = 0) => {
        const { selectedGroup } = this.props;
        const newTierSetting = selectedGroup.TierSettingList.map(t => ({ ...t, [propName]: value }));

        this.props.setSelectedGroup({
            TierSettingList: newTierSetting,
        });
    }

    render() {
        const { selectedGroup, groupProductId, isDisableAddButton, handleClick, isTurnover, isFirstTierSetting } = this.props;
        const tierSettings = selectedGroup.TierSettingList.filter(t => t.GroupProductId === groupProductId)

        return (
            <div className='my-2'>
                <FormGroup row>
                    <Col sm={11}>
                        <table className="table table-bordered tier-setting-table table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: '7%' }}>Tier</th>
                                    <th style={{ width: '17%' }}>{isTurnover ? MinNetTurnover : MinNetWin}</th>
                                    <th style={{ width: '17%' }}>Min Qualified Player</th>
                                    <th style={{ width: '20%' }}>
                                        {isFirstTierSetting
                                            ?
                                            <Form inline>
                                                <FormGroup check className="mx-sm-1">
                                                    <Label check>
                                                        <Input
                                                            type="checkbox"
                                                            name="IsCheckedMinFTDCount"
                                                            id="IsCheckedMinFTDCount"
                                                            checked={selectedGroup.IsCheckedMinFTDCount}
                                                            onChange={this.handleCheck}
                                                        />
                                                    </Label>
                                                </FormGroup>
                                                <Label htmlFor="IsCheckedMinFTDCount">
                                                    Min Total FTD Count
                                                </Label>
                                            </Form>
                                            : 'Min Total FTD Count'
                                        }
                                    </th>
                                    <th style={{ width: '20%' }}>
                                        {isFirstTierSetting
                                            ? <Form inline>
                                                <FormGroup check className="mx-sm-1">
                                                    <Label check>
                                                        <Input
                                                            type="checkbox"
                                                            name="IsCheckedMinTotalDeposit"
                                                            id="IsCheckedMinTotalDeposit"
                                                            checked={selectedGroup.IsCheckedMinTotalDeposit}
                                                            onChange={this.handleCheck}
                                                        />
                                                    </Label>
                                                </FormGroup>
                                                <Label htmlFor="IsCheckedMinTotalDeposit">
                                                    Min Total Deposit<br />(New Player)
                                                </Label>
                                            </Form>
                                            : <span>Min Total Deposit <br />(New Player)</span>
                                        }
                                    </th>
                                    <th style={{ width: '11%' }}>Rev. Share%</th>
                                    <th style={{ width: '8%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !!tierSettings.length &&
                                    tierSettings.map((item, i) => {
                                        const isFirst = i === FIRST_ITEM_INDEX;
                                        const handleClick = isFirst ? this.handleAdd : () => this.handleRemove(item.TierId, groupProductId);

                                        return (<TierSettingItem data={item} key={`tier-${item.TierId}`}
                                            index={i + 1}
                                            handleClick={handleClick}
                                            btnText={isFirst ? '+' : '-'}
                                            isFirst={isFirst}
                                            isFirstTierSetting={isFirstTierSetting}
                                            isTurnover={isTurnover}
                                            selectedGroup={selectedGroup}
                                            onChange={this.handleChangeInput}
                                            onChangeValueWithCheckbox={this.handleChangeValueWithCheckbox} />);
                                    })
                                }
                            </tbody>
                        </table>
                    </Col>
                    <Col sm={1} className="pl-0">
                        <button
                            type="button"
                            className='btn btn-action'
                            disabled={isDisableAddButton}
                            onClick={handleClick}>
                            {isFirstTierSetting ? 'Add +' : <span className="oi oi-trash text-secondary"></span>}
                        </button>
                    </Col>
                </FormGroup>
            </div>
        )
    }
}

function mapStateToProp({ selectedGroup }, { groupProductId }) {
    return { selectedGroup, groupProductId };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setSelectedGroup }, dispatch);
}

export default connect(mapStateToProp, mapDispatchToProps)(TierSetting);