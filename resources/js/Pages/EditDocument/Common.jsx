import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import formatterDay from "@/Helpers/dateFormatter.js";
import {PaperClipIcon} from "@heroicons/react/20/solid/index.js";
import {ArrowDownTrayIcon, EyeIcon} from "@heroicons/react/24/outline/index.js";
import FileViewer from "@/Components/FileViewer.jsx";
import Modal from "@/Components/Modal.jsx";
import Select from "react-tailwindcss-select";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import {__} from "@/Libs/Lang.jsx";
import {RiQuestionAnswerFill} from "react-icons/ri";
import ShowReply from "@/Components/ShowReply.jsx";
import ReplyToDocument from "@/Components/ReplyToDocument/index.jsx";
import {FcCheckmark} from "react-icons/fc";

const Common = ({document, managers, bossName, flash, users}) => {
    console.log(document);
    const initialReceiverIds = document.receivers.map(receiver => receiver.id);
    const initialDeputyIds = document.deputy.map(deputy => deputy.id);
    const {data, setData, put, errors} = useForm({
        manager_id: document.manager_id || '',
        date_done: document.date_done || '',
        category: document.category || '',
        is_controlled: document.is_controlled || '',
        status: document.status || '',
        receivers: initialReceiverIds,
        deputies: initialDeputyIds
    });
    const initialReceivers = document.receivers.map(receiver => ({
        value: receiver.id,
        label: `${receiver.name} - ${receiver.department} (${receiver.region})`
    }));
    const initialDeputies = document.deputy.map(deputy => ({
        value: deputy.id,
        label: `${deputy.name} - ${deputy.department} (${deputy.region})`
    }));

    const [selectedReceivers, setSelectedReceivers] = useState(initialReceivers);
    const [selectedDeputies, setSelectedDeputies] = useState(initialDeputies)
    const [fullView, setFullView] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [showResponseModal, setShowResponseModal] = useState()
    const fnUserSelected = (selectedOptions) => {
        setSelectedReceivers(selectedOptions);
        const receiverIds = selectedOptions.map(option => option.value);
        setData('receivers', receiverIds);
    };

    const fnDeputySelected = (selectedOptions) => {
        setSelectedDeputies(selectedOptions);
        const deputyIds = selectedOptions.map(option => option.value);
        setData('deputies', deputyIds);
    }

    const fullViewFn = () => {
        setFullView(!fullView);
    }
    const openModal = (url) => {
        setFileUrl(url)
        setShowModal(true);
    }
    const openFileModal = (fileUrl) => {
        setFileUrl(fileUrl);
        setShowModal(true);
        console.log(fileUrl);
    }
    const openResponseModal = () => {
        setShowResponseModal(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('documents.update', document.id), {
            preserveScroll: true,
            data: {...data},
            onSuccess: () => {
                console.log("success")
            },
        });
    };
    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(false)} fullView={fullView}
                   fullViewFn={fullViewFn}>
                <FileViewer fullView={fullView} onClose={() => setShowModal(false)} fileUrl={fileUrl}/>
            </Modal>
            <Modal show={showResponseModal} onClose={() => setShowResponseModal(false)} fullView={fullView}
                   fullViewFn={fullViewFn}>
                <ReplyToDocument documentId={document.id} onClose={() => setShowResponseModal(false)}/>
            </Modal>
            {
                flash.error ? (<div><p className={"text-red-700"}>{__(flash.error)}</p></div>) : null
            }
            <div className='flex justify-between items-center'>
                <span className={"text-sm"}>
                    Статус:
                    <span
                        className={`${document.status === "created" ? 'bg-amber-500' : document.status === "in_review" ? "bg-yellow-400" : "bg-green-500"} px-2 py-1 rounded`}
                    >
                        {__(document.status)}
                    </span>
                </span>
                {
                    document.status !== "reviewed" && (
                        <PrimaryButton
                            onClick={openResponseModal}
                        >
                            {__("Reply")}
                        </PrimaryButton>
                    )
                }
            </div>
            <div className={"mt-5 overflow-auto"}>
                <div className="bg-white min-h-full  shadow sm:rounded-lg">
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Аз номи ки</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.name}
                                </dd>
                            </div>
                            {
                                bossName && (
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-900">Раис</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            <div className="flex items-center space-x-3">
                                        <span>
                                            {bossName.name}
                                        </span>
                                                <FcCheckmark/>
                                            </div>
                                        </dd>
                                    </div>
                                )
                            }
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Кай кабул шуд/вақти назоратӣ</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center">
                                    {formatterDay(document.created_at)} / {document.date_done ? <span
                                    className={"bg-red-400 text-white py-1 px-2 rounded"}>{formatterDay(document.date_done)}</span> : "Назорати нест"}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Раёсат/шуъба</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.department}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Вазифа/рутба</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.position} / {document.creator.rank}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Сарлавҳа</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{document.title}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">Матн</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <div dangerouslySetInnerHTML={{__html: document.description}}></div>
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Муовино</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list"
                                        className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        {
                                            document.deputy.length >= 1 ?
                                                (
                                                    document.deputy.map((deputy, index) => (
                                                        <li key={index}
                                                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                            <div className="flex w-0 flex-1 items-center">
                                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                    <span
                                                                        className="truncate font-medium">{deputy.name}</span>
                                                                    <span
                                                                        className="flex-shrink-0 text-gray-400">{deputy.department}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                )
                                                :
                                                (<span>
                                                    <div
                                                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                        <Select
                                                            placeholder={"Интихоб кунед..."}
                                                            id={"receivers"}
                                                            noOptionsMessage={"Ин гуна истифодабарнада нест!"}
                                                            searchInputPlaceholder={""}
                                                            isSearchable
                                                            isMultiple
                                                            value={selectedDeputies}
                                                            onChange={fnDeputySelected}
                                                            options={managers}
                                                            classNames={{
                                                                menuButton: ({isDisabled}) => (
                                                                    `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${isDisabled
                                                                        ? "bg-gray-200"
                                                                        : "block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    }`
                                                                ),
                                                                menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                                                                listItem: ({isSelected}) => (
                                                                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${isSelected
                                                                        ? `text-white bg-blue-500`
                                                                        : `text-gray-500 hover:bg-indigo-100 hover:text-indigo-600`
                                                                    }`
                                                                )
                                                            }}
                                                            primaryColor={"indigo"}
                                                        />
                                                    </div>
                                                </span>)
                                        }
                                    </ul>
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Ҳуҷҷатҳо</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list"
                                        className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        {
                                            document.files.length >= 1 ?
                                                (
                                                    document.files.map((file, index) => (
                                                        <li key={index}
                                                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                            <div className="flex w-0 flex-1 items-center">
                                                                <PaperClipIcon
                                                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                                    aria-hidden="true"/>
                                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                    <span
                                                                        className="truncate font-medium">{file.file_name}</span>
                                                                    <span
                                                                        className="flex-shrink-0 text-gray-400">{file.file_size}kb</span>
                                                                </div>
                                                            </div>

                                                            <div
                                                                className="ml-4 flex-shrink-0 space-x-2 flex justify-between">
                                                                <button
                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                    onClick={() => openModal(`/storage/${file.file_path}`)}
                                                                >
                                                                    <div
                                                                        className={"flex justify-between items-center space-x-1"}>
                                                                        <EyeIcon className={"w-4 h-4"}/>
                                                                        Дидан
                                                                    </div>
                                                                </button>
                                                                <a href={`/storage/${file.file_path}`}
                                                                   download={`/storage/${file.file_path}`}
                                                                   className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                    <div
                                                                        className={"flex justify-between items-center space-x-1"}>
                                                                        <ArrowDownTrayIcon className={"w-4 h-4"}/>
                                                                        Боргиркунӣ
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </li>
                                                    ))
                                                )
                                                :
                                                <li
                                                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                    empty
                                                </li>
                                        }
                                    </ul>
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Истифодабарандаҳо</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list"
                                        className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        {
                                            document.receivers.length >= 1 ?
                                                (
                                                    document.receivers.map((receiver, index) => (
                                                        <li key={index}
                                                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                            <div className="flex w-0 flex-1 items-center">
                                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                    <span
                                                                        className="truncate font-medium">{receiver.name}</span>
                                                                    <span
                                                                        className="flex-shrink-0 text-gray-400">{receiver.department} / {receiver.region}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                )
                                                :
                                                (<span>
                                                    <div
                                                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                        <Select
                                                            placeholder={"Интихоб кунед..."}
                                                            id={"receivers"}
                                                            noOptionsMessage={"Ин гуна истифодабарнада нест!"}
                                                            searchInputPlaceholder={""}
                                                            isSearchable
                                                            isMultiple
                                                            value={selectedReceivers}
                                                            onChange={fnUserSelected}
                                                            options={users}
                                                            classNames={{
                                                                menuButton: ({isDisabled}) => (
                                                                    `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${isDisabled
                                                                        ? "bg-gray-200"
                                                                        : "block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    }`
                                                                ),
                                                                menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                                                                listItem: ({isSelected}) => (
                                                                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${isSelected
                                                                        ? `text-white bg-blue-500`
                                                                        : `text-gray-500 hover:bg-indigo-100 hover:text-indigo-600`
                                                                    }`
                                                                )
                                                            }}
                                                            primaryColor={"indigo"}
                                                        />
                                                    </div>
                                                </span>)
                                        }
                                    </ul>
                                </dd>
                            </div>
                            <div className="flex justify-between items-center space-x-2 mb-5">
                                <div className={`sm:col-span-3 w-full`}>
                                    <InputLabel htmlFor={"category"}>
                                        Категория
                                    </InputLabel>
                                    <select
                                        disabled={document.category}
                                        name="category"
                                        value={data.category}
                                        id="category"
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                                        onChange={(event) => setData('category', event.target.value)}
                                    >
                                        <option disabled value="">
                                            Намуди категорияро интихоб кунед
                                        </option>
                                        <option value="inbox">Воридотӣ</option>
                                        <option value="sent">Содиротӣ</option>
                                    </select>
                                    {errors.title && <span>{errors.title}</span>}
                                </div>
                                <div className={`sm:col-span-3 w-full`}>
                                    <div className={"flex-col justify-between items-center"}>
                                        <InputLabel htmlFor={"status"}>
                                            Статус
                                        </InputLabel>
                                        <select
                                            disabled={document.status === 'created' || document.status === 'in_review' ? false : true}
                                            name="status"
                                            value={data.status}
                                            id="status"
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                                            onChange={(event) => setData('status', event.target.value)}
                                        >
                                            <option disabled value="">
                                                Намуди статусро интихоб кунед
                                            </option>
                                            <option value="created">Сохта шуд</option>
                                            <option value="in_review">Дар баррасӣ</option>
                                            <option value="reviewed">Баррасӣ шуд</option>
                                        </select>
                                        {errors.title && <span>{errors.title}</span>}
                                    </div>
                                </div>
                                <div className={`sm:col-span-3 w-full`}>
                                    <label htmlFor="control"
                                           className="block text-sm font-medium text-gray-700">
                                        Назоратӣ
                                    </label>
                                    <div
                                        className={"flex items-center space-x-2 border border-gray-300 rounded-md  px-2 py-1.5"}>
                                        <div
                                            className="flex items-center h-5 space-x-2">
                                            <input
                                                disabled={document.is_controlled}
                                                value={document.is_controlled == null ? '' : document.is_controlled}
                                                onChange={(event) => setData('is_controlled', event.target.checked)}
                                                id="control"
                                                name="control"
                                                type="checkbox"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                            />
                                            <div>
                                                <input
                                                    disabled={data.date_done}
                                                    value={data.date_done == null ? '' : data.date_done}
                                                    onChange={(event) => setData('date_done', event.target.value)}
                                                    type="datetime-local"
                                                    className="block w-full rounded-md border-0 px-2 py-1 text-gray-900   placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dl>
                    </div>
                    <div className="px-4 py-6 flex justify-end items-center">
                        <PrimaryButton className={""} onClick={handleSubmit}>
                            {__("Save")}
                        </PrimaryButton>
                    </div>
                </div>
            </div>

            {
                document.responses.length >= 1 ?
                    <div className={"mt-5"}>
                        <div className="flex items-center mb-2">
                            <RiQuestionAnswerFill/>
                            <h3>{__("Replies")}</h3>
                        </div>
                        <div className="overflow-hidden bg-white shadow sm:rounded-lg p-5">
                            <div className="border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    {

                                        document.responses.map((reply, index) => (
                                            <div key={index}>
                                                <ShowReply
                                                    userName={reply.user.name}
                                                    description={reply.description}
                                                    files={reply.files} createdAt={reply.created_at}
                                                    onFileClick={openFileModal}
                                                />
                                            </div>
                                        ))
                                    }
                                </dl>
                            </div>
                        </div>
                    </div>
                    :
                    null
            }
        </>
    );
};

export default Common;
