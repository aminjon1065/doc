import './bootstrap';
import '../css/app.css';
import i18n from './../localization/i18n.js';
import {createRoot} from 'react-dom/client';
import {createInertiaApp} from '@inertiajs/react';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {useEffect} from "react";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
useEffect(() => {
    const token = localStorage.getItem('token');
    const lang = localStorage.getItem('lang');
    if (lang) {
        i18n.changeLanguage(lang);
    }
}, []);
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({el, App, props}) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
