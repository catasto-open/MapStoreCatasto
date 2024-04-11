import React from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';


const DatiCatastali = props => {
    return (
        <React.Fragment>
            <h3>DATI CATASTALI</h3>
            <table className="styled-table">
                <thead>
                    <tr >
                        <th style={{ width: '20%' }}>Foglio</th>
                        <th style={{ width: '20%' }}>Particella</th>
                        <th style={{ width: '20%' }}>Subalterno</th>
                        <th style={{ width: '20%' }}>Attualit&agrave;</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{isNil(props.dataVisuraJson?.foglio) ? "" : props.dataVisuraJson?.foglio}</td>
                        <td>{isNil(props.dataVisuraJson?.particella) ? "" : props.dataVisuraJson?.particella}</td>
                        <td>{isNil(props.dataVisuraJson?.subalterno) ? "" : props.dataVisuraJson?.subalterno}</td>
                        {isNil(props.dataVisuraJson?.data_fine) ? <td>No</td> : <td>S&igrave;</td>}
                    </tr>
                </tbody>
            </table>

            <h3>INTESTATI ATTUALI</h3>
            {!isNil(props.dataVisuraJson?.titolari_attuali) ?
                (
                    isNil(props.dataVisuraJson?.titolari_attuali[1]) ? <p>Dato non presente</p> :
                        <table className="styled-table">
                            <thead>
                                <tr >
                                    <th style={{ width: '20%' }}>Nominativo</th>
                                    <th style={{ width: '20%' }}>Codice fiscale</th>
                                    <th style={{ width: '20%' }}>Diritti e oneri reali</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.dataVisuraJson?.titolari_attuali[0].map((el, index) => (
                                        <>
                                            <tr key={index}>
                                                <td>{el?.nominativo}</td>
                                                <td>{el?.codice_fiscale}</td>
                                                <td>{el?.titolo} {el?.quota}</td>
                                            </tr>
                                            <tr key={`${index}-${index}`}>
                                                <td className="label_colSpanned">Derivanti da</td>
                                                <td colSpan="2" className="value_colSpanned">{el.derivanti_da}</td>
                                            </tr>
                                        </>
                                    )
                                    )
                                }
                            </tbody>
                        </table>
                ) : <p>Dato non presente</p>
            }
        </React.Fragment>
    );
};

DatiCatastali.propTypes = {
    dataVisuraJson: PropTypes.object
};

DatiCatastali.defaultProps = {
    dataVisuraJson: {}
};

export default DatiCatastali;
