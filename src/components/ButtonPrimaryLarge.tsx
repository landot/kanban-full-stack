import { ButtonL } from '../styledComponents/button/ButtonL';

export interface ButtonProps {
  color: string;
  backgroundColor: string;
  hoverColor: string;
  label: string;
  onClick?: () => void;
}

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
