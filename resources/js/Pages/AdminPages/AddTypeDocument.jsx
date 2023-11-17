import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const AddTypeDocument = ({auth}) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            AddTypeDocument
        </AuthenticatedLayout>
    );
};

export default AddTypeDocument;
