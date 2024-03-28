import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';

const DatiFabStorico = props => {
    return (
        props.dataVisuraJson?.dati_catastali_fabbricato_storico.map((el, index) => (
            <React.Fragment key={index}>
                <h3>DATI IMMOBILE alla data: {el?.gen_data_reg}</h3>
                <table className="styled-table">
                    <thead>
                        <tr >
                            <th style={{ width: "5%", verticalAlign: "top" }} rowSpan="2" className="second_row">Numero</th>
                            <th style={{ width: "30%" }} colSpan="4" className="second_row">Dati identificativi</th>
                            <th style={{ width: "45%" }} colSpan="7" className="second_row">Dati classamento</th>
                            <th style={{ width: "5%", verticalAlign: "top" }} rowSpan="2" className="second_row">Dati derivanti da</th>
                        </tr>
                        <tr >
                            <th>Sezione</th>
                            <th>Foglio</th>
                            <th>Particella</th>
                            <th>Sub.</th>
                            <th>Zona cens.</th>
                            <th>Micro zona</th>
                            <th>Categoria</th>
                            <th>Classe</th>
                            <th>Consistenza</th>
                            <th>Superficie catastale</th>
                            <th>Rendita</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
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
                            <td>{!isNil(el?.superficie) ? `${el?.superficie} mq` : ' '}</td>
                            <td>{!isNil(el?.rendita) ? `Euro ${el?.rendita}` : ' '}</td>
                            <td>{el?.derivanti_da}</td>
                        </tr>
                        <tr >
                            <td colSpan="5" className="label_colspanned">Indirizzo</td>
                            <td colSpan="8" className="value_colspanned">{el?.indirizzo}</td>
                        </tr>
                        {!isNil(el?.annotazioni) ?
                            <tr>
                                <td colSpan="5" className="label_colspanned">Annotazioni</td>
                                <td colSpan="8" className="value_colspanned">{el?.annotazioni}</td>
                            </tr>
                            : null}
                        {!isNil(el?.partita) ?
                            <tr>
                                <td colSpan="5" className="label_colspanned">Partita</td>
                                <td colSpan="8" className="value_colspanned">{el?.partita}</td>
                            </tr>
                            : null}
                        {(!isNil(el?.partita) && el?.partita === 'SOPPRESSA' && !isNil(el?.eredi)) ?
                            (<tr>
                                <td colSpan="5" className="label_colspanned">La soppressione ha generato i seguenti immobili</td>
                                <td colSpan="8" className="value_colspanned">
                                    {el?.eredi.map((erede, mindex) => (
                                        <p key={mindex}>
                                            {`[Foglio: ${erede?.foglio} Particella: ${erede?.particella} Sub.: ${erede?.subalterno}]`}
                                        </p>
                                    ))}
                                </td>
                            </tr>)
                            : null}
                        {!isNil(el?.utilita) ?
                            (<tr >
                                <td colSpan="5" className="label_colspanned">Utilit&agrave; comune di</td>
                                <td colSpan="8" className="value_colspanned">
                                    {el?.utilita.map((utile, mindex) => (
                                        <p key={mindex}>
                                            {`[Foglio: ${utile?.foglio} Particella: ${utile?.particella} Sub.: ${utile?.subalterno}]`}
                                        </p>
                                    ))}
                                </td>
                            </tr>)
                            : null}
                    </tbody>
                </table>
            </React.Fragment>
        ))
    );
};

DatiFabStorico.propTypes = {
    dataVisuraJson: PropTypes.object
};

DatiFabStorico.defaultProps = {
    dataVisuraJson: {}
};

export default DatiFabStorico;
