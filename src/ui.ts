import './ui.css'

document.getElementById('export').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'export-variables' } }, '*')
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}
