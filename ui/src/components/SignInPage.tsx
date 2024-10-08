import { useState, useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../utils/firebase/login";
import { signInAsGuest } from "../utils/firebase/signInAsGuest";
import { useAppDispatch } from "../../app/hooks";
import { addDummyData } from "../features/kanban/kanbanSlice";
import { Overlay } from "./Overlay";
import './SignInPage.css';
import { StyledButton } from "./StyledButton";
import { SmallPrimary } from "./styles/StyledButton.styles";

export function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useContext(AuthContext); 
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams();
    const continueAsGuest = searchParams.get('continueAsGuest') ? searchParams.get('continueAsGuest') === 'true': false;

    useEffect(() => {
      if (auth) {
        navigate("/");
      }

      const handleContinueAsGuest = async () => {
        if(continueAsGuest) {
          await handleGuest();
        }
      }

      handleContinueAsGuest()
        .catch((e) => console.log(e));
    }, []);

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

    return (
        <Overlay handleClose={() => null} children={
          <div className="sign-in-wrapper">
            <div className="sign-in-form">
              <h1>Sign In</h1>
              <form className="credentials" aria-label="sign in credentials">
                  <h2>Email</h2>
                  <input data-testid="email" type="email" name="email" id="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <h2>Password</h2>
                  <input data-testid="password" type="password" name="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </form>
              {error && <p className="sign-in-error">{error}</p>}
              <StyledButton testId="submit" buttonProps={SmallPrimary} label='Log In' onClick={handleLogin} isDisabled={false}/>
            </div>
            <div className="sign-in-other-options">
              <StyledButton buttonProps={SmallPrimary} label='Create an Account' onClick={() => navigate('/create-account')} isDisabled={false}/>
              <StyledButton buttonProps={SmallPrimary} label='Proceed as Guest' onClick={handleGuest} isDisabled={false}/>
            </div>
          </div>
        }/>
      
    )
  }