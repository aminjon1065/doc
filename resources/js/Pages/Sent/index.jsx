import React from 'react';
import ManagerSent from "@/Pages/Sent/ManagerSent.jsx";
import UserSent from "@/Pages/Sent/UserSent.jsx";
import CommonSent from "@/Pages/Sent/CommonSent.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const Index = ({auth}) => {
    const user = auth.user;
    return (
        <AuthenticatedLayout
            user={user}
        >
            <Head title={"Sent"}/>
            {user.role === 'management' && <ManagerSent/>}
            {user.role === 'user' && <UserSent/>}
            {user.role === 'common' && <CommonSent/>}
        </AuthenticatedLayout>
    );
};

export default Index;
