import { convertNodeToJSX } from './utils';

figma.showUI(__html__, { width: 400, height: 400 });

figma.ui.onmessage = (msg) => {
  if (msg.type === 'generate-jsx') {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.ui.postMessage({ type: 'error', message: 'No node selected' });
      return;
    }

    const jsxCode = selection.map(convertNodeToJSX).join('\n');
    figma.ui.postMessage({ type: 'result', jsxCode });
  }
};
