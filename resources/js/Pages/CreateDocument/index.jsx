import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import User from "@/Pages/CreateDocument/User.jsx";
import Common from "@/Pages/CreateDocument/Common.jsx";

const Index = ({auth, managers, users, typesDocuments, currentLocale}) => {
    const user = auth.user;
    return (
        <AuthenticatedLayout
            user={user}
        >
            <Head title={"Create"}/>
            {
                user.role === 'management' && <div>Manager</div>
            }
            {
                user.role === 'user' && <User typesDocuments={typesDocuments} currentLocale={currentLocale}/>
            }
            {
                user.role === 'common' && <Common managers={managers} users={users} typesDocuments={typesDocuments} currentLocale={currentLocale}/>
            }
        </AuthenticatedLayout>
    );
};

export default Index;
