import Page from "../../core/templates/page";

class MainPage extends Page {

  static TextObject = {
    MainTitle: "Main page"
  };

  constructor(id: string) {
    /* Вызов конструктора родительского класса (абстрактного класса) */
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);

    return this.container;
  }
}

export default MainPage;