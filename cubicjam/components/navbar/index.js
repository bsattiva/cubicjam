import logo from '../../images/logo.png';
import React from 'react';
import {Nav, NavLink, Bars, NavBtn, NavBtnLink, NavMenu} from './Navbar.js';
import Sidebar from './Sidebar.js';
import './Navbar.css';
import collapse from '../../utils/MenuHelper.js';
import Translations from '../../resources/Translations.js';



const expand = () => {
    let sidebar = document.getElementById("menu");
    let nav = document.querySelector("div#root>nav");
    let root = document.getElementById('root');
    console.log(sidebar.style.visibility);
    
    if (sidebar.style.visibility === 'hidden' || sidebar.style.visibility === '') {
        sidebar.style.visibility = 'visible';
      //  root.insertBefore(sidebar, document.querySelector(".page-container"));
        root.insertBefore(sidebar, document.getElementById("cont-area"));
    } else {
 
        collapse(sidebar, nav, document.querySelector('svg[stroke]'));

    }
    
}



window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
 
        if (window.document.getElementById('menu').style.visibility === 'visible') {
             
            collapse(window.document.getElementById("menu"), 
            window.document.querySelector("div#root>nav"), 
            window.document.querySelector('svg[stroke]'));
        }
        
    }
});

 

const Navbar = () => {

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img src={logo} alt='veriboy logo' className="logo"></img>
                </NavLink>
                <Bars onClick={expand}></Bars>
                <Sidebar />
                <NavMenu>
                    <NavLink to="/about">
                        {Translations.about}
                    </NavLink>
                    <NavLink to="/polls">
                        {Translations.polls}
                    </NavLink>
                    <NavLink to="/News">
                        {Translations.news}
                    </NavLink>
                    <NavLink to="/Town">
                        {Translations.town}
                    </NavLink>
                    <NavLink to="/Login">
                        {Translations.signin}
                    </NavLink>
                </NavMenu>

            </Nav>
        </>
    )
}

export default Navbar;
