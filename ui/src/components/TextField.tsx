import './TextField.css';

export function TextField(props: {
        showValidationError: boolean, 
        placeholder: string,
        value: string,
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, // todo better type?
        testId?: string
    }) {

    return (
        <div 
            data-testid={`${props.testId ? `${props.testId} `: ''}text-field${props.showValidationError ? '-error': ''}`}
            className={`text-input${props.showValidationError ? ' error': ''}`}
        >
            <input 
                data-testid='text-field-input'
                type="text" 
                value={props.value} 
                placeholder={props.placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    props.handleChange(e);
                }}
            />
            {props.showValidationError && <p data-testid='validation-message' className="validation-message">Can’t be empty</p>}
        </div>
    )
}