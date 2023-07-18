import './AboutProject.css';

function AboutProject({ id, totalDuration, backendDuration, frontendDuration, backFr, frontFr }) {

    return (
        <section className='about' id={id}>

            <h2 className='about__title'>О проекте</h2>

            <ul className='about__subtitles-cont'>
                <li className='about__item'>
                    <h3 className='about__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='about__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className='about__item'>
                    <h3 className='about__subtitle'>{`На выполнение диплома ушло ${totalDuration ? totalDuration : '5 недель'}`}</h3>
                    <p className='about__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>

            <ul className='about__timeline' style={{ gridTemplateColumns: `minmax(100px, ${backFr}) ${frontFr}` }}>
                <li className='about__timeline-back'>
                    <h4 className='about__timeline-subtitle about__timeline-subtitle_type_backend'>Back-end</h4>
                    <p className='about__timeline-text about__timeline-text_type_backend'>{backendDuration}</p>
                </li>
                <li className='about__timeline-front'>
                    <h4 className='about__timeline-subtitle about__timeline-subtitle_type_frontend'>Front-end</h4>
                    <p className='about__timeline-text about__timeline-text_type_frontend'>{frontendDuration}</p>
                </li>
            </ul>

        </section>
    );
}

export default AboutProject;
