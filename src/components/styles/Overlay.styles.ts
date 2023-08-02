import styled from "styled-components"

export const OverlayStyles = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgb(0, 0, 0, .5);
    mix-blend-mode: normal;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

export const OverlayContentStyles = styled.div`
    position: relative;
    overflow-y: auto;
    max-height: 80dvh;
    min-width: 200px;
    max-width: 500px;
    width: 80%;
    border-radius: 6px;

    & > * {
        border-radius: inherit;
    }
`
