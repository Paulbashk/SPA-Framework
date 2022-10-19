import Framework from "./Framework";
import App from "./Components/App/App";

const { Render } = Framework(document.getElementById('root')!);

Render.create(App);