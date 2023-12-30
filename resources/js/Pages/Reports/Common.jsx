import React, {useState} from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import {__} from "@/Libs/Lang.jsx";
import {useForm} from "@inertiajs/react";
import axios from "axios";

const Common = ({typesDocuments, currentLocale}) => {
    const {data, setData} = useForm({
        startDate: "",
        endDate: "",
        typeDocument: "",
        filled: "inbox"
    });
    const handleValueChangeDates = (newValue) => {
        setData(prevState => ({
            ...prevState,
            startDate: newValue.startDate,
            endDate: newValue.endDate
        }));
    };
    const selectTypeChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setData("typeDocument", value);
    }
    const startDate = data.startDate;
    const endDate = data.endDate;

    const downloadPdf = () => {
        if (data.startDate === "" || data.endDate === "") {
            alert("Выберите даты - Рузҳоро интихоб кунед");
            return;
        }
        axios.get(`/generate?filled=${data.filled}&start=${startDate}&end=${endDate}`, {responseType: 'blob'})
            .then((response) => {
                // Создаем URL-объект из blob ответа
                const url = window.URL.createObjectURL(new Blob([response.data]));

                // Создаем ссылку DOM и программно кликаем по ней
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'report.pdf');
                document.body.appendChild(link);
                link.click();

                // Удаляем ссылку для освобождения памяти
                link.parentNode.removeChild(link);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className={"h-screen"}>
            <div className="flex space-x-2">
                <div className={"w-1/3"}>
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
                                today: __("Today"),
                                yesterday: __("Yesterday"),
                                past: (period) => `${period} ${__("PeriodDay")}`,
                                currentMonth: __("CurrentMonth"),
                                pastMonth: __("LastMonth"),
                            },
                        }}
                        value={{startDate, endDate}}
                        onChange={handleValueChangeDates}
                    />
                </div>
                {/*<div className="flex w-full">*/}
                {/*    <select*/}
                {/*        className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                {/*        name={"typeDocument"}*/}
                {/*        onChange={selectTypeChange}*/}
                {/*    >*/}
                {/*        <option value="">{__("AllTypeDocuments")}</option>*/}
                {/*        {*/}
                {/*            typesDocuments.map((type, index) => (*/}
                {/*                <option key={index}*/}
                {/*                        value={type.code}*/}
                {/*                >*/}
                {/*                    {type.code} - {currentLocale === 'ru' ? type.type_ru : type.type_tj}*/}
                {/*                </option>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </select>*/}
                {/*</div>*/}
                <div className="flex w-1/3">
                    <select
                        className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name={"typeDocument"}
                        value={data.filled}
                        onChange={(e) => setData('filled', e.target.value)}
                    >
                        <option value="inbox">{__("Inbox")}</option>
                        <option value="sent">{__("Sent")}</option>
                    </select>
                </div>
                <div className="flex">
                    <button
                        type="button"
                        onClick={downloadPdf}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {__("Download")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Common;
