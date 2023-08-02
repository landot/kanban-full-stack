import { useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();
  
    return (
        <div>
            <h1>An error has occurred</h1>
            {error instanceof Error && (
                <p>
                    <i>{error.message}</i>
                </p>
            )}
        </div>
    )
}