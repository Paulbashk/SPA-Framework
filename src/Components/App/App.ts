import Component from "../../Framework/Component/Component";
import FrameworkRender from "../../Framework/Namespaces/render-namespace";
import doReducer from "./doReducer";
import Button from "../Button/Button";
import Input from "../Input/Input";

class App extends Component {
  constructor(props?: FrameworkRender.iAnyObject) {
    super(props);

    this.state = {
      value: 1
    }
  }

  public componentDidUpdate(prevState: FrameworkRender.iAnyObject): void {
    console.log(this.state);
  }

  reducerValue(type: string, val: number): number {
    switch(type) {
      case doReducer.ADD: {
        this.setState({ value: this.state.value + val });

        break;
      }
      case doReducer.TURNDOWN: {
        this.setState({ value: this.state.value - val });

        break;
      }
      default: {
        this.setState({ value: this.state.value });
      }
    }

    return this.state.value;
  }
    
  render() {
    return {
      tagName: 'div',
      className: 'App',
      children: [
        this.Component(Button, {
          name: 'Прибавить 1',
          typeReducer: doReducer.ADD,
          reducerValue: this.reducerValue.bind(this)
        }),
        this.Component(Input, {
          placeholder: 'Значение',
          value: this.state.value
        }),        
        this.Component(Button, {
          name: 'Убавить 1',
          typeReducer: doReducer.TURNDOWN,
          reducerValue: this.reducerValue.bind(this)
        })
      ]
    }
  }
}

export default App;