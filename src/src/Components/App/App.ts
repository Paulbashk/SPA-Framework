import Framework, { ValueDefault, ReducerAction, ClassComponent } from "../../Framework";
import Button from "../Button/Button";
import Input from "../Input/Input";

export enum doReducer {
  ADD = 'ADD',
  TURNDOWN = 'TURNDOWN'
}

class App extends Framework.Component implements ClassComponent {
  constructor(props: ValueDefault) {
    super(props);

    this.state = {
      value: 1
    }
  }

  public componentDidUpdate(prevState: ValueDefault): void {
    console.log(this.state);
  }

  reducerValue(state: number, action: ReducerAction): number {
    switch(action.type) {
      case doReducer.ADD: 
        return state + action.payload;
      case doReducer.TURNDOWN: 
        return state - action.payload;
      default: 
        return state;
    }
  }
    
  render() {
    return {
      tagName: 'div',
      className: 'App',
      children: [
        this.Component(Button, {
          name: 'Прибавить',
          typeReducer: doReducer.ADD,
          state: this.state.value,
          setState: this.setState.bind(this),
          reducerValue: this.reducerValue.bind(this)
        }),
        this.Component(Input, {
          placeholder: 'Значение',
          value: this.state.value
        }),        
        this.Component(Button, {
          name: 'Убавить',
          typeReducer: doReducer.TURNDOWN,
          state: this.state.value,
          setState: this.setState.bind(this),
          reducerValue: this.reducerValue.bind(this)
        })
      ]
    }
  }
}

export default App;