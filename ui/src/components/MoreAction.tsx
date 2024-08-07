import { offset, useFloating, autoUpdate, useDismiss, useInteractions, FloatingFocusManager } from '@floating-ui/react';
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

    function handleEllipsisKeyPress(e: React.KeyboardEvent) {
        if(e.key === 'Enter') {
            e.preventDefault();
            setShowMoreActions(prev => !prev)
        }
    }

    function handleActionKeyPress(e: React.KeyboardEvent,  action: () => void) {
        if(e.key === 'Enter') {
            e.preventDefault();
            action();
            setShowMoreActions(false);
        }
    }
    
    return (
        <MoreActionStyles
            data-testid={`${props.actionItemName}-more-actions-container`}
        >
            <img 
                tabIndex={0}
                data-testid={`${props.actionItemName}-more-actions`}
                ref={refs.setReference}
                {...getReferenceProps()}
                src={ellipsis} 
                alt={`${props.actionItemName} more actions`} 
                onClick={() => setShowMoreActions(prev => !prev)}
                onKeyDown={handleEllipsisKeyPress}
            />
            {showMoreActions && (
                <FloatingFocusManager context={context}>
                    <ul
                        ref={refs.setFloating} 
                        style={floatingStyles} 
                        {...getFloatingProps()}
                    >
                        {props.items.map(item => {
                            return (
                                <ListItemStyles 
                                    tabIndex={0} 
                                    key={item.text} 
                                    data-testid='more-actions-item' 
                                    itemType={item.itemType} 
                                    onClick={() => {
                                        item.action();
                                        setShowMoreActions(false);
                                    }}
                                    onKeyDown={(e) => handleActionKeyPress(e, item.action)}
                                >
                                {item.text}
                                </ListItemStyles>
                            )
                        })}
                    </ul>
                </FloatingFocusManager>
            )}
        </MoreActionStyles>
    )
}
