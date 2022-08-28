import React, { useState } from 'react';
import ReactToPrint from "react-to-print";
import {Form, Row, Navbar, Container, Button, Col} from 'react-bootstrap';

import Template from './Template';

let InputArea = (props) => {
    return (
        <Form className="my-2">
            <Form.Label htmlFor="yazi">{props.order}</Form.Label>
            <Form.Control
                id="yazi"
                as="textarea"
                placeholder="Yaziyi yazin"
                style={{ height: '100px' }}
                onChange={props.onChange}
            />
        </Form>
    )
}

const defaults = [
    "Etiket 1 - On",
    "Etiket 1 - Arka",
    "Etiket 2 - On",
    "Etiket 2 - Arka",
    "Etiket 3 - On",
    "Etiket 3 - Arka",
    "Etiket 4 - On",
    "Etiket 4 - Arka",
]

let App = () => {
    const [inputValues, setInputValues] = useState(defaults);
    const templateRef = React.useRef(null);

    let entryBoxes = [];
    for (var i=0; i < 8; i++) {
        entryBoxes.push('textbox' + i);
    }

    let onChange = (event, index) => {
        let tempInputValues = [...inputValues]
        if (!event.currentTarget.value)
            tempInputValues[index] = defaults[index];
        else
            tempInputValues[index] = event.currentTarget.value;
        setInputValues(tempInputValues);
    }

    return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container fluid>
            <Navbar.Brand href="#home">Yaya Stuff</Navbar.Brand>
        </Container>
    </Navbar>
    <Container fluid className="my-3">
    <Row>
        <Col xs={4}>
        {entryBoxes.map((entryBox, index) =>
            <InputArea onChange={(event) => onChange(event, index)} key={entryBox} order={defaults[index]}/>
        )}
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => templateRef.current}
        />
        </Col>
        <Col xs={8} id="print-content" >
            <div ref={templateRef}>
                <Template input={inputValues}/>
            </div>
        </Col>
    </Row>
    </Container>
    </>
    );
}

export default App;