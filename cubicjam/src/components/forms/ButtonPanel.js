import React from 'react'
import Button from 'react-bootstrap/Button';
import '../../pages/page.css';

const ButtonPanel = (props) => {

var buttons = [];
const style = {
 
    marginRight: "14px",
}

const buttonStyle = {
   
     background: 'green'
    
}

for (var i = 0; i < props.buttons.length; i++) {
    let button = props.buttons[i];
    buttons.push(<div style={style}><Button variant={button.variant} id={button.id} onClick={button.onclick}>{button.value}</Button></div>);
}


    return (
        <div className="flex-row">
            {buttons}
        </div>
    )
}

export default ButtonPanel
