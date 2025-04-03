console.log('✅ ui.js loaded');

window.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM ready');
  const button = document.getElementById('generate');
  if (button) {
    console.log('✅ button found');
    button.addEventListener('click', () => {
      console.log('✅ button clicked');
      parent.postMessage({ pluginMessage: { type: 'generate-jsx' } }, '*');
    });
  }
});

onmessage = (event) => {
  const msg = event.data.pluginMessage;
  if (msg.type === 'result') {
    const output = document.getElementById('output');
    if (output) output.textContent = msg.jsxCode;
  }
};