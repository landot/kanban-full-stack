import './ButtonSmall.css';

// todo update so that we don't need this anymore
export function ButtonSmall(
    props: {
        label: string, 
        type: 'primary' | 'secondary' | 'destructive',
        onClick?: () => void;
    }) {
    return (
        <button className={`button-small ${props.type}`} onClick={props.onClick}>{props.label}</button>
    )
}