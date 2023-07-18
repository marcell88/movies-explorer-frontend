import './Footer.css';

function Footer() {

    return (
        <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className='footer__container'>
                <p className='footer__text'>&#169; {new Date().getFullYear()}</p>
                <ul className='footer__links'>
                    <li className='footer__link'><a className='footer__link-text' href='https://practicum.yandex.ru/' rel='noreferrer' target='_blank' >Яндекс.Практикум</a></li>
                    <li className='footer__link'><a className='footer__link-text' href='https://github.com/marcell88' rel='noreferrer' target='_blank' >Github</a></li>
                </ul>
            </div>
        </footer >
    );
}

export default Footer;
