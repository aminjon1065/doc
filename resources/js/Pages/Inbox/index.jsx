import React from 'react';
import ManagerInbox from "@/Pages/Inbox/ManagerInbox.jsx";
import UserInbox from "@/Pages/Inbox/UserInbox.jsx";
import CommonInbox from "@/Pages/Inbox/CommonInbox.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const Index = ({
                   auth,
                   documents,
                   flash,
                   page,
                   searchTerm,
                   status,
                   dateDone,
                   startDate,
                   endDate,
                   is_controlled,
                   typesDocuments,
                   typeDocument,
                   currentLocale
               }) => {
    const user = auth.user;
    return (
        <AuthenticatedLayout
            user={user}
        >
            <Head title={"Inbox"}/>
            {user.role === 'management' && <ManagerInbox/>}
            {user.role === 'user' && <UserInbox
                documents={documents}
                flash={flash}
                page={page}
                searchTerm={searchTerm}
                status={status}
                dateDone={dateDone}
                startDate={startDate}
                endDate={endDate}
                is_controlled={is_controlled}
                typeDocument={typeDocument}
                typesDocuments={typesDocuments}
                currentLocale={currentLocale}
            />}
            {user.role === 'common' && <CommonInbox
                documents={documents}
                flash={flash}
                page={page}
                searchTerm={searchTerm}
                status={status}
                dateDone={dateDone}
                startDate={startDate}
                endDate={endDate}
                is_controlled={is_controlled}
                typeDocument={typeDocument}
                typesDocuments={typesDocuments}
                currentLocale={currentLocale}
            />}
        </AuthenticatedLayout>
    );
};
export default Index;
