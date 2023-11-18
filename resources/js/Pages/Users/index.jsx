import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";

const Index = ({auth, users}) => {
    console.log(users)
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Users"/>
            <div>
                <h1 className="mb-8 font-bold text-3xl">Users</h1>
                {
                    users.map((user) => (
                        <div key={user.id} className="mb-4">
                            <div className="flex items-center justify-between">
                                <div className="text-lg font-medium text-gray-900">{user.name}</div>
                                <div className="flex items-center">
                                    <div className="text-sm font-medium text-gray-900"><span className={"bg-green-500 text-white px-4 py-2 rounded"}>{user.role}</span>||{user.email}</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
