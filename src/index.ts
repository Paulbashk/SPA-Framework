import Framework from "./Framework";
import App from "./Components/App/App";

const { Render } = Framework.RenderDOM(document.getElementById('root')!);

Render.create(App);