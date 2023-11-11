import React from 'react';

const FileViewer = ({onClose, fileUrl}) => {
    return (
        <div className="p-5 flex flex-col justify-center items-center w-full h-full">
            <div className="w-full h-full text-center">
                <iframe src={fileUrl} title="File Viewer" className="w-full h-full"></iframe>
            </div>
            <button
                className="mb-4 mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                onClick={onClose}
            >
                Пушидан
            </button>
        </div>
    );
};

export default FileViewer;
