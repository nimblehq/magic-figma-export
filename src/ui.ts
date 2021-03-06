import { CodeGenerator } from './components/code-generator';
import './ui.css'

let contentWelcome = document.getElementById('welcomeContent');
let contentMain = document.getElementById('mainContent');
let contentError = document.getElementById('errorContent');
let contentCode = document.getElementById('codeField');
let copyButton = document.getElementById('copyBtn');
let errortext = document.getElementById('errorMessage');
let backButton = document.getElementById('backBtn');

document.getElementById('generate').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'generate-variables' } }, '*');
}

onmessage = (event) => {
  if (event.type === 'message') {
    const { mainColor, colorList, typos } = event.data.pluginMessage;
    if (mainColor && colorList && typos) {
      const code = new CodeGenerator().codeFromVariables(mainColor, colorList, typos);

      toggleContent('main');
      (<HTMLTextAreaElement>contentCode).value = code;
    } else {
      const { errorMessage } = event.data.pluginMessage;
      
      toggleContent('error');
      errortext.innerText = errorMessage;
    }
  }
}

const toggleContent = (contentType: string) => {
  contentWelcome.classList.add('hide');
  contentMain.classList.add('hide');
  contentError.classList.add('hide');

  switch (contentType) {
    case 'main':
      contentMain.classList.remove('hide');
      break;
    case 'welcome':
      contentWelcome.classList.remove('hide');
      break;
    case 'error':
      contentError.classList.remove('hide');
      break;

    default:
      break;
  }
}

copyButton.addEventListener('click', () => {
  /* Select the text field */
  (<HTMLTextAreaElement>contentCode).select();
  (<HTMLTextAreaElement>contentCode).setSelectionRange(0, 99999); /*For mobile devices*/

  document.execCommand('copy');
});

backButton.addEventListener('click', () => {
  toggleContent('welcome');
});
