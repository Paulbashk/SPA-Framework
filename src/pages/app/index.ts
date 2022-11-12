import MainPage from "../main";
import Page from "../../core/templates/page";
import SettingsPage from "../settings";
import StatisticsPage from "../statistics";
import Header from "../../core/components/header";
import ErrorPage from "../error";

export const enum PageIds {
  MainPage = 'main-page',
  SettingsPage = 'settings-page',
  StatisticsPage = 'statistics-page'
}

export enum ErrorTypes {
  Error_404 = '404',
}

class App {
  private static container: HTMLElement = document.body;
  private static defaultPageId: string = 'current-page';
  /* тип данных класса (instance), если переменная хранит класс */
  private initialPage: MainPage; 
  private header: Header;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);

    if(currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null;

    switch(idPage) {
      case PageIds.MainPage: {
        page = new MainPage(idPage);

        break;
      }
      case PageIds.SettingsPage: {
        page = new SettingsPage(idPage);

        break;
      }
      case PageIds.StatisticsPage: {
        page = new StatisticsPage(idPage);

        break;
      }
      default: {
        page = new ErrorPage(idPage, ErrorTypes.Error_404);

        break;
      }
    }

    if(page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.header = new Header('header', 'header-container');
  }

  /* Запуск проекта */
  run() {
    App.container.append(this.header.render());
    App.renderNewPage('main-page');
    this.enableRouteChange();
  }
}

export default App;