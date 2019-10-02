import React, {Fragment, useContext, useState} from 'react';
import Popover from "../Popover/Popover";
import {OrderPriorityContext} from "../../context/OrderPriorityContext";

function Reset() {

    const [showPopover, setPopover] = useState(false);
    const orderPriorityContext = useContext(OrderPriorityContext);

    function togglePopover(){
        setPopover(!showPopover);
    }

    function confirmReset() {
        reset();
        togglePopover();
    }

    const {
        behaviour: {
            enableRetry = false
        },
        reset,
        translations,
    } = orderPriorityContext;

    return (
        <Fragment>
            {enableRetry === true && (
                <Popover
                    handleClose={togglePopover}
                    show={showPopover}
                    translations={translations}
                    popoverContent={(
                        <div
                            role={"dialog"}
                            className={"h5p-order-priority-reset-modal"}
                        >
                            <div>
                                {translations.ifYouContinueAllYourChangesWillBeLost}
                                <span>{translations.areYouSure}</span>
                            </div>
                            <div>
                                <button
                                    type={"button"}
                                    onClick={confirmReset}
                                    className={"yes"}
                                    tabIndex={0}
                                >{translations.yes}</button>
                                <button
                                    type={"button"}
                                    onClick={togglePopover}
                                    className={"no"}
                                    tabIndex={0}
                                >{translations.no}</button>
                            </div>
                        </div>
                    )}
                >
                    <button
                        className={"h5p-order-priority-button-restart"}
                        onClick={togglePopover}
                    >
                        <span
                            className={"fa fa-refresh"}
                            aria-hidden={"true"}
                        />
                        {translations.restart}
                    </button>
                </Popover>
            )}
        </Fragment>
    );
}

export default Reset;