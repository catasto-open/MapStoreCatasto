import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';


const DatiTerAttuali = props => {
    return (
        <React.Fragment>
            <h3>DATI TERRENO</h3>
            {props.dataVisuraJson?.dati_catastali_terreno_attuali.map((el, index) => (
                <React.Fragment key={index}>
                    <h4>Situazione immobile alla data: {el.gen_data_reg}</h4>
                    <table className="styled-table">
                        <thead>
                            <tr >
                                <th style={{ width: "5%", verticalAlign: "top" }} rowSpan="3" className="second_row">Numero</th>
                                <th style={{ width: "30%" }} colSpan="4" className="second_row">Dati identificativi</th>
                                <th style={{ width: "45%" }} colSpan="6" className="second_row">Dati classamento</th>
                                <th style={{ width: "20%", verticalAlign: "top" }} rowSpan="3" className="second_row">Dati derivanti da</th>
                            </tr>
                            <tr >
                                <th style={{ verticalAlign: "top" }} rowSpan="2">Sezione</th>
                                <th style={{ verticalAlign: "top" }} rowSpan="2">Foglio</th>
                                <th style={{ verticalAlign: "top" }} rowSpan="2">Particella</th>
                                <th style={{ verticalAlign: "top" }} rowSpan="2">Sub.</th>
                                <th style={{ verticalAlign: "top" }} rowSpan="2">Qualit&agrave; classe</th>
                                <th className="second_row" colSpan="3">Superficie</th>
                                <th className="second_row" colSpan="2">Reddito</th>
                            </tr>
                            <tr >
                                <th>ha</th>
                                <th>are</th>
                                <th>ca</th>
                                <th>Dominicale</th>
                                <th>Agrario</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>{el?.progressivo}</td>
                                <td>{el?.sezione}</td>
                                <td>{el?.foglio}</td>
                                <td>{el?.particella}</td>
                                <td>{el?.subalterno}</td>
                                <td>{el?.qualita} {el?.classe}</td>
                                <td>{el?.superfice_ha}</td>
                                <td>{el?.superfice_are}</td>
                                <td>{el?.superfice_ca}</td>
                                <td>{!isNil(el?.reddito_dominicale) ? `Euro ${el?.reddito_dominicale}` : ""}</td>
                                <td>{!isNil(el?.reddito_agrario) ? `Euro ${el?.reddito_agrario}` : ""}</td>
                                <td>{el?.derivanti_da}</td>
                            </tr>
                            {!isNil(el?.annotazioni) ?
                                <tr >
                                    <td colSpan="5" className="label_colSpanned">Annotazioni</td>
                                    <td colSpan="8" className="value_colSpanned">{el?.annotazioni}</td>
                                </tr>
                                : null}
                            {!isNil(el?.partita) ?
                                <tr >
                                    <td colSpan="5" className="label_colSpanned">Partita</td>
                                    <td colSpan="8" className="value_colSpanned">{el?.partita}</td>
                                </tr>
                                : null}
                            {el?.qualita === 'SOPPRESSO' && !isNil(el?.eredi) ?
                                (<tr >
                                    <td colSpan="5" className="label_colSpanned">La soppressione ha generato i seguenti immobili</td>
                                    <td colSpan="8" className="value_colSpanned">
                                        {el?.eredi.map((erede, mindex) => (
                                            <p key={mindex}>
                                                {`[Foglio: ${erede?.foglio} Particella: ${erede?.particella}]`}
                                            </p>
                                        ))}
                                    </td>
                                </tr>)
                                : !isNil(el?.eredi) ? (<tr >
                                    <td colSpan="5" className="label_colSpanned">La variazione ha generato i seguenti immobili</td>
                                    <td colSpan="8" className="value_colSpanned">
                                        {el?.eredi.map((erede, mindex) => (
                                            <p key={mindex}>
                                                {`[Foglio: ${erede?.foglio} Particella: ${erede?.particella}]`}
                                            </p>
                                        ))}
                                    </td>
                                </tr>) : null
                            }
                        </tbody>
                    </table>
                </React.Fragment>
            ))}
        </React.Fragment>
    );
};

DatiTerAttuali.propTypes = {
    dataVisuraJson: PropTypes.object
};

DatiTerAttuali.defaultProps = {
    dataVisuraJson: {}
};

export default DatiTerAttuali;
