import React from 'react';
import ReactDOM from 'react-dom';
import VisualImpairmentSimulator from './components/VisualImpairment';
import ImageUploaderApp from './components/ImageUploaderApp';

ReactDOM.render(
  <React.StrictMode>
    <VisualImpairmentSimulator />
    <ImageUploaderApp />
  </React.StrictMode>,
  document.getElementById('root')
);
