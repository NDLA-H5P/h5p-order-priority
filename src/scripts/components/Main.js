import React, { useEffect, useRef } from 'react';
import ReactHtmlParser from 'html-react-parser';
import PropTypes from 'prop-types';
import Surface from '@components/Surface/Surface.js';
import Footer from '@components/Surface/components/Footer/Footer.js';
import '@assets/fonts/H5PReflectionFont.scss';
import './Main.scss';

const Main = (props) => {
  const resourceContainer = useRef();

  const {
    id,
    language = 'en',
    collectExportValues,
    header,
    description = '',
    resources: resourcesList,
  } = props;

  useEffect(() => {
    if (!resourcesList.params.resourceList.length) {
      return; // Nothing to do
    }

    if (resourceContainer.current.querySelector('.h5p-resource-list-wrapper')) {
      return; // Guard for React.StrictMode in development to not attach twice
    }

    const resourceList = new H5P.ResourceList(
      resourcesList.params, id, language
    );
    resourceList.attach(resourceContainer.current);

    // Set defaults to resource attributes
    const defaultParams = { title: '', url: '', introduction: '' };
    const callback = () => {
      return resourcesList.params.resourceList.map((resource) => {
        return ({ ...defaultParams, ...resource });
      });
    };

    collectExportValues('resources', callback);
  });

  return (
    <article>
      <div
        className={'h5p-order-priority-header'}
      >{header}</div>
      <div
        className={'h5p-order-priority-surface'}
      >
        <div
          className={'h5p-order-priority-surface-info'}
          ref={resourceContainer}
        >
          {description && (
            <div className={'h5p-order-priority-description'}>
              {ReactHtmlParser(description)}
            </div>
          )}
        </div>
        <Surface />
      </div>
      <Footer/>
    </article>
  );
};

Main.propTypes = {
  id: PropTypes.number,
  language: PropTypes.string,
  header: PropTypes.string,
  description: PropTypes.string,
  collectExportValues: PropTypes.func,
  resources: PropTypes.object,
};

export default Main;
