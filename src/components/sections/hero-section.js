import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeroVideo from '../../static/assets/video/hero-video.mp4';

function HeroSection () {
 
    return(
        <div className="hero-section-wrapper">
            <video className="background-video" autoPlay loop muted>
                <source src={HeroVideo} type="video/mp4" />
            </video>

            <div className="text-wrapper">
                <p>
                    We offer you a space where you can organize your readings, track your progress in detail, and share reviews.
                    Register the books you've read and connect with a community that shares your passion for reading.
                </p>
            </div>

            <div className="icon-wrapper">
                <FontAwesomeIcon icon="angles-down" flip />
            </div>
          
        </div>
    )
}

export default HeroSection;
