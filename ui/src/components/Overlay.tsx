import { ReactNode } from 'react';
import { OverlayStyles, OverlayContentStyles } from './styles/Overlay.styles';

export function Overlay(props: {
    children: ReactNode,
    handleClose: () => void
}) {
    return (
        <OverlayStyles data-testid='overlay' onClick={() => props.handleClose()}>
            <OverlayContentStyles data-testid='overlay-content' onClick={(e) => e.stopPropagation()}>
                {props.children}
            </OverlayContentStyles>
        </OverlayStyles>
    )
}