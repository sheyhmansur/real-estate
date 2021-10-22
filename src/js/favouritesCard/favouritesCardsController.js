import FavouritesCards from "./favouritesCardsModel";
import * as view from './favouritesCardsView';

export default async function(state) {

    // Получить список объектов которые находятся в избранном
    const favsList = state.favourites.favs;

    // Делаем запрос на сервер, чтобы получить данные по объектам которые соответствуют этим id
    const favouriteCards = new FavouritesCards(favsList);
    await favouriteCards.getFavs();

    // Отображаем контейнер и  карточки
    view.renderPage(favouriteCards.cards); // теперь данный массив с карточками есть в функции renderPage

    // Запускаем прослушку клика на иконки "Добавит в избранное"
    addToFavsListener();

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