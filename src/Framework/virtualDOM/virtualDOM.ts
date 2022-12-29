import FrameworkRender from "../Namespaces/render-namespace";

/* Класс, содержащий в себе необходимые элементы, для работы рендера и компонентов */
class virtualObjectModule {
  /* virtualDOM - объект, содержащий информацию о дереве html элементов */
  private virtualDOM: Partial<FrameworkRender.IComponent> = {};

  /** 
  * Функция возвращает текущий virtual DOM
  * 
  * @return возвращает текущий Virtual DOM Object
  * 
  */
  get get(): FrameworkRender.IComponent {
    return this.virtualDOM as FrameworkRender.IComponent;
  }

  /** 
  * Функция обновляет (устанавливает) новый virtual Object
  * 
  * @param virtualDOM Virtual Object DOM
  * 
  */  
  set update(virtualDOM: FrameworkRender.IComponent) {
    this.virtualDOM = virtualDOM;
  }
}

const virtualDOM: virtualObjectModule = new virtualObjectModule();

export default virtualDOM;

