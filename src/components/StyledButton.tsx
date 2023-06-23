import styled from 'styled-components';
import './ButtonSmall.css';


interface ButtonProps {
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
  line-height: ${p => p.size === 'small' ? '23px': '19px'};
  font-size: ${p => p.size === 'small' ? '13px': '15px'};
  padding: ${p => p.size === 'small' ? '10px': '15px'};

  color: ${({buttonType}) => 
    buttonType === 'secondary' && '#635FC7' || '#FFFFFF'
  };

  background: ${({buttonType}) => 
    buttonType === 'primary' && '#635FC7' ||
    buttonType === 'secondary' && 'rgba(99, 95, 199, 0.1)' || 
    buttonType === 'destructive' && '#EA5555' 
  };

  &:hover {
    background: ${({buttonType}) => 
      buttonType === 'primary' && '#A8A4FF' ||
      buttonType === 'secondary' && 'rgba(99, 95, 199, 0.25)' || 
      buttonType === 'destructive' && '#FF9898'
    };
  }

  &:disabled {
    background: #A8A4FF;
  }

  &:disabled:hover {
    cursor: default;
  }

  #dark & {
    background: ${({buttonType}) => 
      buttonType === 'primary' && '#635FC7' ||
      buttonType === 'secondary' && '#FFFFFF' || 
      buttonType === 'destructive' && '#EA5555' 
    };

    &:hover {
      background: ${({buttonType}) => 
        buttonType === 'primary' && '#A8A4FF' ||
        buttonType === 'secondary' && '#FFFFFF' || 
        buttonType === 'destructive' && '#FF9898'
      };
    }

    &:disabled {
      background: #A8A4FF;
      filter: brightness(40%);
    }
  }
`

export function StyledButton(
  props: {
    label: string,
    isDisabled: boolean,
    buttonProps: ButtonProps,
    onClick?: () => void
  }) {
    return (
      <ButtonStyles {...props.buttonProps} disabled={props.isDisabled} onClick={props.onClick}>{props.label}</ButtonStyles>
    )
  }

// todo update so that we don't need this anymore
export function ButtonSmall(
    props: {
        label: string, 
        type: 'primary' | 'secondary' | 'destructive',
        onClick?: () => void;
    }) {
    return (
        <button className={`button-small ${props.type}`} onClick={props.onClick}>{props.label}</button>
    )
}
