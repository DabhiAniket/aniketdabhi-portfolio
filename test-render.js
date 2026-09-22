import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.jsx';
import { StaticRouter } from 'react-router-dom/server';

try {
  renderToString(<StaticRouter location="/"><App /></StaticRouter>);
  console.log('Home Rendered OK');
  renderToString(<StaticRouter location="/about"><App /></StaticRouter>);
  console.log('About Rendered OK');
  renderToString(<StaticRouter location="/services"><App /></StaticRouter>);
  console.log('Services Rendered OK');
  renderToString(<StaticRouter location="/work"><App /></StaticRouter>);
  console.log('Work Rendered OK');
  renderToString(<StaticRouter location="/testimonials"><App /></StaticRouter>);
  console.log('Testimonials Rendered OK');
  renderToString(<StaticRouter location="/contact"><App /></StaticRouter>);
  console.log('Contact Rendered OK');
} catch (e) {
  console.error(e);
}
