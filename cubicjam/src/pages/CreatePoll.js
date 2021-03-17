
import React, {useState} from "react";
import * as AiIcons from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Translations from '../resources/Translations.js';
import cropRequest from '../utils/ApiHelper.js';
import Text from '../components/forms/Text';
import ButtonPanel from '../components/forms/ButtonPanel';
import ReactDOMServer from 'react-dom/server';
import './page.css';
import { load } from "webfontloader";
import { FaSnowman } from "react-icons/fa";
 

const close = (file, img) => {
 
     file.value = "";
     img.src = "";
     img.style.visibility = 'hidden';
     document.getElementById('close-cont').style.visibility = 'hidden';
}




 

const loadImage = (loader) =>{
   var preview = document.getElementById('preview');
   document.querySelector('div#image-error>span').innerHTML = "";

    var image;
    if (loader.files.length > 0) {
        image = loader.files[0];
    }

    
    
    var reader = new FileReader();
    var defaultReader = new FileReader();
    
    reader.onloadend = () => {
        console.log('RESULT: ' + reader.result);
            if (reader.result === 'data:') {
                preview.style.visibility = 'hidden';
                document.getElementById('close-cont').style.visibility = 'hidden';
                document.querySelector('div#image-error>span').innerHTML = Translations.errors.tooSmallImage;
               loader.value = '';

            }
            preview.src = reader.result;
       
        
    }

    defaultReader.onloadend = () => {
        if (reader.result.byteLength < 150) {
        preview.src = defaultReader.result;

        console.log('DEFAULT: ' + reader.result);}
    }

    var crop = cropRequest('http://localhost:8060/crop', image);
    crop.then((result) => {

        if (result) {
            
            reader.readAsDataURL(result);
            
        } else {
            
            defaultReader.readAsDataURL(image);
        }
        
       
        preview.style.visibility = 'visible';
        document.getElementById('close-cont').style.visibility = 'visible';


    })


}


const validate = (field, error, mandatory, max) => {
    let text = field.value;
    let valid = true;
    if (mandatory && text.trim().length == 0 )  {
        error.innerHTML = Translations.errors.mandatory;
        valid = false;
    }

    return valid;
}

const submit = () => {
    let name = document.getElementById("name");
    if (validate(name, document.getElementById("name-error"), true, 30)) {
        
    } else {
        console.log("invalid");
    }
    
}
const cancel = () => {}

const buttons = [
    {
        id: "submit",
        value: Translations.pages.createPoll.labels.submit,
        onclick: submit,
        variant: "success"
    },
    {
        id: "cancel",
        value: Translations.pages.createPoll.labels.cancel,
        onclick: cancel,
        variant: "danger"
    }
]

