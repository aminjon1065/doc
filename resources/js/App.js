import React, {useEffect} from 'react';
import {App as InertiaApp} from '@inertiajs/react';
import i18n from './../localization/i18n';

function App(props) {
    useEffect(() => {
        const lang = localStorage.getItem('lang');
        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, []);

    return <InertiaApp {...props}/>;
}

export default App;
