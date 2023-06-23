import { HeadingXL } from "./styles/header/HeadingXL";
import { Overlay } from "./Overlay";
import './Loading.css';

export function Loading(props: {text: string}) {
    return (
        <Overlay handleClose={() => null} children={
            <div className="loading">
                <HeadingXL>{props.text}</HeadingXL>
            </div>
            
        }
        />
    )
}