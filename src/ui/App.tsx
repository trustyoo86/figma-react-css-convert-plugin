import * as React from 'react';

function App() {
  const [jsxCode, setJsxCode] = React.useState('');

  React.useEffect(() => {
    window.onmessage = (event) => {
      const { pluginMessage } = event.data;
      if (pluginMessage.type === 'result') {
        setJsxCode(pluginMessage.jsxCode);
      }
    };
  }, []);

  const generate = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-jsx' } }, '*');
  };

  return (
    <div>
      <h2>JSX Generator (Inline Webpack)</h2>
      <button onClick={generate}>Generate JSX</button>
      <pre>{jsxCode}</pre>
    </div>
  );
}

export default App;
