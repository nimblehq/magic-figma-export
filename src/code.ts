import { ColorExtractor } from './components/color-extractor';

figma.showUI(__html__);
figma.ui.resize(360, 280);

figma.ui.onmessage = msg => {
  if (msg.type === 'generate-variables') {
    let colorExtractor = new ColorExtractor();
    colorExtractor.extractColorVariables();

    // TODO: display color variables on plugin UI
    console.log(colorExtractor.mainColors);
    console.log(colorExtractor.colorList);

    figma.ui.postMessage({
      mainColor: colorExtractor.mainColors,
      colorList: colorExtractor.colorList
    });
  }
};
