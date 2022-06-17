import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import Message from "@mapstore/components/I18N/Message";
import {activateCatastoOpenPanel} from "@js/extension/actions/catastoOpen";

const burgerMenuContainer = {
    BurgerMenu: {
        name: 'CatastoOpen',
        position: 6,
        text: <Message msgId="extension.catastoOpenPanel.title"/>,
        icon: <Glyphicon glyph="book"/>,
        action: activateCatastoOpenPanel.bind(null)
    }
};

export default burgerMenuContainer;
