// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);

const NODE_NAMES = {
  colorSystem: 'Color system',
  colorMain: 'color header',
  colorList: 'color list',
  colorLabel: 'color name'
}

let mainColors = [];
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'export-variables') {
      getVariables();
      writeToFile();
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
};

function getVariables() {
  let colorSystem = figma.currentPage.findChild(node => node.name === NODE_NAMES.colorSystem);
  let mainColorNodes = colorSystem.findAll(node => node.name === NODE_NAMES.colorMain);
  mainColorNodes.forEach(mainColorNode => {
    let background = mainColorNode.fills[0];
    let colorNameNode = mainColorNode.findOne(node => node.name === NODE_NAMES.colorLabel);

    if (background !== null) {
      mainColors[colorNameNode.characters] = rgbToHex(background.color);
    }
    
  });

  console.log(mainColors);
}

function variableContent() {
  mainColors.map((colorName, value) => {
    colorName + ': ' + value + ';'
  }).join('\n');
}

function writeToFile() {
  // TODO: write scss file
}

function rgbToHex({r, g, b}) {
  return '#' + realNumberToHex(r * 255) + realNumberToHex(g * 255) + realNumberToHex(b * 255);
}

function realNumberToHex(number) {
  var hex = number.toString(16).split('.')[0];
  return hex.length === 1 ? '0' + hex : hex
}
