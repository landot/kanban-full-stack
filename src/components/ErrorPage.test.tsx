import { ErrorPage } from "./ErrorPage";
import { render } from '@testing-library/react'
import { BrowserRouter, Route, Routes } from "react-router-dom";


function Page() {
    return (
        <div>
            <p>page</p>
        </div>
    )
}

describe("ErrorPage", () => {
    // figure out how to mock an error so that the errorElement is shown
    test.skip('error page and error message are shown', () => {
        const {getByText} = render(
            <BrowserRouter>
                <Routes>
                    <Route 
                        path="/" 
                        element={<Page/>} 
                        errorElement={<ErrorPage/>}
                    />
                </Routes>
            </BrowserRouter>
        )
        expect(getByText('An error has occurred')).toBeInTheDocument();
    })
})
