import {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {
    Bars3Icon,
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon, InboxIcon, PaperAirplaneIcon,
    UsersIcon,
    DocumentPlusIcon
} from '@heroicons/react/24/outline'
import {Link, usePage} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const navigation = [
    {name: 'Сохтан', href: '/documents/create', icon: DocumentPlusIcon},
    {name: 'Ҳуҷҷатҳо', href: '/documents', icon: DocumentDuplicateIcon},
    {name: 'Воридотӣ', href: '/inbox', icon: InboxIcon},
    {name: 'Содиротӣ', href: '/sent', icon: PaperAirplaneIcon},
    {name: 'Dashboard', href: '/dashboard', icon: HomeIcon},
    {name: 'Users', href: '/users', icon: UsersIcon},
    {name: 'Projects', href: '#', icon: FolderIcon},
    {name: 'Calendar', href: '#', icon: CalendarIcon},
    {name: 'Reports', href: '#', icon: ChartPieIcon},
]

const teams = [
    {id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false},
    {id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false},
    {id: 3, name: 'Workcation', href: '#', initial: 'W', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SideBar() {
    const {url} = usePage();
    const [fullView, setFullView] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const fullViewFn = () => {
        setFullView(!fullView);
    }
    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6">
                    <div className="flex h-16 shrink-0 items-center">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                        <span className={"text-white ml-2 font-semibold"}>EDM</span>
                    </div>

                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={classNames(
                                                    url === item.href
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true"/>
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                    {teams.map((team) => (
                                        <li key={team.name}>
                                            <Link
                                                href={team.href}
                                                className={classNames(
                                                    url === team.href
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                              <span
                                                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
                                              >
                                                {team.initial}
                                              </span>
                                                <span className="truncate">{team.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div
                className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
                        onClick={() => setSidebarOpen(true)}>
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true"/>
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
            </div>

        </>
    )
}
