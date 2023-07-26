import React from 'react';
import './LoadingPopup.css'

function LoadingPopup({ isOpen }) {

    return isOpen && (
        <div className='preloader preloader_opened'>
            <div className="preloader__popup">
                <div className="preloader__container">
                    <span className="preloader__round"></span>
                </div>
            </div>
        </div>
    )
}

export default LoadingPopup;