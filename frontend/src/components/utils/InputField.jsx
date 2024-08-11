// import { useState } from 'react';
import '../Register/Register.css'
export let incValue = {
    "name": 1,
    "mobile": 15,
    "pic": 5,
    "linkedin": 3,
    "github": 5,
    "resume": 20,
    "type": 5,
    "scName": 5,
    "startEdu": 2,
    "endEdu": 2,
    "projectName": 5,
    "pDes": 6,
    "solo_group": 4,
    "pLink": 10,
    "typeExp": 5,
    "cName": 10,
    "cLink": 10,
    "role": 8,
    'startExp': 2,
    "endExp": 2,
    "coverLetter": 20
};
function InputField({ name, type, placeholder, children, required = false, style = '' }) {

    // console.log(incValue);
    // const [formData, setFormData] = useState({
    //     totalCoins: 0,
    //     name: false,
    //     mobile: false,
    //     linkedin:false,
    //     github:false,
    //     college_name:false,
    //     type:false,
    //     start:false,
    //     end:false,
    //     project:false,
    //     project_description:false,
    //     member:false,
    //     project_link:false,
    //     resume:false,
    //     // Add other fields here if needed
    //   });

    // const handleInput= (fieldName)=> (event)=>{
    //     const value = event.target.value;
    //     const updatedFormData = { ...formData };
    //     if (!updatedFormData[fieldName] && value.trim() !== "") {

    //         switch(fieldName){
    //             case "name": {updatedFormData.totalCoins += incValue.name;
    //             break;}
    //             case "mobile": {updatedFormData.totalCoins += incValue.mobile;
    //                 break;}
    //             case "linkedin": {updatedFormData.totalCoins += incValue.linkedin;
    //             break;}
    //             case "github": {updatedFormData.totalCoins += incValue.github;
    //              break;}
    //             case "college_name": {updatedFormData.totalCoins += incValue.cName;
    //              break;}
    //             case "type": {updatedFormData.totalCoins += incValue.type;
    //              break;}
    //             case "start": {updatedFormData.totalCoins += incValue.startEdu;
    //              break;}
    //             case "end": {updatedFormData.totalCoins += incValue.endEdu;
    //              break;}
    //             case "project": {updatedFormData.totalCoins += incValue.projectName;
    //              break;}
    //             case "project_description": {updatedFormData.totalCoins += incValue.pDes;
    //              break;}
    //             case "project_link": {updatedFormData.totalCoins += incValue.pLink;
    //              break;}
    //             case "resume": {updatedFormData.totalCoins += incValue.resume;
    //              break;}



    //         }
    //         updatedFormData.totalCoins += fieldName === "name" ? 2 : 10;

    //         updatedFormData[fieldName] = true;
    //       } else if (updatedFormData[fieldName] && value.trim() === "") {
    //         updatedFormData.totalCoins -= fieldName === "mobile" ? 2 : 10;
    //         updatedFormData[fieldName] = false;
    //       }

    //       setFormData(updatedFormData);
    // }
    // console.log(formData)
    return (
        <>
            <div className='form_label'>
                <label>{children}</label>
            </div>
            <input type={type} placeholder={placeholder}
                autoComplete='off'
                name={name}
                required={required}
                style={{ style }}
                data-testid={`input-box-${name}`}
            // onChange={handleInput(name)}
            >
            </input>
        </>
    );
}

export default InputField;