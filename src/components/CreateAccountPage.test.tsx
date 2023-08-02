import { CreateAccountPage } from "./CreateAccountPage";
import { fireEvent, render } from '@testing-library/react'
import { Provider } from "react-redux";
import { store } from "../../app/store";
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { User } from "firebase/auth";
import { mock } from 'vitest-mock-extended';

describe("CreateAccountPage", () => {
    test('having auth redirects user to /', () => {
        window.history.pushState({}, '', 'create-account');
        expect(window.location.pathname).not.toBe(`/`);
        const mockUserWithAuth = mock<User>({isAnonymous: false});
        render(
            <Provider store={store}>
                <AuthContext.Provider value={mockUserWithAuth}>
                    <BrowserRouter>
                        <CreateAccountPage/>
                    </BrowserRouter>
                </AuthContext.Provider>
            </Provider>
        )
        expect(window.location.pathname).toBe(`/`);
    })

    test('guests can navigate back to login', () => {
        window.history.pushState({}, '', 'create-account');
        const mockUserWithAuth = mock<User>({isAnonymous: false});
        const { getByTestId } = render(
            <Provider store={store}>
                <AuthContext.Provider value={mockUserWithAuth}>
                    <BrowserRouter>
                        <CreateAccountPage/>
                    </BrowserRouter>
                </AuthContext.Provider>
            </Provider>
        )
        window.history.pushState({}, '', 'create-account');
        fireEvent.click(getByTestId('back-to-log-in'));
        expect(window.location.pathname).toBe(`/login`);
    })

    test.skip('guests can create an account', async () => {
        const mockUserWithAuth = mock<User>({isAnonymous: false});
        const { getByTestId } = render(
            <Provider store={store}>
                <AuthContext.Provider value={mockUserWithAuth}>
                    <BrowserRouter>
                        <CreateAccountPage/>
                    </BrowserRouter>
                </AuthContext.Provider>
            </Provider>
        )
        window.history.pushState({}, '', 'create-account');
        await userEvent.click(getByTestId('proceed-as-guest'));
        expect(window.location.pathname).toBe(`/`);
    })

    test('user cannot create an account if email or password are empty', async () => {
        const mockUserWithAuth = mock<User>({isAnonymous: false});
        const { getByTestId } = render(
            <Provider store={store}>
                <AuthContext.Provider value={mockUserWithAuth}>
                    <BrowserRouter>
                        <CreateAccountPage/>
                    </BrowserRouter>
                </AuthContext.Provider>
            </Provider>
        )
        window.history.pushState({}, '', 'create-account');
        await userEvent.click(getByTestId('create-account'));
        expect(window.location.pathname).toBe(`/create-account`);
    })

    test.skip('new users can create an account', async () => {
        console.log(window.location.pathname);
        const mockUserWithAuth = mock<User>({isAnonymous: false});
        const { getByTestId } = render(
            <Provider store={store}>
                <AuthContext.Provider value={mockUserWithAuth}>
                    <BrowserRouter>
                        <CreateAccountPage/>
                    </BrowserRouter>
                </AuthContext.Provider>
            </Provider>
        )
        window.history.pushState({}, '', 'create-account');
        await userEvent.type(getByTestId('email-input'), 'test@test.test');
        await userEvent.type(getByTestId('password-input'), 'asdfasdfasdf');
        await userEvent.click(getByTestId('create-account'));
        expect(window.location.pathname).toBe(`/`);
    })
    // this test can be worked on after I figure out how to mock guest accounts
    // test('guest can navigate back to kanban', () => {})
})
