import React from 'react'

const Text = (props) => {

    const marTop = {
        marginTop: '10px'
    }

    return (
        <div style={marTop} data-id="text">
            <input placeholder={props.placeholder} type="text" pattern="[a-zA-Z][a-zA-Z0-9-_.]{1,20}" id={props.id} className="form-control form-control-lg"/>
        </div>
    )
}

export default Text
