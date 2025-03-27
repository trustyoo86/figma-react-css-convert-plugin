figma.showUI(__html__, { width: 400, height: 400 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generaste-jsx') {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.ui.postMessage({ type: 'error', message: 'No node selected' });
      return;
    }

    const { convertNodeToJSX } = await import('./utils');
    const jsxCode = selection.map(convertNodeToJSX).join('\n');
    figma.ui.postMessage({ type: 'result', jsxCode });
  }
};