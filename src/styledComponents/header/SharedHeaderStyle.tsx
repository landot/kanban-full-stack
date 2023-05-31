import { css } from "styled-components";


export const SharedHeaderStyle = css<{ color?: string }>`
    font-style: normal;
    font-weight: 700;
    color: #000112;
    color: ${({ color = '#000112' }) => color};

`