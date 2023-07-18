import './Techs.css';

function Techs({id}) {

    return (
        <section className='techs' id={id}>

            <h2 className='techs__title'>Технологии</h2>
            <h3 className='techs__subtitle'>7 технологий</h3>
            <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className='techs__container'>
                <li className='techs__tech-name'><a className='techs__link' href='https://ru.wikipedia.org/wiki/HTML' target='_blank'>HTML</a></li>
                <li className='techs__tech-name'><a className='techs__link' href='https://ru.wikipedia.org/wiki/CSS' target='_blank'>CSS</a></li>
                <li className='techs__tech-name'><a className='techs__link' href='https://ru.wikipedia.org/wiki/JavaScript' target='_blank'>JS</a></li>
                <li className='techs__tech-name'><a className='techs__link' href='https://ru.wikipedia.org/wiki/React' target='_blank'>React</a></li>
                <li className='techs__tech-name'><a className='techs__link' href='https://ru.wikipedia.org/wiki/Git' target='_blank'>Git</a></li>
                <li className='techs__tech-name'><a className='techs__link' href='https://ru.wikipedia.org/wiki/Express_(%D1%84%D1%80%D0%B5%D0%B9%D0%BC%D0%B2%D0%BE%D1%80%D0%BA)' target='_blank'>Express.js</a></li>
                <li className='techs__tech-name'><a className='techs__link' href='https://ru.wikipedia.org/wiki/MongoDB' target='_blank'>mongoDB</a></li>
            </ul>

        </section>
    );
}

export default Techs;
