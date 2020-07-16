import React from 'react';
import PropTypes from 'prop-types';

const Option = (props) => {
    const { itemData, onChange, id } = props;

    const handleChange = (event) => {
        event.stopPropagation();

        const newItemData = {
            key: itemData.key,
            value: itemData.value
        }

        onChange && onChange(newItemData);
    }

    return (
        <li className="select-item" id={id} onClick={handleChange}>
            <label className="option-label">
                {itemData.value}
            </label>
        </li>
    );
}

Option.propTypes = {
    itemData: PropTypes.object.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onChange: PropTypes.func
}

export default Option;