import { convertNodeToJSX } from './utils';

figma.showUI(__html__, { width: 400, height: 400 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-jsx') {
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      figma.ui.postMessage({ type: 'error', message: 'No node selected' });
      return;
    }

    const jsxCode = selection.map(convertNodeToJSX).join('\n');
    figma.ui.postMessage({ type: 'result', jsxCode });
  }

  if (msg.type === 'export-image')  {
    const selectedNode = figma.currentPage.selection[0];

    if (!selectedNode) {
      figma.notify('선택된 노드가 없습니다.');
      return;
    }

    const imageBytes = await selectedNode.exportAsync({ format: 'PNG' });
    const base64 = figma.base64Encode(imageBytes);

    figma.ui.postMessage({
      type: 'export-done',
      data: base64,
    });
  }
};
