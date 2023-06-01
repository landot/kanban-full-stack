import { ReactNode } from 'react';
import './Overlay.css';

export function Overlay(props: {children: ReactNode}) {
    return (
        <div className='overlay'>
            <div className='overlay-content'>
                {props.children}
            </div>
        </div>
    )
}