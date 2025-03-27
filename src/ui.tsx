const generate = () => {
  parent.postMessage({ pluginMessage: { type: 'generate-jsx' } }, '*');
};

document.getElementById('generate')?.addEventListener('click', generate);

onmessage = (event) => {
  const msg = event.data.pluginMessage;
  if (msg.type === 'result') {
    document.getElementById('output')!.textContent = msg.jsxCode;
  }
};

// src/utils.ts
export function convertNodeToJSX(node: SceneNode): string {
  if (node.type === 'TEXT') {
    const fills = node.fills as Paint[];
    const color = (fills && fills[0]?.type === 'SOLID') ? rgbToHex(fills[0].color) : '#000';
    const style = {
      fontSize: node.fontSize,
      fontWeight: node.fontWeight,
      color,
    };
    return `<span style={${JSON.stringify(style)}}>${node.characters}</span>`;
  }

  if (node.type === 'RECTANGLE') {
    const fills = node.fills as Paint[];
    const bgColor = (fills && fills[0]?.type === 'SOLID') ? rgbToHex(fills[0].color) : 'transparent';
    const style = {
      width: node.width,
      height: node.height,
      backgroundColor: bgColor,
    };
    return `<div style={${JSON.stringify(style)}} />`;
  }

  return `<!-- Unsupported node type: ${node.type} -->`;
}

function rgbToHex(color: RGB): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}