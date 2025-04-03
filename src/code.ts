import { convertNodeToJSX } from './utils';
// @ts-ignore
figma.showUI(__html__, { width: 400, height: 400 });
// @ts-ignore
figma.ui.onmessage = (msg) => {
  console.log('✅ Received message:', msg);
  if (msg.type === 'generate-jsx') {
    // @ts-ignore
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      // @ts-ignore
      figma.ui.postMessage({ type: 'error', message: 'No node selected' });
      return;
    }

    const jsxCode = selection.map(convertNodeToJSX).join('\n');
    // @ts-ignore
    figma.ui.postMessage({ type: 'result', jsxCode });
  }
};