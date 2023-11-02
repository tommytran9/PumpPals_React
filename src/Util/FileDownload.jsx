import React, { useState } from 'react';

function FileDownload() {
    const [filename, setFilename] = useState('');

    const handleFilenameChange = (event) => {
        setFilename(event.target.value);
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(`/download?filename=${filename}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <div>
            <h2>File Download</h2>
            <input
                type="text"
                placeholder="Enter filename"
                value={filename}
                onChange={handleFilenameChange}
            />
            <button onClick={handleDownload}>Download File</button>
        </div>
    );
}

export default FileDownload;
