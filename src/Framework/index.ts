import FrameworkRender from "./Namespaces/render-namespace";
import Render from './Render/Render';

declare global {
  interface Window {
    framework: FrameworkRender.globalWindowDeclare
  }
}

/* Глобальный объект, необходим для быстрого доступа к элементам рендера */
window.framework = {
  Render: null
};

/** 
* Основная инициализирующая функция
* 
* @param rootElement Основной html элемент, расположенный в index.html, необходим для рендера
* @return (object) Инициализация рендер модуля
* 
*/ 
function Framework(rootElement: HTMLElement): FrameworkRender.iFuncFramework {
  window.framework.Render = new Render(rootElement);

  if(rootElement !== null) {
    rootElement = document.body;
  }

  return {
    Render: window.framework.Render
  };
}

export default Framework;