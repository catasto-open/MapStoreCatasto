import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import Message from "@mapstore/components/I18N/Message";
import {activateCatastoOpenPanel} from "@js/extension/actions/catastoOpen";


const burgerMenuContainer = {
    BurgerMenu: {
        name: 'CatastoOpen',
        position: 1,
        text: <Message msgId="extension.catastoOpenPanel.title"/>,
        icon: <Glyphicon glyph="book"/>,
        action: activateCatastoOpenPanel.bind(null),
        doNotHide: true
    },
    Toolbar: {
        name: "CatastoOpen",
        position: 1,
        text: <Glyphicon glyph="book"/>,
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
