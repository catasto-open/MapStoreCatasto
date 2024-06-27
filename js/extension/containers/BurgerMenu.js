import React from 'react';
import Message from "@mapstore/components/I18N/Message";
import {activateCatastoOpenPanel} from "@js/extension/actions/catastoOpen";
import { Glyphicon } from 'react-bootstrap';


const burgerMenuContainer = {
    BurgerMenu: {
        name: 'CatastoOpen',
        position: 3,
        text: <Message msgId="extension.catastoOpenPanel.title"/>,
        icon: <Glyphicon glyph="eye-open"/>,
        action: activateCatastoOpenPanel.bind(null),
        doNotHide: true
    },
    SidebarMenu: {
        name: 'CatastoOpen',
        position: 3,
        tooltip: "extension.catastoOpenPanel.title",
        text: <Message msgId="extension.catastoOpenPanel.title"/>,
        icon: <Glyphicon glyph="eye-open"/>,
        action: activateCatastoOpenPanel.bind(null),
        priority: 1,
        doNotHide: true
    },
    Toolbar: {
        name: "CatastoOpen",
        position: 1,
        text: <Glyphicon glyph="eye-open"/>,
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
