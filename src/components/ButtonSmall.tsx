import './ButtonSmall.css';

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