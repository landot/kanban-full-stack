import { ButtonL } from '../styledComponents/button/ButtonL';
import './button.css';

export interface ButtonProps {
  color: string;
  backgroundColor: string;
  hoverColor: string;
  label: string;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const ButtonPrimaryLarge = ({
  color,
  backgroundColor,
  hoverColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <ButtonL
      className={''}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      {...props}
    >
      {label}
    </ButtonL>
  );
};
