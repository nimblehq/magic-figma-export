class TypoExtractor {
  TYPO = {
    page: 'Typography',
    lead: 'lead prop'
  }

  constructor() {}

  extractNodes(): any {
    const nodes = figma.currentPage.findChild(node => node.name === this.TYPO.page);
    
    if (!nodes) {
      throw new ReferenceError('Cannot find typography system on this page. You might be on the wrong page 🤔')
    }

    return nodes;
  }

  extractChildrenNodes(): any {
    const nodes = this.extractNodes();

    return this.flatten(nodes.children);
  }

  extractTypos(): any {
    const childrenNodes = this.extractChildrenNodes();
    const headings = childrenNodes.filter(node => node.name === 'heading')
                          .reduce((map, heading) => {
                            const key = this.extractHeaderTag(heading.characters);
                            const value = `${heading.fontSize/16}rem`;

                            map[key] = value;

                            return map;
                          }, {});

    const lead = childrenNodes.filter(node => this.TYPO.lead === node.name)
                              .reduce((map, lead) => {
                                const key = '$lead-font-size'
                                const value = `${lead.fontSize/16}rem`;

                                map[key] = value;

                                return map;
                              }, {});

    const typos =
    {
      headings: headings,
      lead: lead
    }

    return typos;
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