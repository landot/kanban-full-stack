import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addDummyData } from "../../features/kanban/kanbanSlice";
import { AuthContext } from "../context/AuthContext";
import { MediumText } from "../styledComponents/text/MediumText";
import { logout } from "../utils/firebase/logOut";
import { ButtonSmall } from "./ButtonSmall";
import './Message.css';


export function Message() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const dispatch = useAppDispatch();
    
    return (
        <div className="messages">
        {auth?.isAnonymous ? (
            <>
                <MediumText>You are logged in as a guest</MediumText>
                <ButtonSmall label={"Create Account"} type={"primary"} onClick={() => navigate('/create-account')}/>
                <ButtonSmall label={"Logout"} type={"primary"} onClick={() => logout()}/>
                <ButtonSmall label={"Add Dummy Data"} type={"primary"} onClick={() => dispatch(addDummyData())}/>
            </>
        ): (
            <>
                <MediumText>You are logged in as {auth?.email}</MediumText>
                <ButtonSmall label={"Logout"} type={"primary"} onClick={() => logout()}/>
                <ButtonSmall label={"Add Dummy Data"} type={"primary"} onClick={() => dispatch(addDummyData())}/>
            </>
        )}
    </div>
    )
}