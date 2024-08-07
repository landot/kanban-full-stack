import styled from "styled-components"

export const DarkModeToggleStyles = styled.div`
    margin: 0 24px 0 24px;
    width: 90%;
    display: flex;
    align-content: center;
    justify-content: center;
    background: #F4F7FD;
    border-radius: 6px;
    padding: 15px;

    img {
        width: 20px;
        height: 20px;
    }

    #dark & {
        background: #20212C;
    }
`

export const SwitchStyles = styled.label`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin: 0 24px;
`

export const SliderStyles = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #635FC7;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 10px;

    &:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }
`

export const SwitchInputStyles = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + ${SliderStyles} {
        background-color: #635FC7;
    }

    &:checked + ${SliderStyles}:before {
        -webkit-transform: translateX(20px);
        -ms-transform: translateX(20px);
        transform: translateX(20px);
    }

    &:focus + ${SliderStyles} {
        box-shadow: 0 0 1px #635FC7;
    }
`
