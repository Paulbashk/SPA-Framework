import FrameworkRender from "../Namespaces/render-namespace";

/* Класс, содержащий в себе необходимые элементы, для работы рендера и компонентов */
class virtualObjectDOMModule {
  /* virtualDOM - объект, содержащий информацию о дереве html элементов */
  private virtualDOM: Partial<FrameworkRender.iObjectComponent> = {};

  /** 
  * Функция возвращает текущий virtual DOM
  * 
  * @return возвращает текущий Virtual DOM Object
  * 
  */
  get get(): FrameworkRender.iObjectComponent {
    return this.virtualDOM as FrameworkRender.iObjectComponent;
  }

  /** 
  * Функция обновляет (устанавливает) новый virtual Object
  * 
  * @param virtualDOM Virtual Object DOM
  * 
  */  
  set update(virtualDOM: FrameworkRender.iObjectComponent) {
    this.virtualDOM = virtualDOM;
  }
}

const virtualDOM: virtualObjectDOMModule = new virtualObjectDOMModule();

export default virtualDOM;

