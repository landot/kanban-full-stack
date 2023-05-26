import styled from "styled-components";

export const ButtonL = styled.button<{ color: string, backgroundColor: string, hoverColor: string }>`
    border: none;
    padding: 15px;
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    color: ${({ color }) => color};
    background: ${({ backgroundColor }) => backgroundColor};
    border-radius: 24px;
    cursor: pointer;
    &:hover {
        background: ${({ hoverColor }) => hoverColor};
      }
`
