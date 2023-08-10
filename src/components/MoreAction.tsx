import { offset, useFloating, autoUpdate, useDismiss, useInteractions } from '@floating-ui/react';
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
    const { refs, floatingStyles, context } = useFloating({
        middleware: [
            offset({crossAxis: -70}),
        ],
        placement: "bottom",
        open: showMoreActions,
        onOpenChange: setShowMoreActions,
        whileElementsMounted: autoUpdate,
      });

    const dismiss = useDismiss(context);
    const {getReferenceProps, getFloatingProps} = useInteractions([
        dismiss,
    ]);
    
    return (
        <MoreActionStyles
            data-testid={`${props.actionItemName}-more-actions-container`}
        >
            <img 
                data-testid={`${props.actionItemName}-more-actions`}
                ref={refs.setReference}
                {...getReferenceProps()}
                src={ellipsis} 
                alt={`${props.actionItemName} more actions`} 
                onClick={() => setShowMoreActions(prev => !prev)}
            />
            {showMoreActions && (
                <ul
                    ref={refs.setFloating} 
                    style={floatingStyles} 
                    {...getFloatingProps()}
                >
                    {props.items.map(item => {
                        return <ListItemStyles key={item.text} data-testid='more-actions-item' itemType={item.itemType} onClick={() => {
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
