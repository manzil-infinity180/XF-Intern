import { useState } from 'react';
import '../Register/Register.css'

function InputFieldUpdate({ name, type, placeholder, children, required = false, value }) {
    const [input, setInput] = useState(value);
    return (
        <>
            <div className='form_label'>
                <label>{children}</label>
            </div>
            <input type={type} placeholder={placeholder}
                autoComplete='off'
                name={name}
                required={required}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                data-testid={`input-box-${name}`}
            >
            </input>
        </>
    );
}

export default InputFieldUpdate;