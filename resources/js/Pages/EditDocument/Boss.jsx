import React, {useState} from 'react';
import {useForm} from "@inertiajs/react";
import FileViewer from "@/Components/FileViewer.jsx";
import Modal from "@/Components/Modal.jsx";
import formatterDay from "@/Helpers/dateFormatter.js";
import {PaperClipIcon} from "@heroicons/react/20/solid/index.js";
import {ArrowDownTrayIcon, EyeIcon} from "@heroicons/react/24/outline/index.js";
import Select from "react-tailwindcss-select";
import {__} from "@/Libs/Lang.jsx";
import deputy from "@/Pages/EditDocument/Deputy.jsx";

const Boss = ({document, deputies, users}) => {
    const {data, setData, put, errors} = useForm({
        date_done: document.date_done || '',
        is_done: document.is_done || '',
        is_controlled: document.is_controlled || '',
        deputies: document.deputy || [],
        receivers: document.receivers || [],
    });
    const [userSelected, setUserSelected] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [fullView, setFullView] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const fnUserSelected = (value) => {
        setUserSelected(value);
        const receiverIds = value ? value.map(item => item.value) : [];
        setData('receivers', receiverIds);
    };
    const fullViewFn = () => {
        setFullView(!fullView);
    }
    const openModal = (url) => {
        setFileUrl(url)
        setShowModal(true);
    }
    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(false)} fullView={fullView}
                   fullViewFn={fullViewFn}>
                <FileViewer fullView={fullView} onClose={() => setShowModal(false)} fileUrl={fileUrl}/>
            </Modal>
            <div className={"mt-5 overflow-auto"}>
                <div className="bg-white min-h-full  shadow sm:rounded-lg">
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__('From')}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.name}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("DateIn")}/{__("ControlDate")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex items-center">
                                    {formatterDay(document.created_at)} / {document.date_done ? <span
                                    className={"bg-red-400 text-white py-1 px-2 rounded"}>{formatterDay(document.date_done)}</span> : __("IsNotControlled")}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("Rayosat")}/{__("Department")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.department}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("Position")}/{__('Rank')}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.position} / {document.creator.rank}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("Title")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{document.title}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("Text")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <div dangerouslySetInnerHTML={{__html: document.description}}></div>
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("Manager")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
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
                                                    <li
                                                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                        <Select
                                                            placeholder={"Интихоб кунед..."}
                                                            id={"receivers"}
                                                            noOptionsMessage={"Ин гуна истифодабарнада нест!"}
                                                            searchInputPlaceholder={""}
                                                            isDisabled={document.receivers.length >= 1}
                                                            isSearchable
                                                            isMultiple
                                                            value={userSelected}
                                                            onChange={fnUserSelected}
                                                            options={deputies}
                                                            classNames={{
                                                                menuButton: ({isDisabled}) => (
                                                                    `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                                                                        isDisabled
                                                                            ? "bg-gray-200"
                                                                            : "block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    }`
                                                                ),
                                                                menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                                                                listItem: ({isSelected}) => (
                                                                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                                                        isSelected
                                                                            ? `text-white bg-blue-500`
                                                                            : `text-gray-500 hover:bg-indigo-100 hover:text-indigo-600`
                                                                    }`
                                                                )
                                                            }}
                                                            primaryColor={"indigo"}
                                                        />
                                                    </li>
                                            }
                                        </ul>
                                    </dd>
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
                                                <li
                                                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                    <Select
                                                        placeholder={"Интихоб кунед..."}
                                                        id={"receivers"}
                                                        noOptionsMessage={"Ин гуна истифодабарнада нест!"}
                                                        searchInputPlaceholder={""}
                                                        isDisabled={document.receivers.length >= 1}
                                                        isSearchable
                                                        isMultiple
                                                        value={userSelected}
                                                        onChange={fnUserSelected}
                                                        options={users}
                                                        classNames={{
                                                            menuButton: ({isDisabled}) => (
                                                                `flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${
                                                                    isDisabled
                                                                        ? "bg-gray-200"
                                                                        : "block rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                }`
                                                            ),
                                                            menu: "absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                                                            listItem: ({isSelected}) => (
                                                                `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                                                                    isSelected
                                                                        ? `text-white bg-blue-500`
                                                                        : `text-gray-500 hover:bg-indigo-100 hover:text-indigo-600`
                                                                }`
                                                            )
                                                        }}
                                                        primaryColor={"indigo"}
                                                    />
                                                </li>
                                        }
                                    </ul>
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Назоратӣ</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list"
                                        className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        {
                                            <li
                                                className="flex items-center py-4 pl-4 pr-5 text-sm leading-6">
                                                <input
                                                    disabled={data.is_controlled}
                                                    checked={data.is_controlled ? data.is_controlled : ''}
                                                    value={data.is_controlled ? data.is_controlled : ''}
                                                    onChange={(event) => setData('is_controlled', event.target.checked)}
                                                    id="control"
                                                    name="control"
                                                    type="checkbox"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                                {document.is_controlled}
                                                <div>
                                                    <input
                                                        disabled={data.date_done}
                                                        value={data.date_done == null ? '' : data.date_done}
                                                        onChange={(event) => setData('date_done', event.target.value)}
                                                        type="datetime-local"
                                                        className="block w-full rounded-md border-0 px-2 py-1 text-gray-900   placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-0"
                                                    />
                                                    {errors.date_done || errors.is_controlled && (
                                                        <div className="mt-2 text-xs text-red-600">
                                                            {errors.date_done}
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        }
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Boss;
