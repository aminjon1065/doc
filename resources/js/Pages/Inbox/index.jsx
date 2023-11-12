import React from 'react';
import ManagerInbox from "@/Pages/Inbox/ManagerInbox.jsx";
import UserInbox from "@/Pages/Inbox/UserInbox.jsx";
import CommonInbox from "@/Pages/Inbox/CommonInbox.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const Index = ({auth, documents}) => {
    console.log(documents)
    const user = auth.user;
    return (
        <AuthenticatedLayout
            user={user}
        >
            <Head title={"Inbox"}/>
            {user.role === 'management' && <ManagerInbox/>}
            {user.role === 'user' && <UserInbox/>}
            {user.role === 'common' && <CommonInbox/>}
        </AuthenticatedLayout>
    );
};
export default Index;
