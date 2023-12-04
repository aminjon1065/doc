import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Alert from "@/Components/Alert.jsx";
import Datepicker from "react-tailwindcss-datepicker";
import TextInput from "@/Components/TextInput.jsx";
import {ChevronRightIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";
import logo from "@/assets/logo256.webp";
import Pagination from "@/Components/Pagination.jsx";
import pickBy from 'lodash/pickBy';
import {usePrevious} from 'react-use';
import formatterDay from "@/Helpers/dateFormatter.js";
import {__} from "@/Libs/Lang.jsx";

const Index = ({
                   auth,
                   documents,
                   flash,
                   page,
                   searchTerm,
                   status,
                   dateDone,
                   startDate,
                   typesDocuments,
                   currentLocale,
                   endDate,
                   is_controlled,
               }) => {
    const [values, setValues] = useState({
        page: page || 1,
        search: searchTerm || '',
        status: status || "",
        date_done: dateDone || '',
        start_date: startDate || '',
        end_date: endDate || '',
        is_controlled: is_controlled || false
    });
    const handleValueChangeDates = (newValue) => {
        setValues(prevState => ({
            ...prevState,
            start_date: newValue.startDate,
            end_date: newValue.endDate
        }));
    };
    const handleCheckboxChange = (event) => {
        const key = event.target.name;
        const value = event.target.checked;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }
    const selectTypeChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }
    const handleSearchChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }
    const prevValues = usePrevious(values);
    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : {remember: 'forget'};
            router.get(route(route().current()), query, {
                replace: true,
                preserveState: true
            });
        }
    }, [values]);
    const [visible, setVisible] = useState(true);
    const handleCloseAlert = () => setVisible(false);
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Воридотӣ"/>
            {visible && flash.success &&
                <Alert onClose={handleCloseAlert} message={flash.success}/>
            }
            <div>
                <div className={"flex justify-between items-center mb-5"}>
                    <div className="flex space-x-2">
                        <div>
                            <Datepicker
                                inputId={"datePicker"}
                                separator="то"
                                classNames={
                                    `block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                i18n={currentLocale === 'ru' ? 'ru' : 'tg'}
                                placeholder={__("PeriodDatePicker")}
                                useRange
                                showShortcuts={true}
                                configs={{
                                    shortcuts: {
                                        today: 'Имрӯз',
                                        yesterday: 'Дирӯз',
                                        past: (period) => `${period} рузи охир`,
                                        currentMonth: ' Ҳамин моҳ',
                                        pastMonth: 'Моҳи гузашта',
                                    },
                                }}
                                value={{startDate, endDate}}
                                onChange={handleValueChangeDates}
                            />
                        </div>
                        <div className="flex w-6/12">
                            <select
                                className="block w-2/4 rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                name={"typeDocument"}
                                onChange={selectTypeChange}
                            >
                                <option value="">{__("DocumentType")}</option>
                                {
                                    typesDocuments.map((type, index) => (
                                        <option key={index}
                                                value={type.code}
                                        >
                                            {type.code} - {currentLocale === 'ru' ? type.type_ru : type.type_tj}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className={"flex items-center justify-center space-x-2 w-6/12"}>
                        <div
                            className={"flex items-center justify-center space-x-2 border border-gray-300 px-3 py-1.5 rounded-md"}>
                            <label htmlFor="control"
                                   className=" text-sm items-center text-gray-700">
                                Назоратӣ
                            </label>
                            <div
                                className="flex items-center space-x-2">
                                <input
                                    value={is_controlled}
                                    checked={is_controlled}
                                    id="control"
                                    name="is_controlled"
                                    type="checkbox"
                                    className="focus:ring-indigo-500 w-4 text-indigo-600 border-gray-300 rounded"
                                    onChange={handleCheckboxChange}
                                />
                            </div>
                        </div>
                        <div className={"flex justify-center items-center"}>
                            <div className="relative flex items-center">
                                <TextInput
                                    value={values.search}
                                    onChange={handleSearchChange}
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                                        <MagnifyingGlassIcon className={"w-4 h-4"}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    documents.data.length >= 1
                        ?
                        <ul
                            role="list"
                            className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mb-5"
                        >
                            {documents.data.map((mail, index) => (
                                <li key={index}>
                                    <Link href={route('documents.edit', mail.id)}
                                          className={`relative flex justify-between gap-x-12 px-4 py-5 hover:bg-gray-50 sm:px-6 ${mail.is_read ? 'bg-gray-100' : ''}`}>
                                        <div className="flex gap-x-2">
                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={logo}
                                                 alt="avatar"/>
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                                    <span>
                                                        <span className="absolute inset-x-0 -top-px bottom-0"/>
                                                        {mail.creator.name}
                                                    </span>
                                                </p>
                                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                                    <time
                                                        dateTime={formatterDay(mail.created_at)}>{formatterDay(mail.created_at)}</time>
                                                </p>
                                            </div>
                                        </div>
                                        <div className={"flex items-center justify-start gap-x-6 w-[60%]"}>
                                            <span>{mail.title}</span>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                <p className="text-sm leading-6 text-gray-900">{mail.creator.department}</p>
                                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                                    <span className="relative truncate">
                                                        {mail.creator.position}
                                                        </span>
                                                </p>
                                            </div>
                                            <ChevronRightIcon
                                                className="h-5 w-5 flex-none text-gray-400"
                                                aria-hidden="true"/>
                                        </div>
                                    </Link>
                                    <hr/>
                                </li>
                            ))}
                        </ul>
                        :
                        "Мактуб надоред"
                }
            </div>
            <Pagination currentPage={documents.current_page} nextPage={documents.next_page_url}
                        prevPage={documents.prev_page_url} to={documents.to}
                        total={documents.total}
                        handleSearchChange={handleSearchChange}
            />
        </AuthenticatedLayout>
    );
};

export default Index;
