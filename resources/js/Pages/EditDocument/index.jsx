import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import Common from "@/Pages/EditDocument/Common.jsx";
import Management from "@/Pages/EditDocument/Management.jsx";
import Deputy from "@/Pages/EditDocument/Deputy.jsx";
import Boss from "@/Pages/EditDocument/Boss.jsx";

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
                auth.user.role === 'boss' &&
                <Boss auth={auth} flash={flash} document={document} deputies={deputies} users={users}/>
            }
            {
                auth.user.role === 'deputy' &&
                <Deputy document={document} users={users} flash={flash}/>
            }
        </AuthenticatedLayout>
    );
};

export default Index;
