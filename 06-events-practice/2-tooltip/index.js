class Tooltip {
  constructor() {
    if (typeof Tooltip.instance === "object") {
      return Tooltip.instance;
    }
    Tooltip.instance = this;
    return Tooltip.instance;
  }

  initialize() {
    document.addEventListener("pointerover", event => {
      if (event.target.dataset.tooltip) {
        return this.render(event.target.dataset.tooltip);
      }
    });

    document.addEventListener("pointerout", () => {
      if (this.element) {
        return this.element.remove();
      }
    });
  }

  render(tooltip) {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    this.element.innerHTML = tooltip;

    document.body.append(this.element);

    document.addEventListener("pointermove", event => {
      this.element.style.left = event.clientX + 10 + 'px';
      this.element.style.top = event.clientY + 10 + 'px';
    });
  }

  destroy() {
    if (this.element) {
      return this.element.remove();
    }
  }
}

export default Tooltip;
