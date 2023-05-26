import styled from "styled-components";

export const ButtonS = styled.button<{ color: string, backgroundColor: string, hoverColor: string }>`
    border: none;
    padding: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 23px;
    text-align: center;
    color: ${({ color }) => color};
    background: ${({ backgroundColor }) => backgroundColor};
    border-radius: 20px;
    cursor: pointer;
    &:hover {
        background: ${({ hoverColor }) => hoverColor};
      }
`
