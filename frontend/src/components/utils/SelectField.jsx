import React, { useState } from 'react';

export function SelectField({name,value}) {
    const [input,setInput] = useState(value);
    return (
        <div className='form_label'>
                <select name={name} className="select_post" value={input} onChange={(e)=>setInput(e.target.value)}>
                  <option value="internship-remote">internship-remote</option>
                  <option value="internship-onsite">internship-onsite</option>
                  <option value="job-onsite">job-onsite</option>
                  <option value="job-remote">job-remote</option>
                </select>
                </div>
    );
}

