import './ButtonSmallv2.css';

export function ButtonSmallv2(
    props: {
        label: string, 
        type: 'primary' | 'secondary' | 'destructive',
        onClick?: () => void;
    }) {
    return (
        <button className={`button-small ${props.type}`} onClick={props.onClick}>{props.label}</button>
    )
}