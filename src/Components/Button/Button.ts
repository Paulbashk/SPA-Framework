import Framework, { ClassComponent } from "../../Framework";


interface IButtonProps {
  name: string,
  state: string,
  setState: Function,
  reducerValue: Function,
}

class Button extends Framework.Component implements ClassComponent {
  constructor(props: IButtonProps) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(e: Event) {
    const actionCreators = { type: this.props.typeReducer, payload: Number(prompt('Введите значение')) };

    this.props.setState({ 
      value: this.props.reducerValue(this.props.state.value, actionCreators)
    });
  }

  render() {
    return {
      tagName: 'button',
      text: this.props.name,
      onClick: (e: Event) => this.updateValue
    }
  }
}

export default Button;