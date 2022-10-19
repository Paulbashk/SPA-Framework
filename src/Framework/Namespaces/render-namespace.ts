import Component from "../Component/Component";
import Render from "../Render/Render";

namespace FrameworkRender {
  /* Сигнатура абстрактного главного компонента */
  export type tSignatureComponent = new () => Component;

  /* Сигнатура абстрактного главного компонента с пропсами (для компонентов) */
  export type tSignatureComponentProp = new(props?: iAnyObject) => Component;

  export type tAnyObject = iAnyObject; 

  /* Типизация children для virtual object */
  export type tChildrenComponent = Array<iObjectComponent> | iObjectComponent;

  /* Типизация для параметров html элемента */
  type tDefaultValueType = string | boolean | number | object;

  /* Типизация (расширение) для глобальной переменной window */
  export interface globalWindowDeclare {
    Render: Render | null
  }

  /* Модель объекта компоненты */
  export interface iObjectComponent {
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
  export interface iAnyObject {
    [key: string]: any
  }

  /* Интерфейс типизации основной инициализирующей функции */
  export interface iFuncFramework {
    Render: Render
  };

  /* Типизация созданного html элемента с свойствами из virtual object */
  export type iHtmlElement = HTMLElement & { [key: string | number]: string | number | object | boolean };

  /* Типизация всех свойств, не включенных в interface objectComponent */
  export interface iOtherObjectComponent {
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