import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Translations from '../resources/Translations.js';


 
const key = (i) => {
    return 'key_' + i;
}

const getLength = (count) => {
    //return ((12 / count) > 4 ) ? 4 : 12/count;
    return 2;
}

const TopPanel = (props) => {
    var bs = [];    
const buttonsLength = props.buttons.length;
let length = getLength(buttonsLength);

const rowStyle = {
    margin: "20px"
}

const buttonStyle = {
    width: '120px',
    height: '50px',
    background: 'green' 
}




    for (var i = 0; i < buttonsLength; i++) {

    let path = "/" + props.buttons[i];
        bs.push(
            
            <Col md lg={length} key={key(i)}>
                    <Button style = {buttonStyle} onClick={() => {document.location.href=path}}>{Translations[props.buttons[i]]}</Button>
            </Col>
        )

        }
    return (
        <Container>
            <Row style={rowStyle}>
                {bs}
            </Row>
        </Container>
    )

}

export default TopPanel;