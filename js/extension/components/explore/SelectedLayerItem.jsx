import React from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import ButtonB from '@mapstore/components/misc/Button';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';

const Button = tooltip(ButtonB);

const styles = {
    row: {
        marginBottom: '5px'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export const SelectedLayerItem = ({ layer, onDelete }) => {
    const handleDeleteClick = () => onDelete(layer.id);
    return (
        <Row className="show-grid" style={styles.row}>
            <Col xs={12} md={8}>
                <strong>{`Foglio: ${layer?.extras?.foglio}, Numero: ${layer?.extras?.numero}` }</strong>
            </Col>
            <Col xs={6} md={4} style={styles.center}>
                <Button
                    bsStyle="danger"
                    tooltipId="extension.catastoOpenPanel.explore.btn.delete"
                    tooltipPosition="top"
                    onClick={handleDeleteClick}
                >
                    <Glyphicon glyph="trash" />
                </Button>
            </Col>
        </Row>
    );
};