const CreatePoll = () => {

    const getId = (id, base) => {
        return base + id;
    }

    


    const addOption = () => {
        let cont = document.getElementById("options");
        
    
        let texts = cont.querySelectorAll("input[placeholder]");
        var last = 0;
        let regexp = /option(\d*)/;
        var id = texts[texts.length - 1].getAttribute("id");
        last = parseInt(id.match(regexp)[1]);
    
        var newText = document.createElement("div");
        newText.innerHTML = ReactDOMServer.renderToStaticMarkup(<Text id={getId(last + 1, 'option')} placeholder="option here"/>);

        cont.insertBefore(newText.querySelector("div[style]"), document.getElementById("add-option"));
        document.getElementById("deleteOption").style.visibility = 'visible';
        
    
    }

    const addProperty = () => {
        let cont = document.getElementById("properties");
     
    
        let texts = cont.querySelectorAll("input[placeholder]");
        var last = 0;
        let regexp = /property(\d*)/;
        var id = texts[texts.length - 1].getAttribute("id");
        last = parseInt(id.match(regexp)[1]);
    
        var newText = document.createElement("div");
        newText.innerHTML = ReactDOMServer.renderToStaticMarkup(<Text id={getId(last + 1, 'property')} placeholder="group here"/>);

        cont.insertBefore(newText.querySelector("div[style]"), document.getElementById("add-property"));
        document.getElementById("deleteProperty").style.visibility = 'visible';
    }
    

    const removeOption = () => {
        let cont = document.getElementById("options");
        let texts = cont.querySelectorAll("div[data-id='text']");

        if(texts.length > 2) {
            if(texts.length === 3) {
                document.getElementById("deleteOption").style.visibility = 'hidden';
            }
            texts[texts.length - 1].remove();
        }

    }

    const removeProperty = () => {
        let cont = document.getElementById("properties");
        let texts = cont.querySelectorAll("div[data-id='text']");

        if(texts.length > 2) {
            if(texts.length === 3) {
                document.getElementById("deleteProperty").style.visibility = 'hidden';
            }
            texts[texts.length - 1].remove();
        }

    }

    const style = {
        marginTop: '40px',
 
    }

    const styleSmall = {
        marginTop: '5px'
    }


    const textStyle = {
       // width: '700px'
    }

    const marTop = {
        marginTop: '10px'
    }


    const buttonStyle = {
        marginLeft: '10px',
        visibility: 'hidden'
    }


    return(
        <Container id='cont-area'>
        <Row>
        <Col md lg="4">
            <div style={style}>
                <h2>{Translations['createNewPoll']}</h2>
            </div>
            
        <div className="form-group" style={style}>
            <label htmlFor="name">{Translations.pages.createPoll.labels.pollName}</label>
            <input style={textStyle} type="text" id="name" className="form-control form-control-lg" />
        </div>
        <div id='name-error' className='field-error'>
                    <span></span>
            </div>

        <div className="form-group" style={styleSmall}>
            <label htmlFor="description">{Translations.pages.createPoll.labels.pollDescription}</label>
            <textarea style={textStyle} rows={6} type="text" id="desc" className="form-control form-control-lg" />
        </div>
        <div id='desc-error' className='error'>
                    <span></span>
            </div>
      </Col>
      <Col md lg="6">
      
        <div className='preview-panel' id='preview-image'>
            <div className='load-input'>
                <input id='image-loader' type='file' value={Translations['loadImg']} onChange={() => {
                    loadImage(document.getElementById('image-loader'))}}
                    ></input>
            </div>
            <img id='preview' alt='poll image' className='pre-image' ></img>
            <div id='close-cont' className='close-icon' onClick={() => {
                close(document.getElementById('image-loader'), 
                document.getElementById('preview'));
            }}>
                <AiIcons.AiFillCloseCircle />
            </div> 
            
        </div>
            <div id='image-error' className='error'>
                    <span></span>
            </div>
      </Col>
 
      </Row>
      <Row>
          <Col md lg="4">
          <div className="form-group" style={style} id="options">
              <label htmlFor="option-def">{Translations.pages.createPoll.labels.options}</label>
                <div className="label-row">
                    <AiIcons.AiFillExclamationCircle/>
                    <div className="hint">
                        {Translations.pages.createPoll.hints.options}
                    </div>
                
                </div>

                <Text id="option01" placeholder={Translations.pages.createPoll.placeholders.options} />
                <Text id="option02" placeholder={Translations.pages.createPoll.placeholders.altOption} />
  
               <div style={marTop} id="add-option" class="small-row">
                   <Button id="addOption" onClick={addOption}>+</Button>
                   <Button id="deleteOption" style={buttonStyle} onClick={removeOption}>-</Button>
               </div>
                
               <div id='options-error' className='error'>
                    <span></span>
               </div>

            </div> 
          </Col>

          <Col md lg="6">
          <div className="form-group" style={style} id="properties">
              <label htmlFor="option-def">{Translations.pages.createPoll.labels.audience}</label>
                <div className="label-row">
                    <AiIcons.AiFillExclamationCircle/>
                    <div className="hint">
                        {Translations.pages.createPoll.hints.audience}
                    </div>
                
                </div>
  
                <Text id="property01" placeholder={Translations.pages.createPoll.placeholders.resident} />
                <Text id="property02" placeholder={Translations.pages.createPoll.placeholders.ofAge} />
                 
                 
               <div style={marTop} id="add-property">
                   <Button id="addAudience" onClick={addProperty}>+</Button>
                   <Button id="deleteProperty" style={buttonStyle} onClick={removeProperty}>-</Button>
                   
               </div>
                
               <div id='properties-error' className='error'>
                    <span></span>
            </div>

            </div> 
          </Col>

      </Row>
 
          <ButtonPanel buttons={buttons} />
 
        </Container>
    )
}

export default CreatePoll
