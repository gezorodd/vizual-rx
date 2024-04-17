import {DynamicObjectGraphics} from "../dynamic-object-graphics";
import {VizualRxRemote} from "../../remote/vizual-rx-remote.model";
import {LayeredContainer} from "../layered-container";

export class ObserverStackGraphics extends DynamicObjectGraphics {
  private readonly items: DynamicObjectGraphics[];
  private layeredContainer?: LayeredContainer;
  private hoveredItem?: DynamicObjectGraphics;

  constructor(remote: VizualRxRemote, time: number) {
    super(remote, time);
    this.items = [];
  }

  protected init(groupContainer: SVGGElement): void {
    this.layeredContainer = new LayeredContainer(groupContainer);
    groupContainer.classList.add('observer-stack');
    groupContainer.addEventListener('mousemove', e => this.computeHoverItem(e));
    groupContainer.addEventListener('mouseleave', () => this.resetHoverItem());
  }

  addItem(item: DynamicObjectGraphics): void {
    this.items.push(item);
    if (this.layeredContainer) {
      this.layeredContainer.addObject(item);
    }
    item.groupContainer.style.transform = `translate(0, 0)`;
  }

  override update() {
    super.update();

    const gap = 50 / this.items.length;
    for (let i = 0; i < this.items.length; i++) {
      const y = ((this.items.length - 1) / 2 - i) * gap;
      this.items[i].groupContainer.style.transform = `translate(0, ${y}px)`;
    }
  }

  private computeHoverItem(e: MouseEvent): void {
    const closestItem = this.findItemClosestToY(e.clientY);
    if (closestItem && closestItem !== this.hoveredItem) {
      closestItem.groupContainer.classList.add('no-animation');
      this.layeredContainer?.removeObject(closestItem);
      this.layeredContainer?.addObject(closestItem);
    }
    this.hoveredItem = closestItem;
  }

  private findItemClosestToY(y: number): DynamicObjectGraphics | undefined {
    let closestItem: DynamicObjectGraphics | undefined;
    let closestDiff = -1;
    this.items.forEach(item => {
      const itemY = this.getCenterY(item.groupContainer.getClientRects()[0]);
      const diff = Math.abs(itemY - y);
      if (closestDiff === -1 || diff < closestDiff) {
        closestItem = item;
        closestDiff = diff;
      }
    });
    return closestItem;
  }

  private getCenterY(rect: DOMRect): number {
    return rect.y + rect.height / 2;
  }

  private resetHoverItem(): void {
    this.items.forEach(item => {
      item.groupContainer.classList.add('no-animation');
      this.layeredContainer?.removeObject(item);
      this.layeredContainer?.addObject(item);
    });
    this.hoveredItem = undefined;
  }
}
