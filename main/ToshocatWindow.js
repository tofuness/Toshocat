class ToshocatWindow {
  restore() {
    this.window.show();
    this.window.restore();
    this.window.focus();
    this.window.setSkipTaskbar(false);
  }
  show() {
    this.window.focus();
    this.window.show();
  }
  hide() {
    this.window.hide();
  }
}

module.exports = ToshocatWindow;
