import styled from "styled-components";

export interface ButtonProps {
    size: 'small' | 'large';
    buttonType: 'primary' | 'secondary' | 'destructive';
}
  
export const LargePrimary: ButtonProps = {
    size: 'large',
    buttonType: 'primary'
}

export const SmallPrimary: ButtonProps = {
    size: 'small',
    buttonType: 'primary'
}

export const LargeSecondary: ButtonProps = {
    size: 'large',
    buttonType: 'secondary'
}

export const SmallSecondary: ButtonProps = {
    size: 'small',
    buttonType: 'secondary'
}

export const LargeDestructive: ButtonProps = {
    size: 'large',
    buttonType: 'destructive'
}

export const SmallDestructive: ButtonProps = {
    size: 'small',
    buttonType: 'destructive'
}

export const ButtonStyles = styled.button<ButtonProps>`
  border: none;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  border-radius: 20px;
  cursor: pointer;
  color: #FFFFFF;
  line-height: ${p => p.size === 'small' ? '23px': '19px'};
  font-size: ${p => p.size === 'small' ? '13px': '15px'};
  padding: ${p => p.size === 'small' ? '10px': '15px'};
`

export const PrimaryButtonStyles = styled(ButtonStyles)`
  background: #635FC7;
  &:hover {
    background: #A8A4FF;
  }
  &:disabled {
    background: #A8A4FF;
  }
  #dark & {}
  #dark &:hover {}
  #dark &:disabled {
    filter: brightness(60%);
  }
`

export const SecondaryButtonStyles = styled(ButtonStyles)`
    background: rgba(99, 95, 199, 0.1);
    color: #635FC7;
    &:hover {
      background: rgba(99, 95, 199, 0.25);
    }
    &:disabled {
      background: rgba(99, 95, 199, 0.25);
    }
    #dark & {
      background: #FFFFFF;
    }
    #dark &:hover {}
    #dark &:disabled {}
`

export const DestructiveButtonStyles = styled(ButtonStyles)`
    background: #EA5555;
    &:hover {
      background: #FF9898;
    }
    &:disabled {
      background: #FF9898;
    }
    #dark & {}
    #dark &:hover {}
    #dark &:disabled {}
`

