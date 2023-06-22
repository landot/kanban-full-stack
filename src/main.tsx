import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "react-redux"
import { store } from "../app/store"
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import { SignInPage } from './components/Auth'
import { ErrorPage } from './components/ErrorPage'
import { RequireAuth } from './components/RequireAuth'


// const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <App />,
//       errorElement: <ErrorPage />
//     },
//     {
//         path: "/login",
//         element: <Auth />,
//         errorElement: <ErrorPage />
//     },
    // {
    //     path: "/register",
    //     element: <Auth />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: "/co,vertUser",
    //     element: <Auth />,
    //     errorElement: <ErrorPage />
    // },
//   ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<SignInPage/>} errorElement={<ErrorPage/>}/>
                    <Route element={<RequireAuth/>} errorElement={<ErrorPage/>}>
                        {/* <Route path="/" element={<p>app</p>} errorElement={<ErrorPage/>}/> */}
                        <Route path="/" element={<App/>} errorElement={<ErrorPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </Provider>
)
