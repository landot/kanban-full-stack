// todo move props interface
import { ButtonProps } from './ButtonPrimaryLarge';
import { ButtonS } from '../styledComponents/button/ButtonS';
import './button.css';
/**
 * Primary UI component for user interaction
 */
export const ButtonPrimarySmall = ({
  color,
  backgroundColor,
  hoverColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <ButtonS
      className={''}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      {...props}
    >
      {label}
    </ButtonS>
  );
};
