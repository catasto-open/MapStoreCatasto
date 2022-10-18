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
    }
};

export default burgerMenuContainer;
