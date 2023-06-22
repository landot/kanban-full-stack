import { useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();
    console.error(error);
  
    return (
        <div>
            <h1>An error has occurred</h1>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}