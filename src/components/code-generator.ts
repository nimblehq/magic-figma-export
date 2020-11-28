export class CodeGenerator {
  constructor() {}

  codeFromVariables(mainColors: {}, colorList: {}): string {
    let code = '';
    let currentColorGroup: string;

    Object.keys(colorList).forEach(colorName => {
      const colorGroup = colorName.split('-')[0];
      currentColorGroup ||= colorGroup;

      if (currentColorGroup != colorGroup) {
        code += '\n';
        currentColorGroup = colorGroup;
      }
      code += `${colorName}: ${colorList[colorName]};\n`
    });

    code += '\n';

    Object.keys(mainColors).forEach(colorName => {
      code += `${colorName}: ${mainColors[colorName]};\n`
    });

    return code;
  }
}