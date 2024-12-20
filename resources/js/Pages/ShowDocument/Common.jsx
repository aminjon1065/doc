import React, {useState} from 'react';
import Modal from "@/Components/Modal.jsx";
import FileViewer from "@/Components/FileViewer.jsx";
import formatterDay from "@/Helpers/dateFormatter.js";
import {PaperClipIcon} from "@heroicons/react/20/solid/index.js";
import {ArrowDownTrayIcon, EyeIcon, PencilIcon} from "@heroicons/react/24/outline/index.js";
import {Link, useForm} from "@inertiajs/react";
import {__} from "@/Libs/Lang.jsx";
import ReplyToDocument from '@/Components/ReplyToDocument';
import {RiQuestionAnswerFill} from "react-icons/ri";
import ShowReply from "@/Components/ShowReply.jsx";
import DangerButton from "@/Components/DangerButton.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {FcCheckmark} from "react-icons/fc";

const Common = ({document, userId, bossName}) => {
    const [fullView, setFullView] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState();
    const [fileUrl, setFileUrl] = useState('');
    const fullViewFn = () => {
        setFullView(!fullView);
    }
    const openFileModal = (fileUrl) => {
        setFileUrl(fileUrl);
        setShowModal(true);
    }
    const openModal = (url) => {
        setFileUrl(url)
        setShowModal(true);
    }
    const {delete: destroy} = useForm();
    const deleteDocument = (e) => {
        const sureDelete = confirm("Точно?");
        if (!sureDelete) {
            return;
        }
        e.preventDefault();
        destroy(route('documents.destroy', document.id), {
            preserveScroll: true
        });
    }

    return (
        <>
            <Modal show={showModal} onClose={() => setShowModal(false)} fullView={fullView}
                   fullViewFn={fullViewFn}>
                <FileViewer fullView={fullView} onClose={() => setShowModal(false)} fileUrl={fileUrl}/>
            </Modal>
            <div className="flex justify-between">
                <span className={"text-sm"}>Статус: <span
                    className={`${document.status === "created" ? 'bg-amber-500' : document.status === "in_review" ? "bg-yellow-400" : "bg-green-500"} px-2 py-1 rounded`}>{__(document.status)}</span></span>
                <span
                    className={"text-sm"}
                >
                    <Link as={"button"}
                          className={"text-indigo-600 hover:text-indigo-500 flex hover:bg-gray-300 py-2 px-4 rounded justify-between space-x-2 items-center"}
                          href={route(`document-edit-only-common-department.edit`, {'id': document.id})}
                    >
                        <PencilIcon className={"w-4 h-4"}/>
                        <span>{__("Edit")}</span>
                    </Link>
                </span>
            </div>
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
                                <dt className="text-sm font-medium text-gray-900">{__("ToTheBoss")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {
                                        bossName ? (

                                                <div className="flex items-center space-x-3">
                                        <span>
                                            {bossName.name}
                                        </span>
                                                    <FcCheckmark/>
                                                </div>
                                            )
                                            :
                                            <input
                                                type="checkbox"
                                                name="toBoss"
                                                id="toBoss"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                checked={document.toBoss}
                                                onChange={(event) => setData('toBoss', event.target.checked)}/>
                                    }
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("DateIn")}/{__("ControlDate")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
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
                                <dt className="text-sm font-medium text-gray-900">{__("Position")}/{__("Rank")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    {document.creator.position} / {document.creator.rank}
                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-900">{__("Manager")}</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                    <ul role="list"
                                        className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        {
                                            document.deputy.map((deputy, index) => (
                                                <li key={index}
                                                    className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                    <div className="flex w-0 flex-1 items-center">
                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                    <span
                                                                        className="truncate font-medium">{deputy.name}</span>
                                                            <span
                                                                className="flex-shrink-0 text-gray-400">{deputy.department} / {deputy.region}</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
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
                                                                className="ml-4 flex-shrink-0 space-x-3 flex justify-between">
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
                                                    {__("Empty")}
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
                                                    {__("Empty")}
                                                </li>
                                        }
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="px-4 py-6 flex justify-between items-center">
                        <DangerButton className={""} onClick={deleteDocument}>
                            {__("Delete")}
                        </DangerButton>
                    </div>
                </div>
            </article>
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
            <Modal show={showResponseModal} onClose={() => setShowResponseModal(false)} fullView={fullView}
                   fullViewFn={fullViewFn}>
                <ReplyToDocument documentId={document.id} userId={userId} onClose={() => setShowResponseModal(false)}/>
            </Modal>
        </>
    );
};

export default Common;
