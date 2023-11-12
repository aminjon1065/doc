import React from 'react';
import ManagerSent from "@/Pages/Sent/ManagerSent.jsx";
import UserSent from "@/Pages/Sent/UserSent.jsx";
import CommonSent from "@/Pages/Sent/CommonSent.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const Index = ({auth, documents}) => {
    const user = auth.user;
    return (
        <AuthenticatedLayout
            user={user}
        >
            <Head title={"Sent"}/>
            {user.role === 'management' && <ManagerSent/>}
            {user.role === 'user' && <UserSent documents={documents}/>}
            {user.role === 'common' && <CommonSent documents={documents}/>}
        </AuthenticatedLayout>
    );
};

export default Index;
