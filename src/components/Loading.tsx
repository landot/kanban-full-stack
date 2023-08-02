import { HeadingXL } from "./styles/header/HeadingXL";
import { Overlay } from "./Overlay";
import { LoadingStyles } from "./styles/Loading.styles";

export function Loading(props: {text: string}) {
    return (
        <Overlay handleClose={() => null} children={
            <LoadingStyles>
                <HeadingXL>{props.text}</HeadingXL>
            </LoadingStyles>
        }/>
    )
}