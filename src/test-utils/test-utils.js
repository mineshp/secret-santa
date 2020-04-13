import { render, queries } from '@testing-library/react';
// import * as customQueries from './custom-queries'

const customRender = (ui, options) =>
  render(ui, { queries: { ...queries }, ...options });
  // render(ui, { queries: { ...queries, ...customQueries }, ...options })

const getTextBySelector = (selector, component) => Array.prototype.map.call(
  component.baseElement.querySelectorAll(selector), ((el) => el.textContent)
);

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, getTextBySelector };