import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import Common from "@/Pages/EditDocument/Common.jsx";
import Management from "@/Pages/EditDocument/Management.jsx";

const Index = ({auth, document, bossName, deputies, users, flash}) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={"Edit"}/>
            {
                auth.user.role === 'common' &&
                <Common auth={auth} document={document} deputies={deputies} bossName={bossName} flash={flash}
                        users={users}/>
            }
            {
                auth.user.role === 'management' && <Management auth={auth} document={document} deputies={deputies}/>
            }
        </AuthenticatedLayout>
    );
};

export default Index;
