export class ColorExtractor {
  NODE_NAMES = {
    colorSystem: 'Color system',
    colorMain: 'color header',
    colorList: 'color list',
    colorListItem: 'color',
    colorLabel: 'color name'
  };
  
  THEME_COLORS = ['$primary', '$secondary', '$success', '$info', '$warning', '$danger', '$light', '$dark'];
  
  mainColors = [];
  colorList = [];

  constructor() {}

  extractColorVariables(): void {
    let colorSystem = figma.currentPage.findChild(node => node.name === this.NODE_NAMES.colorSystem);
  
    let mainColorNodes = (<FrameNode>colorSystem).findAll(node => node.name === this.NODE_NAMES.colorMain);
    mainColorNodes.forEach(mainColorNode => {
      mainColorNode = (<FrameNode>mainColorNode);
      let background = mainColorNode.fills[0];
      let colorNameNode = (<TextNode>mainColorNode.findOne(node => node.name === this.NODE_NAMES.colorLabel));
  
      if (background != null && colorNameNode != null) {
        this.mainColors[colorNameNode.characters] = this.rgbToHex(background.color);
      }
    });
  
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
  
    console.log(this.mainColors);
    console.log(this.colorList);
  }

  protected rgbToHex({r, g, b}): string {
    return `#${this.realNumberToHex(r * 255)}${this.realNumberToHex(g * 255)}${this.realNumberToHex(b * 255)}`;
  }
  
  protected realNumberToHex(number): string {
    var hex = number.toString(16).split('.')[0];
    return hex.length === 1 ? '0' + hex : hex;
  }
  
}