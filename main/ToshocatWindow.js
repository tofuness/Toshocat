class ToshocatWindow {
  restore() {
    this.window.restore();
    this.window.focus();
    this.window.setSkipTaskbar(false);
  }
  show() {
    this.window.show();
  }
  hide() {
    this.window.hide();
  }
}

module.exports = ToshocatWindow;
