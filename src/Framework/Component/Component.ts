import FrameworkRender from "../Namespaces/render-namespace";
import virtualDOM from "../virtualDOM/virtualDOM";

/**
* Функция сравнения и обновления компоненты 
* 
* @param component Компонент, который необходимо сравнить и обновить
* @param prevState Предыдущее состояние до его изменения
* 
*/
function componentUpdate(component: Component, prevState: FrameworkRender.tAnyObject): void {
  if(Object.keys(prevState).some(
    key => prevState[key] !== component.state[key]
  )) {
    virtualDOM.update = component.render();

    if(window.framework.Render) {
      window.framework.Render.convertVirtualDOMAndUpdateDOM(virtualDOM.get);
    }

    if(component.componentDidUpdate) {
      component.componentDidUpdate(prevState);
    }
  }
}

/* Модуль, реализующий компоненты */
abstract class Component {
  /* Virtual DOM object текущего объекта */
  private innerObject: FrameworkRender.iObjectComponent = {
    tagName: 'div'
  };
  /* Инициализация хранилища для приходящих данных из родительского компонента */
  public props: Partial<FrameworkRender.tAnyObject> = {};
  /* Инициализация переменной для функции componentUpdate */
  public updater: Function;
  /* Инициализация хранилища для состояний текущего компонента */
  public state: FrameworkRender.tAnyObject = {};

  constructor(props?: FrameworkRender.tAnyObject) {
    if(props) {
      this.props = props;
    }

    this.updater = componentUpdate;

    this._componentDidMount(this.state);
  }

  /**
  * Функция изменения значения состояния и реализация функции его объявления
  * 
  * @param newState (Object) Новое значение для состояния. Пример: { value: 'new value' }
  * 
  */
  public setState(newState: FrameworkRender.tAnyObject): void {
    const prevState = this.state;

    this.state = typeof newState === 'function'
      ? newState(prevState)
      : { ...prevState, ...newState };

    this.updater(this, prevState);
  }


  /**
  * Функция вызывается при обновлении компоненты (перередеринг)
  * 
  * @param prevState Предыдущее значение состояния
  * 
  */  
  public componentDidUpdate(prevState: FrameworkRender.tAnyObject): void {}

  /**
  * Функция вызывается при первичном монтировании компонента
  * 
  * @param defaultState Начальное значение state при первичном рендеринге компонента
  * 
  */  
  public componentDidMount(defaultState: FrameworkRender.tAnyObject): void {}

  /**
  * Функция реализует монтирование компонента
  * Инициализирует функцию render(), формируя virtual DOM object в локальную переменную innerObject
  * 
  * @param defaultState Начальное значение state при первичном рендеринге компонента
  * 
  */  
  private _componentDidMount(defaultState: FrameworkRender.tAnyObject): void {
    this.componentDidMount(defaultState);

    this.innerObject = this.render();
  }

  /**
  * Функция инициализирует компонент и формирует virtual DOM object данного объекта. 
  * Передет указанные данные в данный компонент.
  * Применяется в объекте компоненты для параметра children
  * 
  * @param component Указывается ссылка на компонент
  * @param props Указываются данные, которые нужно передать в указываемую компоненту
  * @return Возвращает virtual DOM object передаваемого компонента
  * 
  */  
  public Component(component: FrameworkRender.tSignatureComponentProp, props?: FrameworkRender.tAnyObject): FrameworkRender.iObjectComponent {
    const instance: Component = new component(props);
    const innerChildrenObject = instance.innerObject;

    if(innerChildrenObject.children && innerChildrenObject.children instanceof Component) {
      innerChildrenObject.children = innerChildrenObject.children.innerObject;
    }

    return innerChildrenObject as FrameworkRender.iObjectComponent;
  }

  /**
  * Функция возвращает сформированный virtual DOM object
  * 
  * @return Возвращает virtual DOM object  
  * 
  */    
  public render(): FrameworkRender.iObjectComponent {

    return {
      tagName: 'div'
    };
  }
}

export default Component;