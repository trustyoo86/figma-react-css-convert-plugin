import * as React from 'react';

function App() {
  const [jsxCode, setJsxCode] = React.useState('');
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    window.onmessage = (event) => {
      const { pluginMessage } = event.data;
      if (pluginMessage.type === 'result') {
        setJsxCode(pluginMessage.jsxCode);
      }

      if (pluginMessage.type === 'export-done') {
        setImageSrc(`data:image/png;base64,${pluginMessage.data}`);
      }
    };
  }, []);

  const generate = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-jsx' } }, '*');
  };

  const exportPng = () => {
    parent.postMessage({ pluginMessage: { type: 'export-image' } }, '*');
  }

  return (
    <div>
      <h2>JSX Generator (Inline Webpack)</h2>
      <button onClick={generate}>Generate JSX</button>
      <button onClick={exportPng}>선택한 노드 이미지로 변환</button>

      <pre>{jsxCode}</pre>

      {imageSrc && (
        <div>
          <h2>미리보기</h2>
          <img src={imageSrc} alt="Exported" style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default App;
