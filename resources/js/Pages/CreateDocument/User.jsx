import React, {useCallback, useEffect, useState} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {typeDocument} from "@/Helpers/typeDocuments.js";
import EditorComponent from "@/Components/EditorComponent.jsx";
import {useDropzone} from 'react-dropzone'
import {DocumentIcon, XMarkIcon} from "@heroicons/react/24/outline/index.js";
import {BsFileEarmarkPdfFill, BsFileEarmarkWordFill, BsFileEarmarkExcelFill} from "react-icons/bs";

const User = ({typesDocuments}) => {
        const {data, setData, post, processing, errors} = useForm({
            title: '',
            description: '',
            files: [],
            code: '',
        });
        const [fileErrors, setFileErrors] = useState([]);
        const [files, setFiles] = useState([]);
        const [typeSelected, setTypeSelected] = useState('');
        const [codeType, setCodeType] = useState('');
        const [htmlContent, setHtmlContent] = useState("");
        const fnSelectedType = (value) => {
            setTypeSelected(value); // Это асинхронно обновит typeSelected
            const code = typeDocument.find(item => item.type === value);
            setCodeType(code.code); // Это асинхронно обновит code
            setData('code', codeType);
        };
        const getContent = (htmlContentProp) => {
            setHtmlContent(htmlContentProp);
            setData('description', htmlContent);
        };
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
        const submit = (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('code', data.code);
            files.forEach(file => formData.append('files[]', file));
            router.post(route('documents.store'), formData, {
                forceFormData: true,
                onStart: () => {
                    console.log("start")
                },
                onFinish: () => {
                    console.log("finish")
                },
                // Обработка успешного запроса
                onSuccess: (success) => {
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
        }
        console.log(errors?.files?.[0]);
        return (
            <form onSubmit={submit}>
                <div className="flex justify-between items-center space-x-2">
                    <div className={`sm:col-span-3 w-full`}>
                        <InputLabel htmlFor={"title"}>
                            Сарлавҳа
                            <sup
                                className={"text-red-500 font-bold"}
                            >
                                *
                            </sup>
                        </InputLabel>
                        <TextInput
                            id="title"
                            type="text" name="title" value={data.title}
                            onChange={(event) => setData('title', event.target.value)}
                            placeholder="Title"
                            className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0`}
                        />
                        {errors.title && <span>{errors.title}</span>}
                    </div>
                    <div className={`sm:col-span-3 w-full`}>
                        <InputLabel htmlFor={"type"}>
                            Намуди ҳуҷҷат
                            <sup
                                className={"text-red-500 font-bold"}
                            >
                                *
                            </sup>
                        </InputLabel>
                        <select
                            name="type_document"
                            value={data.code}
                            id="type"
                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                            onChange={(event) => setData('code', event.target.value)}
                        >
                            <option disabled={true} value="">
                                Намуди ҳуҷҷатро интихоб кунед
                            </option>
                            {typesDocuments.map((item, index) => (
                                <option value={item.code} key={index}>
                                    {item.code} - {item.type_tj}
                                </option>
                            ))}
                        </select>
                        {errors.title && <span>{errors.title}</span>}
                    </div>
                </div>
                <div className="sm:col-span-6">
                    <label htmlFor="description"
                           className="block text-sm font-medium text-gray-700">
                        Мактуб
                    </label>
                    <div
                        className="z-10">
                        <EditorComponent getContent={getContent}/>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                        пурра кардани матни ҳуҷҷат ва д.
                    </p>
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
                <div className="flex mt-5 justify-end">
                    <button
                        className={"bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"}
                    >
                        Send
                    </button>
                </div>
            </form>
        );
    }
;

export default User;
