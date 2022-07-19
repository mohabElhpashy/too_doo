import React from "react";
const FileUploader = ({ testData, setModelData }) => {
  //     const beforeUpdate= (file)=>{
  //      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //         if (!isJpgOrPng) {
  //         message.error('You can only upload JPG/PNG file!');
  //         }
  //     return isJpgOrPng ;
  //     }
  //   const onChange =(info)=> {
  //         if (info.file.status !== 'uploading') {
  //         }
  //         if (info.file.status === 'done') {
  //           message.success(`${info.file.name} file uploaded successfully`);
  //         } else if (info.file.status === 'error') {
  //           message.error(`${info.file.name} file upload failed.`);
  //         }
  //       }

  const onChange = (files) => {
    setModelData({ ...testData, main_image: files[0] });
  };
  return (
    <div>
      <input onChange={(e) => onChange(e.target.files)} type="file" />
    </div>
  );
};

export default FileUploader;
