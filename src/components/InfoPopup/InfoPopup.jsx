import React from 'react';
import success from '../../images/success.svg';
import failed from '../../images/failed.svg';
import { usePopupClose } from '../../hooks/usePopupClose';
import './InfoPopup.css'

function InfoPopup({ isOpen, code, msg }) {

    const isSuccess = code < 300;
    // usePopupClose(isOpen, onClose);

    return isOpen && (
        <div className='info-popup info-popup_opened'>
            <div className='info-popup__containter'>
                <img
                    className={'info-popup__image'}
                    src={isSuccess ? success : failed}
                    alt="Успех или неудача"
                />
                <h2 className={'info-popup__msg'}>{isSuccess ? '' : msg}</h2>
                <button className="info-popup__close" type="button" />
            </div>
        </div>
    )
}

export default InfoPopup;