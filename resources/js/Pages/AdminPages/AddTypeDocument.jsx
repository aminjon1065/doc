import React, {useState} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import {__} from "@/Libs/Lang.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/24/outline/index.js";
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";

const AddTypeDocument = ({auth, typesDocuments, currentLocale}) => {
    const [fullView, setFullView] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorsTypes, setErrorsTypes] = useState({
        'type_tj': '',
        'type_ru': '',
        'code': ''
    })
    const fullViewFn = () => {
        setFullView(!fullView);
    }
    const openModal = () => {
        setShowModal(true);
    }
    const submit = (e) => {
        e.preventDefault();
        router.post(route('types-document.store'), data, {
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(false)
                setData({
                    type_ru: '',
                    type_tj: '',
                    code: ''
                })
            },
            onError: (err) => {
                setErrorsTypes({
                    'type_ru': err.type_ru,
                    'type_tj': err.type_tj,
                    'code': err.code
                })
            },
        });
    }
    const {setData, post, errors, data} = useForm({
        type: '',
        code: ''
    });
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={__("TypeDocument")}/>
            <Modal show={showModal} onClose={() => setShowModal(false)} fullView={fullView} fullViewFn={fullViewFn}>
                <form onSubmit={submit}>
                    <div className={"mx-4 mb-5"}>
                        <InputLabel
                            htmlFor={"code_document"}
                        >
                            {__("CodeDocument")}
                        </InputLabel>
                        <TextInput
                            id={"code_document"}
                            className={"block w-full"}
                            name={"code"}
                            value={data.code}
                            onChange={e => setData('code', e.target.value)}
                        />
                        {errorsTypes.code && (<span className={"text-red-500"}>{errorsTypes.code}</span>)}
                    </div>
                    <div className={"mx-4 mb-5"}>
                        <InputLabel
                            htmlFor={"type_document_ru"}
                        >
                            {__("TypeDocument")} (Русский)
                        </InputLabel>
                        <TextInput
                            id={"type_document_ru"}
                            name={"type_ru"}
                            value={data.type_ru}
                            onChange={e => setData('type_ru', e.target.value)}
                            className={"block w-full"}
                        />
                        {errorsTypes.type_ru && (<span className={"text-red-500"}> {errorsTypes.type_ru}</span>)}
                    </div>
                    <div className={"mx-4 mb-5"}>
                        <InputLabel
                            htmlFor={"type_document_tj"}
                        >
                            {__("TypeDocument")} (Тоҷикӣ)
                        </InputLabel>
                        <TextInput
                            id={"type_document_tj"}
                            name={"type_tj"}
                            value={data.type_tj}
                            onChange={e => setData('type_tj', e.target.value)}
                            className={"block w-full"}
                        />
                        {errorsTypes.type_tj && (<span className={"text-red-500"}> {errorsTypes.type_tj}</span>)}
                    </div>
                    <PrimaryButton>
                        {__("Save")}
                    </PrimaryButton>
                </form>
            </Modal>

            <div className="flex justify-end">

                <PrimaryButton
                    onClick={openModal}
                    type={"submit"}
                >
                    <PlusCircleIcon className={"w-6 h-6 mr-2"}/>
                    {__("Add")}
                </PrimaryButton>
            </div>
            <div>
                <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                    <tr>
                        <th scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                            {__("CodeDocument")}
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            {__("TypeDocument")}
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {typesDocuments.map((typeDocument) => (
                        <tr key={typeDocument.code}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {typeDocument.code}
                            </td>
                            <td className=" px-3 py-4 text-sm text-gray-500"> {currentLocale === "ru" ? typeDocument.type_ru : typeDocument.type_tj}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                <Link href={route('types-document.edit', typeDocument.id)} className="text-indigo-600 hover:text-indigo-900">
                                    Edit<span className="sr-only">, {typeDocument.code}</span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
};

export default AddTypeDocument;
