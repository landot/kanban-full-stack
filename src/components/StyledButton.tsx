import { ButtonProps, DestructiveButtonStyles, PrimaryButtonStyles, SecondaryButtonStyles } from './styles/StyledButton.styles';

export function StyledButton(
  props: {
    label: string,
    isDisabled: boolean,
    buttonProps: ButtonProps,
    onClick?: () => void
  }) {
    let Button;
    if(props.buttonProps.buttonType === 'secondary') {
      Button = SecondaryButtonStyles;
    } else if(props.buttonProps.buttonType === 'destructive') {
      Button = DestructiveButtonStyles;
    } else {
      Button = PrimaryButtonStyles;
    }

    return (
      <Button {...props.buttonProps} disabled={props.isDisabled} onClick={props.onClick}>{props.label}</Button>
    )
  }
