export class ColorExtractor {

// In order to extract the colors values, the following node names should be used in the following structure:
// colorSystem
// - colorMain: should set the main color as background color
// -- colorLabel: should contain the name of the color
// - colorList: should list the color in different contrast
// -- color: should set the color as background color
// --- colorLabel: should contain the name of the color

  NODE_NAMES = {
    colorSystem: 'Color system',
    colorMain: 'color header',
    colorList: 'color list',
    colorListItem: 'color',
    colorLabel: 'color name'
  };
  
  THEME_COLORS = ['$primary', '$secondary', '$success', '$info', '$warning', '$danger', '$light', '$dark'];
  
  mainColors = {};
  colorList = {};

  constructor() {}

  extractColorVariables(): void {
    let colorSystem = figma.currentPage.findChild(node => node.name === this.NODE_NAMES.colorSystem);

    if (colorSystem === null) {
      throw new Error('Cannot find color system on this page. You might be on the wrong page 🤔');
    }
  
    let colorListNodes = (<FrameNode>colorSystem).findAll(node => node.name === this.NODE_NAMES.colorList);
    colorListNodes.forEach(colorListNode => {
      colorListNode = (<FrameNode>colorListNode);
      let colorItemNodes = colorListNode.findAll(node => node.name === this.NODE_NAMES.colorListItem);
      colorItemNodes.forEach(colorItemNode => {
        colorItemNode = (<FrameNode>colorItemNode);
        let background = colorItemNode.fills[0];
        let colorNameNode = (<TextNode>colorItemNode.findOne(node => node.name === this.NODE_NAMES.colorLabel));
        if (background != null && colorNameNode != null) {
          this.colorList[colorNameNode.characters] = this.rgbToHex(background.color);
        }
      });
    });

    let mainColorNodes = (<FrameNode>colorSystem).findAll(node => node.name === this.NODE_NAMES.colorMain);
    mainColorNodes.forEach(mainColorNode => {
      mainColorNode = (<FrameNode>mainColorNode);
      let background = mainColorNode.fills[0];
      let colorNameNode = (<TextNode>mainColorNode.findOne(node => node.name === this.NODE_NAMES.colorLabel));

      if (background != null && colorNameNode != null) {
        const colorValue = this.rgbToHex(background.color);
        const colorVariable = this.colorVariableFromValue(colorValue);
        this.mainColors[colorNameNode.characters] = colorVariable.length > 0 ? colorVariable : colorValue;
      }
    });
  }

  protected colorVariableFromValue(colorValue): string {
    let variable = Object.keys(this.colorList).find(key => this.colorList[key] === colorValue);

    return variable != null ? variable : '';
  }

  protected rgbToHex({r, g, b}): string {
    return `#${this.realNumberToHex(r * 255)}${this.realNumberToHex(g * 255)}${this.realNumberToHex(b * 255)}`;
  }
  
  protected realNumberToHex(number): string {
    var hex = number.toString(16).split('.')[0];
    return hex.length === 1 ? '0' + hex : hex;
  }
}
