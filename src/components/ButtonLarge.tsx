import './ButtonLarge.css';

// todo update so that we don't need this anymore
export function ButtonLarge(
  props: {
      label: string, 
      isDisabled: boolean,
      onClick?: () => void;
  }) {

  return (
      <button disabled={props.isDisabled} className={`button-large`} onClick={props.onClick}>{props.label}</button>
  )
}
