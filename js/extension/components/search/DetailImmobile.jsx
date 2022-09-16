import React from 'react';
import { Table } from 'react-bootstrap';
import Message from '@mapstore/components/I18N/Message';

const DetailImmobile = (props) => {
    const pType = props.selectedImmobile?.propertyType === "T" ? "landDetails" : "buildingDetails";
    return (
        <div className="shadow p-3 mb-5 bg-white rounded" style={{paddingTop: 30}}>
            <p className="text-center">
                <Message className="font-weight-bold" msgId={`extension.catastoOpenPanel.${pType}.name`} />
            </p>
            <Table striped>
                <tbody>
                    {Object.keys(props.selectedImmobile).map(
                        (item) => (
                            <tr key={item}>
                                <th><Message msgId={`extension.catastoOpenPanel.${pType}.columns.${item}`} /></th>
                                <td>{props.selectedImmobile[item]}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default DetailImmobile;
