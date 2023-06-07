import './ButtonLarge.css';

// todo update so that we don't need this anymore
export function ButtonLarge(
  props: {
      label: string, 
      onClick?: () => void;
  }) {
  return (
      <button className='button-large' onClick={props.onClick}>{props.label}</button>
  )
}
