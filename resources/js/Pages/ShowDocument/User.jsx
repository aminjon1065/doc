import React, {useState} from 'react';
import Modal from "@/Components/Modal.jsx";
import FileViewer from "@/Components/FileViewer.jsx";
import formatterDay from "@/Helpers/dateFormatter.js";
import {PaperClipIcon} from "@heroicons/react/20/solid/index.js";
import {ArrowDownTrayIcon, EyeIcon} from "@heroicons/react/24/outline/index.js";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {__} from "@/Libs/Lang.jsx";

const User = ({document}) => {
    const [fullView, setFullView] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState()
    const [fileUrl, setFileUrl] = useState('');
    const fullViewFn = () => {
        setFullView(!fullView);
    }
    const openModal = (url) => {
        setFileUrl(url)
        setShowModal(true);
    }

    const openResponseModal = () => {
        setShowResponseModal(true);
    }
    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(false)} fullView={fullView}
                   fullViewFn={fullViewFn}>
                <FileViewer fullView={fullView} onClose={() => setShowModal(false)} fileUrl={fileUrl}/>
            </Modal>
            <Modal show={showResponseModal} onClose={() => setShowResponseModal(false)} fullView={fullView}
                   fullViewFn={fullViewFn}>
                response
            </Modal>
            <span className={"text-sm"}>Статус: <span
                className={`${document.status === "created" ? 'bg-amber-500' : document.status === "in_review" ? "bg-yellow-400" : "bg-green-500"} px-2 py-1 rounded`}> {__(document.status)}</span></span>
            <article className={"mt-5"}>
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("From")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.name}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("DateIn")}/{__("ControlDate")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {formatterDay(document.created_at)} / {document.date_done ? <span
                                    className={"bg-red-400 text-white py-1 px-2 rounded"}>{formatterDay(document.date_done)}</span> : 'Назорати нест'}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("Rayosat")}/{__("Department")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.department}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("Position")}/{__("Rank")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.position} / {document.creator.rank}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("Manager")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{document.manager.name}</dd>
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
                                <dt className="text-sm font-medium leading-6 text-gray-900">{__("Documents")}</dt>
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
                                                                        <span>{__("See")}</span>

                                                                    </div>
                                                                </button>
                                                                <a href={`/storage/${file.file_path}`}
                                                                   download={`/storage/${file.file_path}`}
                                                                   className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                    <div
                                                                        className={"flex justify-between items-center space-x-1"}>
                                                                        <ArrowDownTrayIcon className={"w-4 h-4"}/>
                                                                        <span>{__("Download")}</span>
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
                                <dt className="text-sm font-medium leading-6 text-gray-900">{__("Users")}</dt>
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
                                                    empty
                                                </li>
                                        }
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="flex mt-5 justify-end">
                    <PrimaryButton
                        onClick={openResponseModal}
                    >
                        {__("Reply")}
                    </PrimaryButton>
                </div>
            </article>
        </>
    );
};

export default User;
