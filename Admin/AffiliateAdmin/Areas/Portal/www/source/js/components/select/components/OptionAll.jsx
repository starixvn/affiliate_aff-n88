import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

const LABEL = "All";
const VALUE = "";

const OptionAll = (props) => {
    const { id, label, onChange } = props;

    const itemData = {
        key: "All",
        value: label
    }

    const changeHandler = ({ checked }) => {
        onChange && onChange(checked);
    }

    return (
        <ul className="multiple-select-options multiple-select-option-all">
            <Option
                id={`${id}-optionItemAll`}
                itemData={itemData}
                onChange={changeHandler} />
        </ul>
    )
}

OptionAll.propTypes = {
    onChange: PropTypes.func,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
}

OptionAll.defaultProps = {
    label: LABEL,
    value: VALUE
}

export default OptionAll;