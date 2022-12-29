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

    const render = component.render();
    const App = virtualDOM.get;
    const AppChildren = App.children;
    const filteredComponents = AppChildren?.filter((component: FrameworkRender.tAnyObject) => component.key !== render.key);
    
    virtualDOM.update = {...App, children: [render, ...filteredComponents].sort((a, b) => a.key - b.key)};


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
  [key: string]: any;

  /* Virtual DOM object текущего объекта */
  private innerObject: FrameworkRender.IComponent = {
    tagName: 'div'
  };
  /* Инициализация хранилища для приходящих данных из родительского компонента */
  public props: Partial<FrameworkRender.tAnyObject> = {};
  /* Инициализация переменной для функции componentUpdate */
  public updater: any;
  /* Инициализация хранилища для состояний текущего компонента */
  //public state: Partial<FrameworkRender.tAnyObject> = {};

  constructor(props: FrameworkRender.tAnyObject) {
    if(props) {
      this.props = props;
    }

    this.componentDidMount();
  }

  /**
  * Функция изменения значения состояния и реализация функции его объявления
  * 
  * @param newState (Object) Новое значение для состояния. Пример: { value: 'new value' }
  * 
  */
  public setState(newState: FrameworkRender.tAnyObject): void {
    const prevState = this.state;
    this.updater = componentUpdate;

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
  */  
  public componentDidMount(): void {}

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
  public Component(component: FrameworkRender.tSignatureComponentProp, props: FrameworkRender.tAnyObject): FrameworkRender.IComponent {
    const instance: Component = new component(props);
    const innerChildrenObject = instance.render(this.state);

    if(innerChildrenObject.children && innerChildrenObject.children instanceof Component) {
      innerChildrenObject.children = innerChildrenObject.children.innerObject;
    }

    return innerChildrenObject as FrameworkRender.IComponent;
  }

  /**
  * Функция возвращает сформированный virtual DOM object
  * 
  * @return Возвращает virtual DOM object  
  * 
  */    
  public render(state?: FrameworkRender.tAnyObject): FrameworkRender.IComponent {
    return {
      tagName: 'div'
    };
  }
}

export default Component;