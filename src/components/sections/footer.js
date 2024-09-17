import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer () {

    const CurrentYear = () => {
        const currentYear = new Date().getFullYear();
        return <span>{currentYear}</span>;
    }
    
    return(
        <div className="footer-wrapper">
                <FontAwesomeIcon icon='copyright'/>
                <p>ETXELIT - ALL RIGHTS RESERVED <CurrentYear/></p>
        </div>
    )
}

export default Footer;

