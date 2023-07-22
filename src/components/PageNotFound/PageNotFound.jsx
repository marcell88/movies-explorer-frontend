import React from 'react';
import './PageNotFound.css';

function PageNotFound({ goBack }) {

    // Render

    return (

        <main className='page-not-found'>
            <h1 className='page-not-found__title'>404</h1>
            <p className='page-not-found__msg'>Страница не найдена</p>
            <button className='page-not-found__button' type='button' onClick={goBack}>Назад</button>
        </main>

    );

}

export default PageNotFound;