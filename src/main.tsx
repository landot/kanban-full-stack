import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "react-redux"
import { store } from "../app/store"
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import { SignInPage } from './components/SignInPage'
import { ErrorPage } from './components/ErrorPage'
import { RequireAuth } from './components/RequireAuth'
import { CreateAccountPage } from './components/CreateAccountPage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<SignInPage/>} errorElement={<ErrorPage/>}/>
                    <Route path="/create-account" element={<CreateAccountPage/>} errorElement={<ErrorPage/>}/>
                    <Route path='*' element={<p>Page not found</p>}/>
                    <Route element={<RequireAuth/>} errorElement={<ErrorPage/>}>
                        <Route path="/" element={<App/>} errorElement={<ErrorPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </Provider>
)
