import Framework, { ClassComponent } from "../../Framework";

interface IInputProps {
  placeholder: string,
  value: number
}

class Input extends Framework.Component implements ClassComponent {
  constructor(props: IInputProps) {
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