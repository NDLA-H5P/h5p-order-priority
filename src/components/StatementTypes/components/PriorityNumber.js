import React from 'react';
import PropTypes from 'prop-types';

function PriorityNumber(props) {
    const {
        displayIndex
    } = props;
    return (
        <div className={"h5p-order-priority-number"}>
            <div>{displayIndex}</div>
        </div>
    );
}

PriorityNumber.propTypes = {
    displayIndex: PropTypes.number,
};

export default PriorityNumber;