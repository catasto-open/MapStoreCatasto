/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import Button from '@mapstore/components/misc/Button';

export default ({
    position = 'right',
    onClose,
    bsStyle = 'default',
    title = '',
    additionalRows,
    onReduce = () => {}
}) => {
    const closeButton = !onClose ? null : (
        <Button key="ms-header-close" className="square-button ms-close" onClick={onClose} bsStyle={bsStyle}>
            <Glyphicon glyph="1-close"/>
        </Button>
    );
    const glyphButton = (<Button
        key="ms-header-glyph"
        className="square-button"
        bsStyle={bsStyle}
        onClick={onReduce}>
        <Glyphicon glyph={'chevron-right'}/>
    </Button>);
    const buttons = position === 'left' ? [closeButton, glyphButton] : [glyphButton, closeButton];
    return (
        <Grid fluid style={{width: '100%'}} className={'ms-header ms-' + bsStyle}>
            <Row>
                <Col xs={2}>
                    {buttons[0]}
                </Col>
                <Col xs={8}>
                    <h4>{title}</h4>
                </Col>
                <Col xs={2}>
                    {buttons[1]}
                </Col>
            </Row>
            {additionalRows}
        </Grid>
    );
};
