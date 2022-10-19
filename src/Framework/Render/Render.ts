import Component from "../Component/Component";
import FrameworkRender from "../Namespaces/render-namespace";
import virtualDOM from "../virtualDOM/virtualDOM";


/* Модуль, отвечающий за рендер */
class Render {
  /* Контейнер - место для расположения всех элементов */
  private renderContainer: HTMLElement;
  /* Место хранения дерева html */
  private treeHTML!: HTMLElement;

  constructor(renderContainer: HTMLElement) {
    this.renderContainer = renderContainer;
  }

  /** 
  * Функция инициализации процесса рендера
  * 
  * @param renderComponent Основной (первый) компонент
  * 
  */
  public create(renderComponent: new(props?: FrameworkRender.iAnyObject) => Component): void {
    const component = new renderComponent();

    virtualDOM.update = component.render();

    this.parseVirtualDOM(virtualDOM.get);

    // Создание элементов
    if(this.treeHTML && this.renderContainer) {
      this.renderContainer.append(this.treeHTML);
    }
  }

  /** 
  * Функции конвертации virtual DOM в HTML Tree. Очистка старого HTML Tree. Вывод нового.
  * 
  * @param virtualDOM Дерево, состоящее из virtual DOM objects
  * 
  */  
  public convertVirtualDOMAndUpdateDOM(argVirtualDOM: FrameworkRender.iObjectComponent): void {
    this.parseVirtualDOM(argVirtualDOM);

    if(this.treeHTML && this.renderContainer) {
      this.renderContainer.innerHTML = '';
      this.renderContainer.append(this.treeHTML);
    }
  }

  /** 
  * Функция парсинга Virtual DOM в дерево html
  * 
  * @param virtualDOM Дерево, состоящее из virtual DOM objects
  * 
  */
  private parseVirtualDOM(argVirtualDOM: FrameworkRender.iObjectComponent): void {
    const { children, ...other }: FrameworkRender.iObjectComponent = argVirtualDOM;
    const mainElement: HTMLElement = this.createElement(other);
    this.treeHTML = mainElement;

    if(children) {
      this.convertVirtualDOM(children, mainElement);
    }
  }

  /** 
  * Функция конвертации Virtual DOM в tree html
  * 
  * @param children Дочерний компонент
  * @param element html элемент, необходим для последующей работы функции appendElement(children, element)
  * @return Возвращает undefined если children массив, и html если children instance component
  * 
  */  
  private convertVirtualDOM(children: FrameworkRender.tChildrenComponent, element: HTMLElement): HTMLElement | undefined {
    if(children) {
      if(children instanceof Array) {
        children.forEach((component: FrameworkRender.iObjectComponent) => {
          this.appendElement(component, element);
        });
      } else if(children instanceof Object) {
        return this.appendElement(children, element);
      }
    }
  }

  /** 
  * Вставка html элемента (и его конвертация из virtual DOM object) в родительский html элемент
  * 
  * @param element Родительский virtual DOM object
  * @param children Дочерний virtual DOM object
  * 
  */  
  private appendElement(children: FrameworkRender.iObjectComponent, element: HTMLElement): HTMLElement | undefined {
    const parseChildrenElement = this.createElement(children);
    const child = children.children;

    element.appendChild(parseChildrenElement);

    if(child) {
      return this.convertVirtualDOM(child, parseChildrenElement);
    }

    return element;
  }

  /** 
  * Функция форматирует virtual DOM object в html
  * 
  * @param virtualObject Виртуальный объект, составляющая virtual DOM object
  * @return Возвращает созданный html элемент из virtual DOM object
  * 
  */    
  public createElement(virtualObject: FrameworkRender.iObjectComponent): HTMLElement {
    const element = <FrameworkRender.iHtmlElement>document.createElement(virtualObject.tagName);

    const { 
      className, 
      idElement, 
      text, 
      checked, 
      value, 
      tagName, 
      children, 
      onClick, 
      onChange, 
      href, 
      ...other 
    }: FrameworkRender.iObjectComponent = virtualObject;

    /* Остальные параметры элемента */
    const otherParamObject: FrameworkRender.iOtherObjectComponent = Object.assign({}, other);

    if(className) {
      element.className = className;
    }

    if(idElement) {
      element.id = idElement;
    }

    if(text) {
      element.innerText = text;
    }

    if(element instanceof HTMLInputElement) {

      if(value) {
        element.value = value;
      }

      if(otherParamObject.type !== undefined && otherParamObject.type !== null) {
        if(
          (otherParamObject.type === FrameworkRender.typesForInputsComponent.CHECKBOX 
          || otherParamObject.type === FrameworkRender.typesForInputsComponent.RADIO) 
          && checked) {
          element.checked = checked;
        }
      }
    }

    if(href && element instanceof HTMLAnchorElement) {
      element.setAttribute('href', href);
    }

    for(let key in otherParamObject) {
      element[key] = otherParamObject[key];
    }

    /* Обработка событий */
    if(
      tagName.trim() === FrameworkRender.tagNamesForEventsInRender.INPUT || 
      tagName.trim() === FrameworkRender.tagNamesForEventsInRender.TEXTAREA ||
      tagName.trim() === FrameworkRender.tagNamesForEventsInRender.SELECT
    ) {
      if(onChange !== undefined) {
        const _changeFunc = onChange();

        element.addEventListener('change', (event: Event) => onChange !== undefined ? _changeFunc(event) : null, false);
      }
    }

    if(onClick !== undefined) {
      const _clickFunc = onClick();

      element.addEventListener('click', (event: Event) => onClick !== undefined ? _clickFunc(event) : null, false);
    }

    return element;
  }
};

export default Render;