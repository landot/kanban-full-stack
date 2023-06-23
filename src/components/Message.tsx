import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addDummyData } from "../../features/kanban/kanbanSlice";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../utils/firebase/logout";
import { MoreAction, MoreActionItem } from "./MoreAction";
import { MediumText } from "./styles/text/MediumText";
import './Message.css';


export function Message() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const accountMoreActionsItem: MoreActionItem[] = [
        {
            text: 'Log Out',
            class: 'edit',
            action: () => logout()
        },
        {
            text: 'Add Dummy Data',
            class: 'edit',
            action: () => dispatch(addDummyData())
        },
    ]
    const guestAccountMoreActionsItems: MoreActionItem[] = [
        ...accountMoreActionsItem, 
        {
            text: 'Register Account',
            class: 'edit',
            action: () => navigate('/create-account')
        },
    ]
    
    return (
        <div className="messages">
        {auth?.isAnonymous ? (
            <>
                <MediumText>You are logged in as a guest</MediumText>
                <MoreAction actionItemName={"account"} items={guestAccountMoreActionsItems} />
            </>
        ): (
            <>
                <MediumText>You are logged in as {auth?.email}</MediumText>
                <MoreAction actionItemName={"account"} items={accountMoreActionsItem} />
            </>
        )}
    </div>
    )
}