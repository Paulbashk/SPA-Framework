import Framework, { ValueDefault, ClassComponent } from "../../Framework";
import Counter from "../Counter/Counter";


class App extends Framework.Component implements ClassComponent {
  constructor(props: ValueDefault) {
    super(props);
  }

  render() {
    

    return {
      tagName: 'div',
      className: 'App',
      children: [
        this.Component(Counter, {key: 1}),
        this.Component(Counter, {key: 2}),
      ]
    }
  }
}

export default App;