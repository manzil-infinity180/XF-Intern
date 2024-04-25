// import { useState } from "react";

// function ImageUploadDropDown(props) {
//     const [value,setValue] = useState("");
//     function handleUpload(e){
//         const files = Array.from(e.target.files)
//        setValue(URL.createObjectURL(e.target.files[0]));
//     }
//     return (
//         <>
//         <div>
//             <img src="" alt="" />
//         </div>
//         <div style={{
//             margin:"10% 50%",
//             height:"10%"
//         }}>
//           <input type="file" src="" alt="" onChange={handleUpload}/>
//           <img src={value} alt="" style={{
//             width:"100px",
//             height:"100px"
//           }}/>
//         </div>

//     </>
//     );
// }
// import { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// const ImageUploadDropDown = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       setUploadedFiles(acceptedFiles);
//     },
//   });
// //TO DO : Customize and Style this Drag and Drop to Upload box as you want🧑‍💻😊
//   return (
//     <div {...getRootProps()} style={{
//         width:"25%",
//         height:"15%",
//         borderRadius:"16px",
//         padding:"15px",
//         margin:"5% 40%",
//         border:"2px solid pink",

//     }}>
//       <input {...getInputProps()} />
//       <p>Drag and drop files here or click to browse.</p>
//       <ul>
//         {uploadedFiles.map((file) => (
//           <li key={file.name}>{file.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default ImageUploadDropDown;

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'

};

function ImageUploadDropDown() {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag n drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}
export default ImageUploadDropDown;
