import { ColorExtractor } from './components/color-extractor';
import { typoExtractor } from './components/typo-extractor';

figma.showUI(__html__);
figma.ui.resize(360, 280);

figma.ui.onmessage = msg => {
  if (msg.type === 'generate-variables') {
    let colorExtractor = new ColorExtractor();

    try {
      colorExtractor.extractColorVariables();
      const headings = typoExtractor.extractHeadings();

      figma.ui.postMessage({
        mainColor: colorExtractor.mainColors,
        colorList: colorExtractor.colorList,
        typos: headings
      });
    } catch (error) {
      figma.ui.postMessage({
        errorMessage: error.message
      });
    }
  }
};
