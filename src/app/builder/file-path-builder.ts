export class FilePathBuilder {
  private currentUrl = '';

  append(value: string) {
    this.currentUrl += value;
  }

  build() {
    const url = new String(this.currentUrl).toString();
    this.currentUrl = '';
    return url;
  }
}
