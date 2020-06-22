import React from 'react';
import PropTypes from 'prop-types';

const SelectLabel = (props) => {
    const { selectedText } = props;

    return (
        <button type="button" className="multiple-select-default multiple-select-label"
            onClick={props.onToggle}>
            <span className="text-display" title={selectedText}>{selectedText}</span>
            <b className="caret"></b>
        </button>
    )
}

SelectLabel.propTypes = {
    selectedText: PropTypes.string.isRequired
}

export default SelectLabel;