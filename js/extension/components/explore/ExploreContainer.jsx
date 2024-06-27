import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Row, Col, Alert, Panel } from 'react-bootstrap';
import ButtonB from '@mapstore/components/misc/Button';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';
import Message from "@mapstore/components/I18N/Message";
import {
    baseLayersErrorSelector,
    baseLayersSelector,
    isfabClickedSelector,
    isterClickedSelector,
    selectedFabLayersSelector,
    selectedTerLayersSelector
} from '@js/extension/selectors/catastoOpen';
import { onFabBtnClicked, onFabSelectionLoadDetail, onRemoveFabLayer, onRemoveTerLayer, onSelectionExploreCancel, onTerBtnClicked, onTerSelectionLoadDetail } from '@js/extension/actions/catastoOpen';
import { SelectedLayerItem } from './SelectedLayerItem';
import { mapSelector } from '@mapstore/selectors/map';

const Button = tooltip(ButtonB);


const styles = {
    container: {
        marginBottom: "20px"
    },
    errorContainer: {
        margin: '30px',
        display: 'flex',
        justifyContent: 'center'
    },
    layerContainer: {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        margin: '50px'
    }
};

const ExploreContainer = ({
    errorMsg,
    baseLayers,
    onFabClicked,
    fabClicked,
    onTerClicked,
    terClicked,
    selectedFabLayers,
    selectedTerLayers,
    removeFabLayer,
    removeTerLayer,
    onFabSeletionDetailLoad,
    onTerSeletionDetailLoad,
    actualMap,
    onExploreCancel
}) => {
    const [actualZoom, setActualZoom] = useState(0);
    useEffect(() => {
        setActualZoom(actualMap?.zoom);
    }, [actualMap]);

    if (errorMsg) {
        return (
            <div style={styles.errorContainer}>
                <Alert bsStyle="warning">
                    <strong>Error: </strong>{errorMsg}
                </Alert>
            </div>
        );
    }

    if (actualZoom < 17) {
        return (
            <div style={styles.errorContainer}>
                <Alert bsStyle="warning">
                    <strong>Info: </strong>  <Message msgId={"extension.catastoOpenPanel.explore.zoomMsgInfo"} />
                </Alert>
            </div>
        );
    }

    const renderHeader = () => {
        return (
            <div>
                <div className="pull-left">
                    <Message msgId="extension.catastoOpenPanel.explore.title" />
                </div>
            </div>);
    };
    const renderButtonSelect = () => {
        return (<Row style={styles.container}>
            <Col xs={6} className="text-center">
                <Button
                    disabled={baseLayers && !baseLayers.fabStatus}
                    bsStyle={fabClicked ? "warning" : "primary"}
                    tooltipId={fabClicked ? "extension.catastoOpenPanel.explore.btn.cancel" : "extension.catastoOpenPanel.explore.btn.fab"}
                    tooltipPosition={"top"}
                    onClick={onFabClicked}
                >
                    <Message msgId={fabClicked ? "extension.catastoOpenPanel.explore.btn.cancel" : "extension.catastoOpenPanel.explore.btn.fab"} />
                </Button>
            </Col>
            <Col xs={6} className="text-center">
                <Button
                    disabled={baseLayers && !baseLayers.terStatus}
                    bsStyle={terClicked ? "warning" : "primary"}
                    tooltipId={terClicked ? "extension.catastoOpenPanel.explore.btn.cancel" : "extension.catastoOpenPanel.explore.btn.ter"}
                    tooltipPosition={"top"}
                    onClick={onTerClicked}
                >
                    <Message msgId={terClicked ? "extension.catastoOpenPanel.explore.btn.cancel" : "extension.catastoOpenPanel.explore.btn.ter"} />
                </Button>
            </Col>
        </Row>);
    };
    const renderFabSelectedItem = () => {
        if (fabClicked && selectedFabLayers.length !== 0) {
            return (<div style={styles.layerContainer}>
                {selectedFabLayers.map((layer) =>
                    (<SelectedLayerItem layer={layer} key={layer.id} onDelete={removeFabLayer} />)
                )}
            </div>);
        }
        return null;
    };
    const renderTerSelectedItem = () => {
        if (terClicked && selectedTerLayers.length !== 0) {
            return (<div style={styles.layerContainer}>
                {selectedTerLayers.map((layer) =>
                    (<SelectedLayerItem layer={layer} key={layer.id} onDelete={removeTerLayer} />)
                )}
            </div>);
        }
        return null;
    };
    const renderSubmitFabButton = () => {
        if (fabClicked && selectedFabLayers.length !== 0) {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    height: '100%',
                    padding: '20px',
                    boxSizing: 'border-box'
                }}>
                    <Button
                        bsStyle={"primary"}
                        tooltipId={"extension.catastoOpenPanel.explore.btn.submit"}
                        tooltipPosition={"top"}
                        onClick={onFabSeletionDetailLoad}
                    >
                        <Message msgId={"extension.catastoOpenPanel.explore.btn.submit"} />
                    </Button>

                    <Button
                        bsStyle={"warning"}
                        tooltipId={"extension.catastoOpenPanel.explore.btn.cancel"}
                        tooltipPosition={"top"}
                        onClick={onExploreCancel}
                    >
                        <Message msgId={"extension.catastoOpenPanel.explore.btn.cancel"} />
                    </Button>
                </div>);
        }
        return null;
    };
    const renderSubmitTerButton = () => {
        if (terClicked && selectedTerLayers.length !== 0) {
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    height: '100%',
                    padding: '20px',
                    boxSizing: 'border-box'
                }}>
                    <Button
                        bsStyle={"primary"}
                        tooltipId={"extension.catastoOpenPanel.explore.btn.submit"}
                        tooltipPosition={"top"}
                        onClick={onTerSeletionDetailLoad}
                    >
                        <Message msgId={"extension.catastoOpenPanel.explore.btn.submit"} />
                    </Button>

                    <Button
                        bsStyle={"warning"}
                        tooltipId={"extension.catastoOpenPanel.explore.btn.cancel"}
                        tooltipPosition={"top"}
                        onClick={onExploreCancel}
                    >
                        <Message msgId={"extension.catastoOpenPanel.explore.btn.cancel"} />
                    </Button>
                </div>);
        }
        return null;
    };
    return (
        <div className="query-filter-container">
            <Panel
                className="mapstore-switch-panel"
                header={renderHeader()}
                collapsible expanded
            >
                {renderButtonSelect()}
                {renderFabSelectedItem()}
                {renderTerSelectedItem()}
                {renderSubmitFabButton()}
                {renderSubmitTerButton()}
            </Panel>
        </div>
    );
};

const ExploreContainerSelector = createStructuredSelector({
    baseLayers: baseLayersSelector,
    errorMsg: baseLayersErrorSelector,
    fabClicked: isfabClickedSelector,
    terClicked: isterClickedSelector,
    selectedFabLayers: selectedFabLayersSelector,
    selectedTerLayers: selectedTerLayersSelector,
    actualMap: mapSelector
});
const SmartExploreContainer = connect(
    ExploreContainerSelector,
    {
        onFabClicked: onFabBtnClicked,
        onTerClicked: onTerBtnClicked,
        removeFabLayer: onRemoveFabLayer,
        removeTerLayer: onRemoveTerLayer,
        onFabSeletionDetailLoad: onFabSelectionLoadDetail,
        onTerSeletionDetailLoad: onTerSelectionLoadDetail,
        onExploreCancel: onSelectionExploreCancel
    }
)(ExploreContainer);
export default SmartExploreContainer;
