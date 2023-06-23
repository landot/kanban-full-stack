import { UserCredential } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addDummyData } from "../../features/kanban/kanbanSlice";
import { AuthContext } from "../context/AuthContext";
import { convertGuestAccount } from "../utils/firebase/convertGuestAccount";
import { createAccount } from "../utils/firebase/createAccount";
import { signInAsGuest } from "../utils/firebase/signInAsGuest";
import { Overlay } from "./Overlay";
import { SmallPrimary, StyledButton } from "./StyledButton";
import './CreateAccountPage.css';


export function CreateAccountPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useContext(AuthContext);  
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const isGuest = auth && auth.isAnonymous;

    useEffect(() => {
        if (auth && !auth?.isAnonymous) {
          navigate("/");
        }
      }, []);

    async function handleCreateAccount() {
        let user: UserCredential;
        setError('');
        if(!email || !password) {
            setError('inputs are incomplete');
            return;
        }
        if(isGuest) {
            user = await convertGuestAccount(email, password);
        } else {
            user = await createAccount(email, password);
            await dispatch(addDummyData());
        }
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
  

    return (
        <Overlay handleClose={() => null} children={
            <div className="create-account-wrapper">
                <div className="create-account-form">
                    <h1>{isGuest ? 'Register': 'Create'} Account</h1>
                    <div className="credentials">
                        <h2>Email</h2>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <h2>Password</h2>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    {error && <p className="create-account-error">{error}</p>}
                    <StyledButton buttonProps={SmallPrimary} label='Create Account' onClick={handleCreateAccount} isDisabled={false}/>
                </div>
                <div className="create-account-other-options">
                    {!isGuest && (
                        <>
                            <StyledButton buttonProps={SmallPrimary} label='Back to Log In' onClick={() => navigate('/login')} isDisabled={false}/>
                            <StyledButton buttonProps={SmallPrimary} label='Proceed as Guest' onClick={handleGuest} isDisabled={false}/>
                        </>
                    )}
                    {isGuest && (
                        <StyledButton buttonProps={SmallPrimary} label='Back to Kanban' onClick={() => navigate('/')} isDisabled={false}/>
                    )}
                </div>
            </div>
        }/>
    )
}