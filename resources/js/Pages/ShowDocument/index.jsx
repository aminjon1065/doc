import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import User from "@/Pages/ShowDocument/User.jsx";
import Manager from "@/Pages/ShowDocument/Manager.jsx";
import Common from "@/Pages/ShowDocument/Common.jsx";
import {Head} from "@inertiajs/react";

const Index = ({auth, document, bossName}) => {
    const user = auth.user;
    return (
        <AuthenticatedLayout
            user={user}
        >
            <Head title={document ? document.title : 'EDM'}/>
            {
                user.role === 'user' && (
                    <User document={document} userId={user.id}/>
                )
            }
            {
                user.role === 'management' && (
                    <Manager/>
                )
            }
            {
                user.role === 'common' && (
                    <Common document={document} bossName={bossName} userId={user.id}/>
                )
            }
        </AuthenticatedLayout>
    );
};

export default Index;
