import Component from "../../Framework/Component/Component";

interface iInput {
  placeholder?: string,
  value?: number
}

class Input extends Component {
  constructor(props?: iInput) {
    super(props);
  }

  render() {
    return {
      tagName: 'input',
      placeholder: this.props.placeholder,
      value: this.props.value
    }
  }
}

export default Input;