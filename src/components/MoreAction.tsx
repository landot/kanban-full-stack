import { useState } from 'react';
import ellipsis from '../assets/images/icon-vertical-ellipsis.svg';
import { MoreActionStyles, ListItemStyles } from './styles/MoreAction.styles';

export interface MoreActionItem {
    text: string;
    itemType: 'destructive' | 'primary';
    action: () => void;
}

export function MoreAction(props: { actionItemName: string, items: MoreActionItem[]}) {
    const [showMoreActions, setShowMoreActions] = useState(false);

    return (
        <MoreActionStyles>
            <img 
                src={ellipsis} 
                alt={`${props.actionItemName} more actions`} 
                onClick={() => setShowMoreActions(prev => !prev)}
            />
            {showMoreActions && (
                <ul>
                    {props.items.map(item => {
                        return <ListItemStyles itemType={item.itemType} onClick={() => {
                            item.action();
                            setShowMoreActions(false);
                        }}>
                            {item.text}
                        </ListItemStyles>
                    })}
                </ul>
            )}
        </MoreActionStyles>
    )
}
