import Framework, { ValueDefault, ReducerAction, ClassComponent } from "../../Framework";
import Button from "../Button/Button";
import Input from "../Input/Input";

export enum doReducer {
  ADD = 'ADD',
  TURNDOWN = 'TURNDOWN'
}

class Counter extends Framework.Component implements ClassComponent {
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
    
  render(state: any) {
    console.log(state);

    return {
      key: this.props.key,
      tagName: 'div',
      className: `Counter ${this.props.key}`,
      children: [
        this.Component(Button, {
          name: 'Прибавить',
          typeReducer: doReducer.ADD,
          state: this.state,
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
          state: this.state,
          setState: this.setState.bind(this),
          reducerValue: this.reducerValue.bind(this)
        }),
      ]
    }
  }
}

export default Counter;