import Page from "../../core/templates/page";
import { ErrorTypes } from "../app";

class ErrorPage extends Page {
  private errorType: string | ErrorTypes;

  static TextObject: { [prop: string]: string } = {
    '404': 'Error! The page was not found.'
  };

  constructor(id: string, errorType: string | ErrorTypes) {
    super(id);
    this.errorType = errorType;
  }

  render() {
    const title = this.createHeaderTitle(ErrorPage.TextObject[this.errorType]);
    this.container.append(title);

    return this.container;
  }
}

export default ErrorPage;