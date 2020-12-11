class TypoExtractor {
  TYPO = {
    page: 'Typography'
  }
  constructor() {}

  extractNodesFromFigma(): any {
    const nodes = figma.currentPage.findChild(node => node.name === this.TYPO.page);
    
    if (!nodes) {
      throw new ReferenceError('Cannot find typography system on this page. You might be on the wrong page 🤔')
    }

    return nodes;
  }

  extractHeadings(): string[] {
    const nodes = this.extractNodesFromFigma();
    const childrenNodes = this.flatten(nodes.children);
    const headings = childrenNodes.filter(node => node.name === 'heading')
                          .reduce((map, heading) => {
                            const key = this.extractHeaderTag(heading.characters);
                            const value = `${heading.fontSize/16}rem`;

                            map[key] = value;

                            return map;
                          }, {});
    return headings;
  }

  extractHeaderTag(label): string {
    return `$${label.split(".")[0]}-font-size`;
  }

  flatten(arr): any {
    return arr.reduce((flatArray, frameNode) => {
      return flatArray.concat(frameNode.children ? this.flatten(frameNode.children) : frameNode);
    }, []);
  }
}

export const typoExtractor = new TypoExtractor();