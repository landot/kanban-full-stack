import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addDummyData } from "../features/kanban/kanbanSlice";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../utils/firebase/logout";
import { MoreAction, MoreActionItem } from "./MoreAction";
import { MessageStyles } from "./styles/Message.styles";
import { MediumText } from "./styles/text/MediumText";

export function Message() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const accountMoreActionsItem: MoreActionItem[] = [
        {
            text: 'Log Out',
            itemType: 'primary',
            action: () => logout()
        },
        {
            text: 'Add Dummy Data',
            itemType: 'primary',
            action: () => dispatch(addDummyData())
        },
    ]
    const guestAccountMoreActionsItems: MoreActionItem[] = [
        ...accountMoreActionsItem, 
        {
            text: 'Register Account',
            itemType: 'primary',
            action: () => navigate('/create-account')
        },
    ]
    
    return (
        <MessageStyles className="messages">
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
        </MessageStyles>
    )
}