import searchLabel from '../../images/search-label.svg';
import searchButton from '../../images/search-button.svg';
import './SearchForm.css';

function SearchForm() {

    // Callbacks
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.find.value);
        console.log(e.target.short.checked);
    }

    return (
        <section className='search'>

            <form className='search__form' name='search' onSubmit={onSubmit} noValidate>

                <fieldset className='search__input-container'>
                    <label className='search__input-label'> <img className='search__input-label-icon' src={searchLabel} alt='Search' /> </label>
                    <input className='search__input' type='text' name='find' placeholder='Фильм' />
                    <button className='search__button'> <img className='search__input-button-icon' src={searchButton} alt='Search' /> </button>
                </fieldset>

                <fieldset className='search__checkbox-container'>
                    <label className='search__checkbox-label' htmlFor='short-checkbox'>Короткометражки
                        <input type='checkbox' name='short' id='short-checkbox' className='search__checkbox' />
                        <span className='search__checkbox-border'></span>
                        <span className='search__checkbox-circle'></span>
                    </label>
                </fieldset>

            </form>

        </section>
    );
}

export default SearchForm;
