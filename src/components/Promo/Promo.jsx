import './Promo.css';
import NavBar from '../NavBar/NavBar';
import earthPath from '../../images/earth_promo.svg';

function Promo({linksToElements}) {

    return (
        <section className='promo'>
            <div className='promo__text-container'>
                <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
                <p className='promo__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>

                <NavBar 
                    about={{ link: linksToElements.aboutId, name: 'О проекте'}}
                    techs={{ link: linksToElements.techsId, name: 'Технологии'}}
                    aboutMe={{ link: linksToElements.aboutMeId, name: 'Обо мне'}}
                />

            </div>
            <img className='promo__picture' src={earthPath} alt='Earth map' />
        </section>
    );
}

export default Promo;
