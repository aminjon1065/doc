import React from 'react';
import {EyeIcon, FlagIcon} from "@heroicons/react/24/outline/index.js";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import formatterDay from "@/Helpers/dateFormatter.js";

const ShowReply = ({userName, description, files, createdAt, onFileClick}) => {
    return (
        <>
            <div className="bg-white px-4 py-5 sm:px-6">
                <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                        <ApplicationLogo className="h-10 w-10 rounded-full"/>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                            <span>
                                {userName}
                            </span>
                        </p>
                        <p className="text-sm text-gray-500">
                            <span>
                                {formatterDay(createdAt)}
                            </span>
                        </p>
                    </div>
                    <p className={"w-9/12"}>
                        {description}
                    </p>
                </div>
                < div className="flex flex-col">
                    {files.map((file, index) => (
                        <div key={index}>
                            <button
                                onClick={() => onFileClick(`/storage/${file.file_path}`)}
                                key={index}
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-indigo-600  focus:outline-none"
                            >
                                <EyeIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
                                {file.file_name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ShowReply;
