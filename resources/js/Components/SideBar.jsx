import {
    ChartPieIcon,
    DocumentDuplicateIcon,
    HomeIcon, InboxIcon, PaperAirplaneIcon,
    UsersIcon,
    DocumentPlusIcon, TagIcon
} from '@heroicons/react/24/outline'
import {Link, usePage} from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {DocumentCheckIcon} from "@heroicons/react/24/outline/index.js";
import {__} from '@/Libs/Lang.jsx';

const navigation = [
    {name: 'NewDocument', href: '/documents/create', icon: DocumentPlusIcon},
    {name: 'CommonDocuments', href: '/documents', icon: DocumentDuplicateIcon},
    {name: 'ReviewDocument', href: '/documents-in-reviews', icon: DocumentCheckIcon},
    {name: 'Inbox', href: '/inbox', icon: InboxIcon},
    {name: 'Sent', href: '/sent', icon: PaperAirplaneIcon},
    {name: 'Dashboard', href: '/dashboard', icon: HomeIcon},
    {name: 'Users', href: '/users', icon: UsersIcon},
    {name: 'Reports', href: '/reports', icon: ChartPieIcon},
    {name: 'TypeDocument', href: '/types-document', icon: TagIcon},
]

const accessibleItems = {
    'common': ['NewDocument', 'CommonDocuments', 'Inbox', 'Sent', 'Users', 'TypeDocument','Reports'],
    'management': ['ReviewDocument'],
    'user': ['NewDocument', 'Inbox', 'Sent'],
    'admin': ['Users',"TypeDocument"],
};

const teams = [
    {id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false},
    {id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false},
    {id: 3, name: 'Workcation', href: '#', initial: 'W', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SideBar({user}) {
    const {url} = usePage();
    const filteredNavigation = navigation.filter(item => accessibleItems[user.role].includes(item.name));
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
                                    {filteredNavigation.map((item) => (
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
                                                {__(item.name)}
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
        </>
    )
}
