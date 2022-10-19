import Component from "../../Framework/Component/Component";

interface iButton {
  name?: string,
  reducerValue?: Function,
}

class Button extends Component {
  constructor(props?: iButton) {
    super(props);

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(e: Event) {
    this.props.reducerValue(this.props.typeReducer, 1);
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