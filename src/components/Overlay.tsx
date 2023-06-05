import { ReactNode } from 'react';
import './Overlay.css';

export function Overlay(props: {
    children: ReactNode,
    handleClose: () => void
}) {
    return (
        <div className='overlay' onClick={() => props.handleClose()}>
            <div className='overlay-content' onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}