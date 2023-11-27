import React from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, router, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import {__} from "@/Libs/Lang.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const EditUserForm = ({auth, user, flash}) => {
        const {put, data, setData, errors, processing, reset} = useForm({
            name: user.name || '',
            email: user.email || '',
            position: user.position || "",
            department: user.department || "",
            region: user.region || "",
            rank: user.rank || "",
            role: user.role || "",
            password: "",
            password_confirmation: ""
        });
        // const [passwordData, setPasswordData] = React.useState({
        //     password: '',
        //     password_confirmation: ''
        // });
        // const [isPasswordChanged, setIsPasswordChanged] = React.useState(false);
        // const handlePasswordChange = (e) => {
        //     setPasswordData({...passwordData, [e.target.name]: e.target.value});
        // };

        const submit = (e) => {
            e.preventDefault();

            // let submitData = {...data};
            // if (passwordData.password.length > 0 && passwordData.password_confirmation.length > 0) {
            //     submitData = {...submitData, ...passwordData};
            // }
            //
            // put(route('users.update', user.id), submitData, {
            //     preserveScroll: true,
            //     onSuccess: () => {
            //         console.log(flash.success);
            //     },
            // });
            put(route('users.update', user.id), data, {
                preserveScroll: true,
                onSuccess: () => {
                    console.log(flash.success);
                },
            });
        };
        return (
            <Authenticated
                user={auth.user}
            >
                <Head title="Edit User"/>
                <div>
                    <form onSubmit={submit}>
                        <div className="flex justify-between space-x-4 mx-4">
                            <div className={"w-full"}>
                                <InputLabel htmlFor="name" value={__("Name")}/>
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}

                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            <div className={"w-full"}>
                                <InputLabel htmlFor="email" value="Email"/>
                                <TextInput
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="email"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}

                                />
                                <InputError message={errors.email} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex justify-between space-x-4 mx-4">
                            <div className={"w-full"}>
                                <InputLabel htmlFor="region" value={__("Region")}/>
                                <TextInput
                                    id="region"
                                    name="region"
                                    value={data.region}
                                    className="mt-1 block w-full"
                                    autoComplete="region"
                                    isFocused={true}
                                    onChange={(e) => setData('region', e.target.value)}

                                />
                                <InputError message={errors.region} className="mt-2"/>
                            </div>
                            <div className={"w-full"}>
                                <InputLabel htmlFor="role" value={__("Role")}/>
                                <select name="role" id="role"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className={"w-full mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "}>
                                    <option value="" disabled>{__("Select")}</option>
                                    <option value="admin">{__("Admin")}</option>
                                    <option value="user">{__("User")}</option>
                                    <option value="common">{__("Common")}</option>
                                    <option value="management">{__("Management")}</option>
                                </select>
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex justify-between space-x-4 mx-4 mt-5">
                            <div className={"w-full"}>
                                <InputLabel htmlFor="department" value={__("Department") + '/' + __("Rayosat")}/>

                                <TextInput
                                    id="department"
                                    name="department"
                                    value={data.department}
                                    className="mt-1 block w-full"
                                    autoComplete="department"
                                    isFocused={true}
                                    onChange={(e) => setData('department', e.target.value)}

                                />
                                <InputError message={errors.department} className="mt-2"/>
                            </div>
                            <div className={"w-full"}>
                                <InputLabel htmlFor="position" value={__("Position")}/>
                                <TextInput
                                    id="position"
                                    name="position"
                                    value={data.position}
                                    className="mt-1 block w-full"
                                    autoComplete="position"
                                    isFocused={true}
                                    onChange={(e) => setData('position', e.target.value)}

                                />
                                <InputError message={errors.position} className="mt-2"/>
                            </div>
                            <div className={"w-full"}>
                                <InputLabel htmlFor="rank" value={__("Rank")}/>
                                <TextInput
                                    id="rank"
                                    name="rank"
                                    value={data.rank}
                                    className="mt-1 block w-full"
                                    autoComplete="position"
                                    isFocused={true}
                                    onChange={(e) => setData('rank', e.target.value)}
                                />
                                <InputError message={errors.rank} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex justify-between space-x-4 mx-4 mt-5">
                            <div className="mt-4 w-full">
                                <InputLabel htmlFor="password" value={__("Password")}/>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2"/>
                            </div>

                            <div className="mt-4 w-full">
                                <InputLabel htmlFor="password_confirmation" value={__("ConfirmPassword")}/>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation} className="mt-2"/>
                            </div>
                        </div>
                        <div className="flex justify-end mx-4">
                            <PrimaryButton className="ms-4 mt-5" disabled={processing}>
                                {__('Save')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Authenticated>
        );
    }
;

export default EditUserForm;
