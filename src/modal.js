class Modal {
  constructor(overlay) {
    this.overlay = overlay;
    const closeButton = overlay.querySelector('.button-close')

    this.registerListeners(closeButton);
  }

  open() {
    this.overlay.classList.remove('is-hidden');
  }

  close() {
    this.overlay.classList.add('is-hidden');
  }

  registerListeners(closeButton) {
    closeButton.addEventListener('click', this.close.bind(this));

    this.overlay.addEventListener('click', e => {
      if (e.target.id === this.overlay.id) {
        this.close();
      }
    });
  }
}

module.exports = Modal;

