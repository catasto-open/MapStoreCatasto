import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';

const DatiStorico = props => {
    return (
        Object.keys(props.dataVisuraJson?.titolari_storico).map(
            (dateBlock, index) =>
                dateBlock !== 0 &&
                    !isNil(props.dataVisuraJson?.titolari_storico[dateBlock]) &&
                    props.dataVisuraJson?.titolari_storico[dateBlock][0] !== undefined ? (
                        <div key={index}>
                            <h3>INTESTATI fino alla data {dateBlock}</h3>
                            <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "20%" }}>Nominativo</th>
                                        <th style={{ width: "20%" }}>Codice fiscale</th>
                                        <th style={{ width: "20%" }}>Diritti e oneri reali</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.dataVisuraJson?.titolari_storico[
                                        dateBlock
                                    ].map((el, mindex) => (
                                        <React.Fragment key={mindex}>
                                            <tr>
                                                <td className="value_colspanned">{el?.nominativo}</td>
                                                <td className="value_colspanned">
                                                    {el?.codice_fiscale}
                                                </td>
                                                <td className="value_colspanned">
                                                    {el?.titolo} {el?.quota}
                                                </td>
                                            </tr>
                                            <tr key={`${mindex}-1`}>
                                                <td className="label_colspanned">Dalla data</td>
                                                <td colSpan="2" className="value_colspanned">
                                                    {el?.data_decorrenza}
                                                </td>
                                            </tr>
                                            <tr key={`${mindex}-2`}>
                                                <td className="label_colspanned">Derivanti da</td>
                                                <td colSpan="2" className="value_colspanned">
                                                    {el?.derivanti_da}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>) : null)
    );
};

DatiStorico.propTypes = {
    dataVisuraJson: PropTypes.object
};

DatiStorico.defaultProps = {
    dataVisuraJson: {}
};

export default DatiStorico;
