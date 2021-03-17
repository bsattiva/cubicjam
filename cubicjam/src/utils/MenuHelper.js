import React from 'react'

const collapse = (element, nav, svg) => {
    
    element.style.visibility = 'hidden';
    nav.insertBefore(element, svg);

}

export default collapse;