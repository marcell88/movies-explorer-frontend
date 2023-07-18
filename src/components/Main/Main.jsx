import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

import './Main.css';

const setCurrentAge = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentYearBirthday = new Date(currentYear + '-09-25');
    const birthYear = 1988;
    const fullYears = currentYearBirthday < currentDate ? currentYear - birthYear : currentYear - birthYear - 1;
    const word = fullYears % 10 <= 4 && fullYears % 100 !== 11 && fullYears % 100 !== 12 && fullYears % 100 !== 13 && fullYears % 100 !== 14
        ? (fullYears % 10 === 1 ? 'год' : 'года')
        : 'лет';
    return fullYears + ' ' + word;
}

const linksToElements = {
    aboutId: 'about',
    techsId: 'techs',
    aboutMeId: 'aboutMe'
};

function Main() {

    return (
        <main className='main'>
            <Promo linksToElements={linksToElements}/>
            <AboutProject id={linksToElements.aboutId}
                totalDuration='5 недель'
                backendDuration='1 неделя'
                frontendDuration='4 недели'
                backFr='1fr'
                frontFr='4fr'
            />
            <Techs id={linksToElements.techsId} />
            <AboutMe id={linksToElements.aboutMeId} age={setCurrentAge()} />
        </main>
    );
}

export default Main;
