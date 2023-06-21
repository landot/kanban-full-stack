import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from "react-redux"
import { store } from "../app/store"
import './index.css'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>
)
