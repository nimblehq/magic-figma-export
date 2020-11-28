import { CodeGenerator } from './components/code-generator';
import './ui.css'

let contentWelcome = document.getElementById('welcomeContent');
let contentMain = document.getElementById('mainContent');
let contentCode = document.getElementById('codeField');
let copyButton = document.getElementById('copyBtn');

document.getElementById('generate').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'generate-variables' } }, '*');

  contentWelcome.classList.add('hide');
  contentMain.classList.remove('hide');
}

onmessage = (event) => {
  if (event.type === 'message') {
    const { mainColor, colorList } = event.data.pluginMessage;
    const code = new CodeGenerator().codeFromVariables(mainColor, colorList);
    (<HTMLTextAreaElement>contentCode).value = code;
  }
}

copyButton.addEventListener('click', () => {
  /* Select the text field */
  (<HTMLTextAreaElement>contentCode).select();
  (<HTMLTextAreaElement>contentCode).setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand('copy');
});
