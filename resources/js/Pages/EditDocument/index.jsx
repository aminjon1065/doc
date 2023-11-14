import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, useForm} from "@inertiajs/react";
import formatterDay from "@/Helpers/dateFormatter.js";
import {PaperClipIcon} from "@heroicons/react/20/solid/index.js";
import {ArrowDownTrayIcon, EyeIcon} from "@heroicons/react/24/outline/index.js";
import FileViewer from "@/Components/FileViewer.jsx";
import Modal from "@/Components/Modal.jsx";
import Select from "react-tailwindcss-select";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import Common from "@/Pages/EditDocument/Common.jsx";

const Index = ({auth, document, managers}) => {
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
                auth.user.role === 'common' && <Common auth={auth} document={document} managers={managers}/>
            }
        </AuthenticatedLayout>
    );
};

export default Index;
