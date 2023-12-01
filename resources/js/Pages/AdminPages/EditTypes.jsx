import React, {useState} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router, useForm} from "@inertiajs/react";
import {__} from "@/Libs/Lang.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const EditTypes = ({auth, typesDocuments}) => {
    const {setData, put, errors, data} = useForm({
        type_tj: typesDocuments.type_tj || '',
        type_ru: typesDocuments.type_ru || '',
        code: typesDocuments.code || ''
    });
    const [errorsTypes, setErrorsTypes] = useState({
        'type_tj': '',
        'type_ru': '',
        'code': ''
    })
    const submit = (e) => {
        e.preventDefault();
        router.put(route('types-document.update', typesDocuments.id), data, {
            preserveScroll: true,
            onSuccess: () => {
                router.replace(route('types-document.index'))
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
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={__("EditTypes")}/>

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
        </AuthenticatedLayout>
    );
};

export default EditTypes;
