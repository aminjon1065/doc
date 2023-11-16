import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";

const DocumentEditOnlyCommonDepartment = ({auth, document, managers}) => {
    const {data, setData, post, errors} = useForm({
        category: '',
        status: '',
        code: '',
        is_controlled: '',
        date_done: '',
        is_read: '',
        receivers: [],
    });
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={"Edit"}/>

        </AuthenticatedLayout>
    );
};

export default DocumentEditOnlyCommonDepartment;
