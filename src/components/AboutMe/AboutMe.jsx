import './AboutMe.css';
import myPhoto from '../../images/myphoto.jpg';
import arrowLink from '../../images/arrow-link.svg';

function AboutMe({age, id}) {

    return (
        <section className='about-me' id={id}>
            <h2 className='about-me__title'>Студент</h2>
            <div className='about-me__container'>
                <img className='about-me__photo' src={myPhoto} alt='My photo' />
                <h3 className='about-me__name'>Маркелл Д., CFA</h3>
                <p className='about-me__about'>{`Фронтенд-разработчки, ${age}`}</p>
                <article className='about-me__text'>
                    
                    Родился в Сибири, сейчас живу и работаю в Москве.
                    Я окончил МФТИ, так что Computer Science и 
                    программирование для меня не новое направление. Хотя опыта коммерческой разработки до курса по Вебу не было.

                    Моя основная профессиональная сфера, в которой я работаю уже более 10 лет - это финансы и инвестиции. 
                    Рад, что после курса у меня теперь появилось и прекрасное хобби - веб-разработка.
                    Сегодня я реализую один pet-проект (как раз на стыке IT и Финансов) и занимаюсь фриланс-заказами 
                    (если есть что-то интересное).

                </article>
                <a className='about-me__github' href='https://github.com/marcell88' target='_blank'>GitHub</a>
            </div>
            <div className='about-me__portfolio'>
                <h3 className='about-me__portfolio-title'>Портфолио</h3>
                <ul className='about-me__portfolio-container'>
                    <li className='about-me__project'>Статичный сайт <a className='about-me__link' target='_blank' href='https://marcell88.github.io/how-to-learn/'><img className='about-me__arrow' src={arrowLink} alt='Arrow' /></a></li>
                    <li className='about-me__project'>Адаптивный сайт <a className='about-me__link' target='_blank' href='https://marcell88.github.io/russian-travel/'><img className='about-me__arrow' src={arrowLink} alt='Arrow' /></a></li>
                    <li className='about-me__project'>Одностраничное приложение <a className='about-me__link' target='_blank' href='https://markell.students.nomoreparties.sbs/'><img className='about-me__arrow' src={arrowLink} alt='Arrow' /></a></li>
                </ul>
            </div>
        </section>
    );
}

export default AboutMe;
