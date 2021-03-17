import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom';
import './Navbar.css';
import collapse from '../../utils/MenuHelper.js';
import Translations from '../../resources/Translations.js'
import ReactDOMServer from 'react-dom/server';


const collapseMenu = () => {
    collapse(window.document.getElementById("menu"), 
    window.document.querySelector("div#root>nav"), 
    window.document.querySelector('svg[stroke]'));
}


const Sidebar = () => {
const style = {
    float: 'right'
}
const itemStyle = {
    marginTop: '20px'
    // ,borderBottom: '0.8px dashed black'
}

const linkStyle = {
    textDecoration: 'none'
}

const key = (i) => {
    return 'key_' + i;
}

const menu = ['home', 'about', 'polls', 'signin'];    
const menuItems = [];
for (var i = 0; i<menu.length; i++) {
    let path = '/' + menu[i];
    menuItems.push(  <li className='nav-li' key={key(i)}> 
                    <Link to={path} style={linkStyle} onClick={collapseMenu} className='menu-bars'>
                    <span className="sideSpa">{Translations[menu[i]]}</span>
                    <AiIcons.AiFillEye style={style} />
                   </Link>
                   </li>
                   )
}


    return (
        <div id="menu" className='side-menu'>

            <nav className={'nav-menu'}>
                <ul className='nav-menu-items'>
                    {menuItems}

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
