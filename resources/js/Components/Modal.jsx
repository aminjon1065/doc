import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {XMarkIcon} from "@heroicons/react/24/outline";
import {PlusIcon} from "@heroicons/react/24/outline/index.js";

export default function Modal({
                                  children,
                                  show = false,
                                  maxWidth = '80',
                                  closeable = true,
                                  fullView,
                                  fullViewFn = () => {

                                  },
                                  onClose = () => {
                                  }
                              }) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const classCondFn = () => {
        if (fullView) {
            return 'sm:w-full h-full';
            // return 'sm:w-10/12 h-5/6';
        } else {
            return 'sm:w-3/5 h-5/6';
        }
    }


    let maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '80': classCondFn(),
    }[maxWidth]
    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all hsc"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-500/75 h-screen"/>
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                                <Dialog.Panel
                                    className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:mx-auto ${maxWidthClass} hide-scrollbar`}
                                    style={{maxHeight: '90vh', overflowY: 'scroll'}}
                                >
                                    <div className="flex justify-end mt-2 mr-2">
                                        <div className="flex space-x-2">
                                            <PlusIcon onClick={() => fullViewFn()}
                                                      className={"w-4 bg-yellow-400 text-yellow-400 rounded-full hover:text-gray-700"}/>
                                            <XMarkIcon onClick={() => close()}
                                                       className={"w-4 bg-red-500 text-red-500 rounded-full hover:text-gray-700"}/>
                                        </div>
                                    </div>
                                    {children}
                                </Dialog.Panel>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
