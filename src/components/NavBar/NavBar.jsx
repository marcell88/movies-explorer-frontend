import './NavBar.css';
function NavBar(props) {

    return (
        <nav className='navbar'>
            <ul className='navbar__container'>
                {Object.keys(props).map((item, index) => 
                    (<li key={index} className='navbar__item'>
                        <a className='navbar__link' href={`#${props[item].link}`}>{props[item].name}</a>
                    </li>)
                )}
            </ul>
        </nav>
    );
}

export default NavBar;
