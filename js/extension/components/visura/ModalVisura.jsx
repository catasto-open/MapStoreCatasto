import React from 'react';
import PropTypes from 'prop-types';
import Portal from '@mapstore/components/misc/Portal';
import ResizableModal from '@mapstore/components/misc/ResizableModal';
import { Grid } from 'react-bootstrap';
import Message from "@mapstore/components/I18N/Message";
import isNil from 'lodash/isNil';
import '@js/extension/assets/visura.css';
import { DatiCatastali, DatiFabStorico, DatiFabAttuali, DatiTerStorico, DatiTerAttuali, DatiStorico } from '@js/extension/components/visura/dati';

const ModalVisura = props => {
    const isthereDatiCatastali = () => !isNil(props.dataVisuraJson?.foglio) || !isNil(props.dataVisuraJson?.particella) || !isNil(props.dataVisuraJson?.subalterno);
    return (
        <>
            <Portal key={props.id}>
                <ResizableModal
                    title="Visura"
                    show={props.show}
                    clickOutEnabled={false}
                    showClose
                    showFullscreen
                    draggablebodyClassName="ms-flex modal-properties-container"
                    fitContent
                    buttons={[{
                        text: <Message msgId="close" />,
                        onClick: props.onClose
                    }]}
                    onClose={props.onClose}>
                    <Grid>
                        <div className="red-line">&nbsp;</div>
                        <h1>Visura {props.queryObjDataVisuraJson?.flagricercastorica ? "storica" : ""}  per {props.queryObjDataVisuraJson?.tipoimmobile === "T" ? "Terreno" : "Fabbricato"}</h1>
                        {isthereDatiCatastali() ?
                            <>
                                <DatiCatastali dataVisuraJson={props.dataVisuraJson} />

                                {!isNil(props.dataVisuraJson?.dati_catastali_fabbricato_attuali) ?
                                    <DatiFabAttuali dataVisuraJson={props.dataVisuraJson} />
                                    : null}

                                {!isNil(props.dataVisuraJson?.dati_catastali_terreno_attuali) ?
                                    <DatiTerAttuali dataVisuraJson={props.dataVisuraJson} />
                                    : null}
                                {props.queryObjDataVisuraJson?.flagricercastorica ?
                                    (
                                        <React.Fragment>
                                            <br />
                                            <h2>Dati dello storico</h2>
                                            {!isNil(props.dataVisuraJson?.titolari_storico) ? <DatiStorico dataVisuraJson={props.dataVisuraJson} /> : null}
                                            {props.dataVisuraJson?.dati_catastali_fabbricato_storico ? <DatiFabStorico dataVisuraJson={props.dataVisuraJson} /> : null}
                                            {!isNil(props.dataVisuraJson?.dati_catastali_terreno_storico) ? <DatiTerStorico dataVisuraJson={props.dataVisuraJson} /> : null}
                                        </React.Fragment>
                                    ) : null}
                            </>
                            : null
                        }
                    </Grid>
                </ResizableModal>
            </Portal>
        </>
    );
};

ModalVisura.propTypes = {
    id: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    dataVisuraJson: PropTypes.object,
    queryObjDataVisuraJson: PropTypes.object
};

ModalVisura.defaultProps = {
    id: "data-visura-json",
    show: false,
    onClose: () => { },
    dataVisuraJson: {},
    queryObjDataVisuraJson: {}
};

export default ModalVisura;
