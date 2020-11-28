import { ColorExtractor } from './components/color-extractor';

figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type === 'export-variables') {
    let colorExtractor = new ColorExtractor();
    colorExtractor.extractColorVariables();

    // TODO: display color variables on plugin UI
    console.log(colorExtractor.mainColors);
    console.log(colorExtractor.colorList);
  }
  figma.closePlugin();
};
