import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import User from "@/Pages/Create/User.jsx";
import Common from "@/Pages/Create/Common.jsx";

const Index = ({auth, managers}) => {
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
                user.role === 'common' && <Common managers={managers}/>
            }
        </AuthenticatedLayout>
    );
};

export default Index;
