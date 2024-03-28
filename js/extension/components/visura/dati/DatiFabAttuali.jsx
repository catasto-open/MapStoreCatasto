import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';


const DatiFabAttuali = props => {
    return (
        <React.Fragment>
            <h3>DATI IMMOBILE</h3>
            {props.dataVisuraJson?.dati_catastali_fabbricato_attuali.map((el, index) => (
                <React.Fragment key={index}>
                    <h4 >Situazione immobile alla data: {el?.gen_data_reg}</h4>
                    <table className="styled-table">
                        <tbody>
                            <tr className="styled-table-head">
                                <td style={{ width: "5%", verticalAlign: "top" }} rowSpan="2" className="second_row">Numero</td>
                                <td style={{ width: "30%" }} colSpan="4" className="second_row">Dati identificativi</td>
                                <td style={{ width: "45%" }} colSpan="7" className="second_row">Dati classamento</td>
                                <td style={{ width: "20%", verticalAlign: "top" }} rowSpan="2" className="second_row">Dati derivanti da</td>
                            </tr>
                            <tr className="styled-table-head">
                                <td>Sezione</td>
                                <td>Foglio</td>
                                <td>Particella</td>
                                <td>Sub.</td>
                                <td>Zona cens.</td>
                                <td>Micro zona</td>
                                <td>Categoria</td>
                                <td>Classe</td>
                                <td>Consistenza</td>
                                <td>Superficie catastale</td>
                                <td>Rendita</td>
                            </tr>
                            <tr>
                                <td>{el?.progressivo}</td>
                                <td>{el?.sezione}</td>
                                <td>{el?.foglio}</td>
                                <td>{el?.particella}</td>
                                <td>{el?.subalterno}</td>
                                <td>{el?.zona_censuaria}</td>
                                <td>{el?.microzona}</td>
                                <td>{el?.categoria}</td>
                                <td>{el?.classe}</td>
                                <td>{el?.consistenza}</td>
                                <td>{!isNil(el?.superficie) ? `${el?.superficie} mq` : ""}</td>
                                <td>{!isNil(el?.rendita) ? `Euro ${el.rendita}` : ""}</td>
                                <td>{el?.derivanti_da}</td>
                            </tr>
                            <tr>
                                <td colSpan="5" className="label_colSpanned">Indirizzo</td>
                                <td colSpan="8" className="value_colSpanned"> {el?.indirizzo}</td>
                            </tr>
                            {!isNil(el?.annotazioni) ?
                                <tr >
                                    <td colSpan="5" className="label_colSpanned">Annotazioni</td>
                                    <td colSpan="8" className="value_colSpanned">{el?.annotazioni}</td>
                                </tr>
                                : null}
                            {!isNil(el?.partita) ?
                                <>
                                    <tr >
                                        <td colSpan="5" className="label_colSpanned">Partita</td>
                                        <td colSpan="8" className="value_colSpanned">{el?.partita}</td>
                                    </tr>
                                    {el?.partita === 'SOPPRESSA' && !isNil(el?.eredi) ?
                                        <tr >
                                            <td colSpan="5" className="label_colSpanned">La soppressione ha generato i seguenti immobili</td>
                                            <td colSpan="8" className="value_colSpanned">
                                                {el?.eredi.map((er, mindex) => (
                                                    <p key={mindex}>
                                                        {`[Foglio: ${er?.foglio} Particella: ${er?.particella} Sub.: ${er?.subalterno}]`}
                                                    </p>
                                                ))
                                                }
                                            </td>
                                        </tr>
                                        : null}
                                </>
                                : null}
                            {!isNil(el?.utilita) ?
                                <tr >
                                    <td colSpan="5" className="label_colSpanned">Utilit&agrave; comune di</td>
                                    <td colSpan="8" className="value_colSpanned">
                                        {el?.utilita.map((ut, mindex) => (
                                            <p key={mindex}>
                                                {`[Foglio: ${ut?.foglio} Particella: ${ut?.particella} Sub.: ${ut?.subalterno}]`}
                                            </p>
                                        ))}
                                    </td>
                                </tr>
                                : null}
                        </tbody>
                    </table>
                </React.Fragment>
            ))
            }
        </React.Fragment>
    );
};

DatiFabAttuali.propTypes = {
    dataVisuraJson: PropTypes.object
};

DatiFabAttuali.defaultProps = {
    dataVisuraJson: {}
};

export default DatiFabAttuali;
