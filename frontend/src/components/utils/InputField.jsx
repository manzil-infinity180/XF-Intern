import '../Register/Register.css'
function InputField({name,type,placeholder,children,required=false}) {

    return (
        <>
        <div className='form_label'>
                    <label>{children}</label>
                    </div>
                    <input type={type} placeholder={placeholder} 
                    autoComplete='off' 
                    name={name}
                    required={required} >
                    </input>
        </>
    );
}

export default InputField;