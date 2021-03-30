export default class NotificationMessage {
  constructor(text = '', {
    duration = 1000,
    type = ''
  } = {}) {
    this.text = text;
    this.duration = duration;
    this.type = type;
    this.render();
  }

  bodyElement = document.querySelector('body');
  static isShowed = false;
  static renderedElement;

  showUnique(targetElement) {
    this.constructor.renderedElement = targetElement.appendChild(this.element);
    this.constructor.isShowed = true;
    if (this.constructor.timeout) {
      clearTimeout(this.constructor.timeout);
    }
    this.constructor.timeout = setTimeout(() => {
      this.remove();
      this.constructor.isShowed = false;
    }, this.duration);
  }

  
  show(targetElement = this.bodyElement) {
    if (!this.constructor.isShowed) {
      this.showUnique(targetElement);
    } else {
      this.constructor.renderedElement.remove();
      this.showUnique(targetElement);
    }
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
    <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
      <div class="timer"></div>
      <div class="inner-wrapper">
        <div class="notification-header">${this.type}</div>
        <div class="notification-body">
          ${this.text}
        </div>
      </div>
    </div>
    `;

    this.element = element.firstElementChild;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
