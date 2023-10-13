import React, { Fragment, useState, useRef, useMemo, useEffect } from 'react';
import Popover from '@components/Popover/Popover.js';
import { useOrderPriority } from '@context/OrderPriorityContext.js';
import './Reset.scss';

/**
 * Reset dialog.
 * @returns {object} JSX element.
 */
const Reset = () => {
  const [showPopover, setPopover] = useState(false);
  const [previousFocusElement, setPreviousFocusElement] = useState(null);
  const orderPriorityContext = useOrderPriority();
  const resetButtonRef = useRef(null);

  const {
    behaviour: { enableRetry = false },
    resetTask,
    translations,
  } = orderPriorityContext;

  useEffect(() => {
    if (showPopover) {
      setPreviousFocusElement(document.activeElement);
    }
  }, [showPopover]);

  const togglePopover = (event) => {
    if (!resetButtonRef.current) {
      resetButtonRef.current = event?.target;
    }
    setPopover(!showPopover);
  };

  const confirmReset = () => {
    resetTask();
    togglePopover();
  };

  const openerRect = useMemo(
    () => resetButtonRef.current?.getBoundingClientRect() ?? {},
    []
  );

  return (
    <Fragment>
      {enableRetry === true && (
        <Popover
          handleClose={togglePopover}
          lastActiveElement={previousFocusElement}
          show={showPopover}
          classnames={orderPriorityContext.activeBreakpoints}
          close={translations.close}
          header={translations.restart}
          align={'start'}
          openerRect={openerRect}
          popoverContent={(
            <div
              role={'dialog'}
              aria-labelledby={'resetTitle'}
              className={'h5p-order-priority-reset-modal'}
            >
              <p id={'resetTitle'}>
                {translations.ifYouContinueAllYourChangesWillBeLost}
              </p>
              <div>
                <button
                  onClick={confirmReset}
                  className={'continue'}
                  type={'button'}
                >
                  {translations.continue}
                </button>
                <button
                  onClick={togglePopover}
                  className={'cancel'}
                  type={'button'}
                >
                  {translations.cancel}
                </button>
              </div>
            </div>
          )}
        >
          <button
            className={'h5p-order-priority-button-restart'}
            onClick={togglePopover}
            aria-haspopup={'true'}
            aria-expanded={showPopover}
          >
            <span className={'h5p-ri hri-restart'} />
            {translations.restart}
          </button>
        </Popover>
      )}
    </Fragment>
  );
};

export default Reset;
