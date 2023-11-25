import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import Common from "@/Pages/EditDocument/Common.jsx";
import Management from "@/Pages/EditDocument/Management.jsx";

const Index = ({auth, document, managers, users,flash}) => {

    const {data, setData, put, errors} = useForm({
        manager_id: document.manager_id || '',
        date_done: document.date_done || '',
        category: document.category || '',
        is_controlled: document.is_controlled || '',
        status: document.status || '',
        receivers: [],
    });
    const [userSelected, setUserSelected] = useState(null);
    const [usersList, setUsersList] = useState([]);
    const [fullView, setFullView] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const fnUserSelected = (value) => {
        setUserSelected(value);
        const receiverIds = value ? value.map(item => item.value) : [];
        setData('receivers', receiverIds);
    };
    useEffect(() => {
        axios.get(route('users-list')).then((response) => {
            setUsersList(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }, []);
    const fullViewFn = () => {
        setFullView(!fullView);
    }
    const openModal = (url) => {
        setFileUrl(url)
        setShowModal(true);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('documents.update', document.id), {
            preserveScroll: true,
            onSuccess: () => {
                window.location.reload();
            },
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title={"Edit"}/>
            {
                auth.user.role === 'common' &&
                <Common auth={auth} document={document} managers={managers} flash={flash} users={users}/>
            }
            {
                auth.user.role === 'management' && <Management auth={auth} document={document} managers={managers}/>
            }
        </AuthenticatedLayout>
    );
};

export default Index;
