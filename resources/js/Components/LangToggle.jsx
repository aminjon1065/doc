import React, {Fragment} from 'react';
import {Menu, Transition} from "@headlessui/react";
import {Link} from "@inertiajs/react";
import ru from '@/assets/Flag_of_Russia.svg';
import tj from '@/assets/Flag_of_Tajikistan.svg';

export default function LangToggle() {
    const classNames = 'flex items-center gap-x-3 w-full text-left text-sm px-4 py-2 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-200';
    return (
        <Menu className="relative text-gray-500 mt-1 transition ease-in-out duration-150" as={'div'}>
            <Menu.Button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"/>
                </svg>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute w-32 right-0 top-full mt-2 border shadow-sm bg-white rounded transition duration-150 ease-in-out">
                    <Menu.Item>
                        <Link className={classNames} href={route('language.store')} data={{language: 'ru'}}
                              method="post" as="button">
                            <span>{<img src={ru} alt="ru" className={"w-4 h-4"}/>}</span>
                            <span>Русский</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link className={classNames} href={route('language.store')} data={{language: 'tj'}}
                              method="post" as="button">
                            <span>{<img src={tj} alt="ru" className={"w-4 h-4"}/>}</span>
                            <span>Тоҷикӣ</span>
                        </Link>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
