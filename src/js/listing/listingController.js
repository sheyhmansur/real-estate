import * as view from './listingView';

export default function(state) {
    console.log('Component Listing started!');

    // Рендер контейнера для карточек
    view.render();

    // Рендер карточек
    state.results.forEach(function(item) {
        view.renderCard(item, state.favourites.isFav(item.id));

    });

    // Запускаем прослушку клика на иконки "Добавит в избранное"
    addToFavsListener();

    state.emitter.subscribe('event:render-listing', () => {
        // Очистить контейнер с карточками
        view.clearListingContainer();

        // Отрендерить карточки
        state.results.forEach(function(item) {
            view.renderCard(item, state.favourites.isFav(item.id));
        });

        // Запускаем прослушку клика на иконки "Добавит в избранное"
        addToFavsListener();
    });

    // Функция для работы иконок "Добавить в избранное"
    function addToFavsListener() {
        // Находим данные кнопки по классу card__like
        // Превращаем в массив c помощью Array.from  
        Array.from(document.getElementsByClassName('card__like')).forEach((item) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();

                // Находим ID объекта по которому кликнули
                const currentId = e.target.closest('.card').dataset.id;

                // Добавляем/Убираем элемент из избранного
                state.favourites.toggleFav(currentId); // данный элемент будет попадать либо уходить из избранного

                // Включаем и выключаем иконку с избранным
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
            });
        });
    }


}