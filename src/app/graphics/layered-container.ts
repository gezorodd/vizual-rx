import {DynamicObjectGraphics} from "./dynamic-object-graphics";

export class LayeredContainer {
  readonly root: SVGGElement;
  private readonly layers: Map<number, SVGGElement>;

  constructor(rootElement: SVGGElement) {
    this.root = rootElement;
    this.layers = new Map<number, SVGGElement>();
  }

  addObject(object: DynamicObjectGraphics): void {
    const sceneLayer = this.getSceneLayer(object.layerIndex);
    sceneLayer.appendChild(object.groupContainer);
  }

  removeObject(object: DynamicObjectGraphics): void {
    const sceneLayer = this.getSceneLayer(object.layerIndex);
    sceneLayer.removeChild(object.groupContainer);
  }

  private getSceneLayer(index: number): SVGGElement {
    let sceneLayer = this.layers.get(index);
    if (!sceneLayer) {
      sceneLayer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      this.layers.set(index, sceneLayer);

      const indexedSortedHighestFirst = [...this.layers.keys()].sort().reverse();
      if (indexedSortedHighestFirst.length === 0 || indexedSortedHighestFirst[0] < index) {
        this.root.appendChild(sceneLayer);
      } else {
        let insertBefore: SVGGElement | undefined;
        for (let otherIndex of indexedSortedHighestFirst) {
          if (index < otherIndex) {
            insertBefore = this.layers.get(otherIndex);
          } else {
            break;
          }
        }
        this.root.insertBefore(sceneLayer, insertBefore!);
      }
    }
    return sceneLayer;
  }
}
