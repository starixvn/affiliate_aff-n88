import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

import { format } from '../../../../modules/numberFormat';
import { headerText } from '../libs/constants';
import { globalResource } from '../../../../modules/globalResource';

export const Detail = ({ detailGridData }) => {
    const _renderHeader = () => (
        <thead>
            <tr>
                <th title={headerText.Details} width='35%'>{headerText.Details}</th>
                <th title={headerText.Language} width='15%'>{headerText.Language}</th>
                <th title={headerText.TotalClick} width='12.5%'>{headerText.TotalClick}</th>
                <th title={headerText.UniqueClick} width='12.5%'>{headerText.UniqueClick}</th>
                <th title={headerText.SignUps} width='12.5%'>{headerText.SignUps}</th>
                <th title={headerText.Fdm} width='12.5%'>{headerText.Fdm}</th>
            </tr>
        </thead>
    );

    const _renderDetailGridData = () => {
        if (!detailGridData?.length) {
            return (
                <tbody>
                    <tr>
                        <td colSpan="6" className="text-center">{globalResource.NoInfo}</td>
                    </tr>
                </tbody>
            );
        }

        return (
            <tbody>
                {detailGridData.map((item, index) => {
                    const totalClick = format(item.TotalClick);
                    const uniqueClick = format(item.UniqueClick);
                    const signUps = format(item.SignUps);
                    const fdm = format(item.Fdm);

                    return (
                        <tr key={index}>
                            <td title={item.AffMediaLink}>{item.AffMediaLink || 'none'}</td>
                            <td title={item.MarketName}>{item.MarketName || 'none'}</td>
                            <td title={totalClick} className="text-right">{totalClick}</td>
                            <td title={uniqueClick} className="text-right">{uniqueClick}</td>
                            <td title={signUps} className="text-right">{signUps}</td>
                            <td title={fdm} className="text-right">{fdm}</td>
                        </tr>
                    )
                })}
            </tbody>
        );
    };

    return detailGridData && (
        <div className="marketing-report-container">
            <Table className="freeze-table table-striped my-2">
                {_renderHeader()}
                {_renderDetailGridData()}
            </Table>
        </div>
    );
};

function mapStateToProps({ detailGridData }) {
    return { detailGridData };
}

export default connect(mapStateToProps)(React.memo(Detail));