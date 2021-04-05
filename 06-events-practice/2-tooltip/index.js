class Tooltip {
  onPointerMove = (event) => {
    const shift = 10;

    if (event.target.dataset.tooltip !== this.currentText) {
      this.update(event);
    }

    this.element.style.left = `${event.clientX + shift}px`;
    this.element.style.top = `${event.clientY + shift}px`;
  }

  onPointerOver = (event) => {
    if (event.target.dataset.tooltip !== undefined) {
      document.body.appendChild(this.element);
      this.currentText = event.target.dataset.tooltip;
      this.update(event);
      document.addEventListener('pointermove', this.onPointerMove);
      document.addEventListener('pointerout', this.onPointerOut);
    }
  }

  onPointerOut = () => {
    document.removeEventListener('pointermove', this.onPointerMove);
    this.remove();
  }

  constructor() {
    this.currentText = '';
    this.render();
  }

  initialize() {
    document.addEventListener('pointerover', this.onPointerOver);
  }

  update(event) {
    this.element.outerHTML = '';
    this.render(event.target.dataset.tooltip);
  }

  render(tooltipText = '') {
    const element = document.createElement('div');
 
    element.innerHTML = `<div class="tooltip">${tooltipText}</div>`;
    this.element = element.firstElementChild;
    document.body.appendChild(this.element);
    this.element.style.left = '-5000px';
  }

  remove() {
    this.element.remove();
  }
 
  destroy() {
    this.remove();
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointerover', this.onPointerOver);
  }

}


const tooltip = new Tooltip();

export default tooltip;
