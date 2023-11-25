import React, {useState, useCallback} from 'react';
import {useForm, router} from '@inertiajs/react';
import {useDropzone} from 'react-dropzone'
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {__} from '@/Libs/Lang';
import {DocumentIcon, XMarkIcon} from "@heroicons/react/24/outline/index.js";
import {BsFileEarmarkPdfFill, BsFileEarmarkWordFill, BsFileEarmarkExcelFill} from "react-icons/bs";

const ReplyToDocument = ({documentId, onClose}) => {
    const {data, setData, post, errors} = useForm({
        document_id: documentId,
        description: '',
    });

    const [files, setFiles] = useState([]);
    const [fileErrors, setFileErrors] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
        setData('files[]', ...files);
    }, [setData, files]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.docx', '.doc'],
            'application/vnd.ms-excel': ['.xls', '.xlsx'],
            'application/vnd.ms-powerpoint': ['.pptx'],
            'image/jpeg': ['.jpeg', '.png', '.jpg'],
        }
    });
    const removeFile = (fileIndex) => {
        setFiles((prevFiles) => prevFiles.filter((_, index) => index !== fileIndex));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', data.description);
        formData.append('document_id', data.document_id);
        files.forEach(file => formData.append('files[]', file));
        router.post(route('reply-to-documents.store'), formData, {
            forceFormData: true,
            onStart: () => {
                console.log("start")
            },
            onFinish: () => {
                console.log("finish")
            },
            // Обработка успешного запроса
            onSuccess: (success) => {
                onClose();
                console.log('success')
            },
            // Обработка ошибок запроса
            onError: (errors) => {
                let newFileErrors = [];
                Object.keys(errors).forEach(key => {
                    if (key.startsWith('files.')) {
                        newFileErrors[parseInt(key.split('.')[1])] = errors[key];
                    }
                });
                setFileErrors(newFileErrors);
            }
        })
    };

    return (
        <div className="flex justify-center items-center my-auto mt-20">
            <form onSubmit={handleSubmit} className="w-1/2">
                <div className="mb-4">
                    <div className={`sm:col-span-3 w-full`}>
                        <InputLabel htmlFor={"title"}>
                            {__('Reply')}
                            <sup
                                className={"text-red-500 font-bold"}
                            >
                                *
                            </sup>
                        </InputLabel>
                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            value={data.title}
                            onChange={(event) => setData('description', event.target.value)}
                            placeholder=""
                            className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0`}
                        />
                        {errors.description && <span>{errors.description}</span>}
                    </div>
                </div>
                <div className={'sm:col-span-6'}>
                    <label htmlFor="cover-photo"
                           className="block text-sm font-medium text-gray-700">
                    </label>
                    <div
                        {...getRootProps()}
                        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-indigo-300 border-dashed rounded-md ${isDragActive ? 'bg-indigo-200 border-dashed border-indigo-500' : ''}`}>
                        <div
                            className="space-y-1 text-center">
                            <input
                                type="file" {...getInputProps()}
                                className={"sr-only"}/>
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div
                                className="flex text-sm text-gray-600">
                                <span
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    Боргиркунии ҳуҷҷатҳо
                                </span>
                            </div>
                            <p className="text-xs text-gray-500">DOCX,
                                PDF, XLS
                                JPG</p>
                        </div>
                    </div>
                    <div className={'sm:col-span-6'}>
                        {files.length > 0 ? (
                                <div className={"sm:col-span-6"}>
                                    <h4>Загруженные файлы:</h4>
                                    <div
                                        className=" grid grid-cols-4 gap-4">
                                        {files.map((file, index) => {
                                            let extension = file.name.split(".").pop();
                                            if (extension === 'pdf') {
                                                return (
                                                    <div
                                                        key={index}
                                                    >
                                                        <div
                                                            className={"group/item justify-center items-center"}
                                                        >
                                                            <div
                                                                className={"group relative flex items-center justify-center"}>
                                                                <BsFileEarmarkPdfFill
                                                                    className={"w-48 h-36 rounded-lg transition duration-300 ease-in-out group-hover:blur-md text-red-700"}
                                                                />
                                                                <XMarkIcon
                                                                    onClick={() => removeFile(index)}
                                                                    className={"text-white cursor-pointer  invisible group-hover/item:visible w-8 h-8 absolute justify-center items-center"}/>
                                                            </div>
                                                        </div>
                                                        <p className={"truncate text-center"}>{file.name}</p>
                                                        {fileErrors[index] && (
                                                            <span className="text-red-500">Этот файл превышает максимально разрешаемым сервером</span>
                                                        )}
                                                    </div>
                                                )
                                            } else if (extension === 'docx' || extension === 'doc') {
                                                return (
                                                    <div
                                                        key={index}
                                                    >
                                                        <div
                                                            className={"group/item justify-center items-center"}
                                                        >
                                                            <div
                                                                className={"group relative flex items-center justify-center"}>
                                                                <BsFileEarmarkWordFill
                                                                    className={"w-48 h-36 rounded-lg transition duration-300 ease-in-out group-hover:blur-md text-blue-700"}
                                                                />
                                                                <XMarkIcon
                                                                    onClick={() => removeFile(index)}
                                                                    className={"text-red-700 cursor-pointer  invisible group-hover/item:visible w-8 h-8 absolute justify-center items-center"}/>
                                                            </div>
                                                        </div>
                                                        <p className={"truncate text-center"}>{file.name}</p>
                                                        {fileErrors[index] && (
                                                            <span className="text-red-500">Этот файл превышает максимально разрешаемым сервером</span>
                                                        )}                                                    </div>
                                                )
                                            } else if (extension === 'xls' || extension === 'xlsx') {
                                                return (
                                                    <div
                                                        key={index}
                                                    >
                                                        <div
                                                            className={"group/item justify-center items-center"}
                                                        >
                                                            <div
                                                                className={"group relative flex items-center justify-center"}>
                                                                <BsFileEarmarkExcelFill
                                                                    className={"w-48 h-36 rounded-lg transition duration-300 ease-in-out group-hover:blur-md text-green-700"}
                                                                />
                                                                <XMarkIcon
                                                                    onClick={() => removeFile(index)}
                                                                    className={"text-red-700 cursor-pointer  invisible group-hover/item:visible w-8 h-8 absolute justify-center items-center"}/>
                                                            </div>
                                                        </div>
                                                        <p className={"truncate text-center"}>{file.name}</p>
                                                        {errors.files && <span>{errors.files[index]}</span>}
                                                    </div>
                                                )
                                            } else if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
                                                return (
                                                    <div
                                                        key={index}
                                                    >
                                                        <div
                                                            className={"group/item justify-center items-center"}
                                                        >
                                                            <div
                                                                className={"group relative flex items-center justify-center"}>
                                                                <img
                                                                    className={"w-48 h-36 rounded-lg transition duration-300 ease-in-out group-hover:blur-md"}
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={file.name}/>
                                                                <XMarkIcon
                                                                    onClick={() => removeFile(index)}
                                                                    className={"text-red-700 cursor-pointer  invisible group-hover/item:visible w-8 h-8 absolute justify-center items-center"}/>
                                                            </div>
                                                        </div>
                                                        <p className={"truncate text-center"}>{file.name}</p>
                                                        {fileErrors[index] && (
                                                            <span className="text-red-500">Этот файл превышает максимально разрешаемым сервером</span>
                                                        )}                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div
                                                        key={index}
                                                    >
                                                        <div
                                                            className={"group/item justify-center items-center"}
                                                        >
                                                            <div
                                                                className={"group relative flex items-center justify-center"}>
                                                                <DocumentIcon
                                                                    className={"w-48 h-36 rounded-lg transition duration-300 ease-in-out group-hover:blur-md"}
                                                                />
                                                                <XMarkIcon
                                                                    onClick={() => removeFile(index)}
                                                                    className={"text-red-700 cursor-pointer  invisible group-hover/item:visible w-8 h-8 absolute justify-center items-center"}/>
                                                            </div>
                                                        </div>
                                                        <p className={"truncate text-center"}>{file.name}</p>
                                                        {fileErrors[index] && (
                                                            <span className="text-red-500">Этот файл превышает максимально разрешаемым сервером</span>
                                                        )}                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            ) :
                            null
                        }
                    </div>
                </div>
                <div className="flex justify-end mt-5">
                    <PrimaryButton
                        type="submit"

                    >
                        {__('Reply')}
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default ReplyToDocument;
