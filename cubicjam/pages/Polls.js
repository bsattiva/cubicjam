import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import TopPanel from '../components/TopPanel';

import Translations from '../resources/Translations.js';
const buttons = ['createPoll','myPolls'];

const Polls = () => {
    return (
        <div  className='page-container'>
            <TopPanel buttons={buttons}/>
        </div>
    )
}

export default Polls;