import React, {useEffect} from 'react';
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {__} from "@/Libs/Lang.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const AddUserForm = ({
                         onClose = () => {
                         }
                     }) => {
        const {post, data, setData, errors, processing, reset} = useForm({
            name: '',
            email: '',
            position: "",
            department: "",
            region: "",
            rank: "",
            role: "",
            password: '',
            password_confirmation: '',
        });
        useEffect(() => {
            return () => {
                reset('password', 'password_confirmation');
            };
        }, []);
        const submit = (e) => {
            e.preventDefault();
            post(route('users.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        }
        return (
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
                                required
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
                                required
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
                                required
                            />
                            <InputError message={errors.region} className="mt-2"/>
                        </div>
                        <div className={"w-full"}>
                            <InputLabel htmlFor="role" value={__("Role")}/>
                            <select name="role" id="role"
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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
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
        );
    }
;

export default AddUserForm;
