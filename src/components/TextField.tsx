import './TextField.css';

export function TextField(props: {
        showValidationError: boolean, 
        placeholder: string,
        value: string,
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, // todo better type?
    }) {

    return (
        <div className={`text-input${props.showValidationError ? ' error': ''}`}>
            <input 
                type="text" 
                value={props.value} 
                placeholder={props.placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.handleChange(e);
                }}
            />
            {props.showValidationError && <p className="validation-message">Can’t be empty</p>}
        </div>
    )
}