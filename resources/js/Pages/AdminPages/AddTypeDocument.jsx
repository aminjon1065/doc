import React, {useState} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import {__} from "@/Libs/Lang.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {PlusCircleIcon} from "@heroicons/react/24/outline/index.js";
import Modal from "@/Components/Modal.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";

const AddTypeDocument = ({auth, typesDocuments}) => {
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
                {typesDocuments.map((typeDocument) => (
                    <div className={"flex justify-between"}>
                        <p>{typeDocument.type_tj}</p>
                        <p>{typeDocument.type_ru}</p>
                        <p>{typeDocument.code}</p>
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default AddTypeDocument;
