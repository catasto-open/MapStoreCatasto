import React from 'react';
import Message from "@mapstore/components/I18N/Message";
import {activateCatastoOpenPanel} from "@js/extension/actions/catastoOpen";
import FaIcon from '@js/extension/components/FaIcon';


const burgerMenuContainer = {
    BurgerMenu: {
        name: 'CatastoOpen',
        position: 3,
        text: <Message msgId="extension.catastoOpenPanel.title"/>,
        icon: <FaIcon name="building"/>,
        action: activateCatastoOpenPanel.bind(null),
        doNotHide: true
    },
    SidebarMenu: {
        name: 'CatastoOpen',
        position: 3,
        tooltip: "extension.catastoOpenPanel.title",
        text: <Message msgId="extension.catastoOpenPanel.title"/>,
        icon: <FaIcon name="building"/>,
        action: activateCatastoOpenPanel.bind(null),
        priority: 1,
        doNotHide: true
    },
    Toolbar: {
        name: "CatastoOpen",
        position: 1,
        text: <FaIcon name="building"/>,
        tooltip: "extension.catastoOpenPanel.title",
        doNotHide: true,
        alwaysVisible: true,
        action: activateCatastoOpenPanel.bind(null),
        selector: (state) => ({
            style: state?.catastoOpen?.reduced ? {color: '#a87600', backgroundColor: '#ffffff'} :  { display: 'none' }
        })
    }
};

export default burgerMenuContainer;
