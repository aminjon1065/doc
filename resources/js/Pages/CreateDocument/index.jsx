import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import User from "@/Pages/CreateDocument/User.jsx";
import Common from "@/Pages/CreateDocument/Common.jsx";

const Index = ({auth, managers, users}) => {
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
                user.role === 'user' && <User/>
            }
            {
                user.role === 'common' && <Common managers={managers} users={users}/>
            }
        </AuthenticatedLayout>
    );
};

export default Index;
