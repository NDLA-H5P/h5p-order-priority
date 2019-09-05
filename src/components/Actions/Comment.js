import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {OrderPriorityContext} from "../../context/OrderPriorityContext";
import Popover from "../Popover/Popover";
import classnames from 'classnames';

function Comment(props) {

    const [showPopover, togglePopover] = useState(false);
    const [comment, setComment] = useState(props.comment);

    const context = useContext(OrderPriorityContext);

    function handleToggle() {
        if( !showPopover){
            setComment(props.comment || "");
        } else {
            props.onCommentChange(comment);
        }
        togglePopover(!showPopover);
    }

    return (
        <Popover
            handleClose={handleToggle}
            show={showPopover}
            popoverContent={(
                <div>
                        <textarea
                            placeholder={context.translations.typeYourReasonsForSuchAnswers}
                            value={comment}
                            onChange={event => setComment(event.currentTarget.value)}
                        />
                </div>
            )}
        >
            <div
                onClick={handleToggle}
                className={classnames("h5p-order-priority-action", {
                    'h5p-order-priority-action-active': props.comment && props.comment.length > 0,
                })}
            >
                <i
                    className={"fa fa-commenting-o"}
                />
            </div>
        </Popover>
    );
}

Comment.propTypes = {
    onCommentChange: PropTypes.func,
    comment: PropTypes.string,
    translations: PropTypes.object,
};

export default Comment;
