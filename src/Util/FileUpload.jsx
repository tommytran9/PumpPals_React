import React, { useState } from 'react';
import ServerData from './ServerConnector';

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  };

  const handleUpload = async function () {
    const formData = new FormData();
    formData.append('file', selectedFile);

    let res = await fetch(`${ServerData.url}/file/upload`, {
      method: 'POST',
      body: formData,
    })
    console.log(res)
  };

  new Promise(
    function(resolve, reject){
      let num = 5;
      resolve(5)
      reject('no number')
    }
  )

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}