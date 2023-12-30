import React from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import {__} from "@/Libs/Lang.jsx";
import User from "@/Pages/Reports/User.jsx";
import Common from "@/Pages/Reports/Common.jsx";

const Index = ({auth, typesDocuments, currentLocale}) => {
    return (
        <Authenticated
            user={auth.user}
        >
            <Head title={__("Reports")}/>
            {
                auth.user.role === 'user' ?
                    <User
                        typesDocuments={typesDocuments}
                        currentLocale={currentLocale}
                    />
                    :
                    <Common
                        typesDocuments={typesDocuments}
                        currentLocale={currentLocale}
                    />

            }
        </Authenticated>
    );
};

export default Index;
