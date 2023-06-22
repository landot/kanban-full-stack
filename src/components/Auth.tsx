import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../utils/firebase/LogIn";
import { logout } from "../utils/firebase/logOut";
import { signInAsGuest } from "../utils/firebase/SignInAsGuest";
import { ButtonSmall } from "./ButtonSmall";
import './Auth.css';
import { useAppDispatch } from "../../app/hooks";
import { addDummyData } from "../../features/kanban/kanbanSlice";

export function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);  
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    if(auth) {
        navigate('/');
    }

    async function handleLogin() {
        setError('');
        if(!email || !password) {
            setError('inputs are incomplete');
            return;
        }
        const user = await login(email, password);
        if(user) {
            navigate('/');
        } else {
            setError('login failed');
        }
    }

    async function handleGuest() {
        await signInAsGuest();
        await dispatch(addDummyData());
        navigate('/');
    }
  
    console.log('auth', auth)
    return (
      <div className="sign-in">
        <h1>Sign In</h1>
        <div className="credentials">
            <h2>Email</h2>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <h2>Password</h2>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        {auth?.isAnonymous && <p>you are signed in as a guest</p>}
        {auth?.uid && <p>you are signed in as {auth?.uid}</p>}
        {error && <p className="sign-in-error">{error}</p>}
        <ButtonSmall label='Log In' type='primary' onClick={handleLogin} />
        <ButtonSmall label='Proceed as Guest' type='primary' onClick={handleGuest}/>
        <ButtonSmall label='Log Out' type='primary' onClick={() => logout()}/>
        {/* {auth?.isAnonymous && (
          <ButtonSmall onClick={() => convertGuestAccount(email, password)}>create real account as guest</ButtonSmall>
        )} */}
        {/* {!auth?.isAnonymous && !auth?.uid && (
          <ButtonSmall onClick={() => createAccount(email, password)}>create account</ButtonSmall>
        )} */}
      </div>
    )
  }