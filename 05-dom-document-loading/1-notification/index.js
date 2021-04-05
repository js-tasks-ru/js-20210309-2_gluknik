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

  static isShowed = false;
  static renderedElement;

  showUnique(targetElement) {
    NotificationMessage.renderedElement = targetElement.appendChild(this.element);
    NotificationMessage.isShowed = true;
    if (NotificationMessage.timeout) {
      clearTimeout(NotificationMessage.timeout);
    }
    NotificationMessage.timeout = setTimeout(() => {
      this.remove();
      NotificationMessage.isShowed = false;
    }, this.duration);
  }

  
  show(targetElement = document.body) {
    if (!NotificationMessage.isShowed) {
      this.showUnique(targetElement);
    } else {
      NotificationMessage.renderedElement.remove();
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
