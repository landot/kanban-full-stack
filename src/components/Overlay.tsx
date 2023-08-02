import { ReactNode } from 'react';
import { OverlayStyles, OverlayContentStyles } from './styles/Overlay.styles';

export function Overlay(props: {
    children: ReactNode,
    handleClose: () => void
}) {
    return (
        <OverlayStyles onClick={() => props.handleClose()}>
            <OverlayContentStyles onClick={(e) => e.stopPropagation()}>
                {props.children}
            </OverlayContentStyles>
        </OverlayStyles>
    )
}