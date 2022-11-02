import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ButtonB from '@mapstore/components/misc/Button';
import tooltip from '@mapstore/components/misc/enhancers/tooltip';
import { Glyphicon, Grid, Table } from 'react-bootstrap';
import Portal from '@mapstore/components/misc/Portal';
import ResizableModal from '@mapstore/components/misc/ResizableModal';
import Message from "@mapstore/components/I18N/Message";


const Button = tooltip(ButtonB);

const ModalSearchResultGrid = props => {
    const [show, setShow] = useState(false);
    const handleHidden = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };
    const filteredColumns = props.columns.filter((item) => (item.key !== "selectButton"));
    return (
        <>
            <Button
                onClick={handleShow}
            >
                <Glyphicon glyph={"new-window"}/>
            </Button>
            <Portal key={props.id}>
                <ResizableModal
                    title={<Message msgId={props.id}/>}
                    show={show}
                    clickOutEnabled={false}
                    bodyClassName="ms-flex modal-properties-container"
                    fitContent
                    buttons={[{
                        text: <Message msgId="close"/>,
                        onClick: handleHidden
                    }]}
                    onClose={handleHidden}
                    showClose
                    showFullscreen
                    draggable>
                    <Grid fluid>
                        <div className="ms-map-properties" style={{margin: 20}}>
                            <Table striped bordered condensed hover>
                                <thead style={{backgroundColor: "#dddddd"}}>
                                    <tr>
                                        {filteredColumns.map((r) => (
                                            <th key={r.key}>
                                                {r.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.rows.map((c, index) => (
                                        <tr key={index}>
                                            {filteredColumns.map((r) => (
                                                <td key={r.key}>
                                                    {c[r.key]}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Grid>
                </ResizableModal>
            </Portal>
        </>
    );
};

ModalSearchResultGrid.propTypes = {
    id: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array
};

ModalSearchResultGrid.defaultProps = {
    id: "",
    columns: [],
    rows: []
};

export default ModalSearchResultGrid;
