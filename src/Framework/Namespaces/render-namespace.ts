import Component from "../Component/Component";
import Render from "../Render/Render";

namespace FrameworkRender {
  /* Сигнатура абстрактного главного компонента */
  export type tSignatureComponent = new () => Component;

  /* Сигнатура абстрактного главного компонента с пропсами (для компонентов) */
  export type tSignatureComponentProp = new (props: any) => Component;

  export type tAnyObject = IAnyObject; 

  /* Типизация children для virtual object */
  export type tChildrenComponent = Array<IComponent> | IComponent;

  /* Типизация для параметров html элемента */
  type tDefaultValueType = string | boolean | number | object;

  /* Сигнатура вызова функции рендера */
  type tSigtatureFuncRenderDOM = (rootElement: HTMLElement) => IRenderDOMFunc;

  /* Типизация (расширение) для глобальной переменной window */
  export interface globalWindowDeclare {
    Render: Render | null
  }

  /* Типизация глобального импорт объекта */
  export interface IGlobalImportFramework {
    [key: string]: any,
    RenderDOM: tSigtatureFuncRenderDOM,
    Component: typeof Component
  }

  /* Модель объекта компоненты */
  export interface IComponent {
    [key: string]: any,
    tagName: string,
    className?: string,
    idElement?: string,
    href?: string,
    text?: string,   
    type?: string,
    style?: string,
    value?: string,
    checked?: boolean,
    placeholder?: string,
    children?: tChildrenComponent,
    onClick?: Function,
    onChange?: Function,
  }

  /* Типизация пустых объектов с неизвестными значениями и ключами */
  export interface IAnyObject {
    [key: string]: any
  }

  /* Интерфейс типизации основной инициализирующей функции */
  export interface IRenderDOMFunc {
    Render: Render
  };

  /* Типизация созданного html элемента с свойствами из virtual object */
  export type IHtmlElement = HTMLElement & { [key: string | number]: string | number | object | boolean };

  /* Типизация всех свойств, не включенных в interface objectComponent */
  export interface IOtherObjectComponent {
    [key: string]: tDefaultValueType
  }

  /* Резервирование типов input с параметром checked */
  export enum typesForInputsComponent {
    CHECKBOX = 'checkbox',
    RADIO = 'radio'
  }

  /* Резервирование наименований тегов для события change */
  export enum tagNamesForEventsInRender {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    SELECT = 'select'
  }
}

export default FrameworkRender;