import './ButtonLarge.css';

export function ButtonLarge(
  props: {
      label: string, 
      onClick?: () => void;
  }) {
  return (
      <button className='button-large' onClick={props.onClick}>{props.label}</button>
  )
}
