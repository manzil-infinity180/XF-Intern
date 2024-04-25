import React, { useState } from 'react';

export function TextArea({ name, type, placeholder, children, required = false, value }) {
    const [input, setInput] = useState(value);
    return (
        <>
            <div className='form_label'>
                <label>{children}</label>
            </div>
            <textarea type={type} placeholder={placeholder}
                rows="3"
                cols="30"
                name={name}
                required={required}
                value={input}
                className="textAreaField"
                onChange={(e) => setInput(e.target.value)}
            >
            </textarea>
        </>
    );
}

