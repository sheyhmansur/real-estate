export default class FavouritesCards {
    constructor(favsList) { // favs - массив из элементов, сохраняем во внутреннне поле объекта 
        this.favsList = favsList;
    }

    // Метод получения данных с сервера
    async getFavs() {
        const ids = this.favsList.toString(); // превращаем в строку
        const queryString = `http://jsproject.webcademy.ru/items?ids=${ids}`;
        const result = await fetch(queryString);
        const data = await result.json();
        this.cards = await data;
        console.log(this.cards)
    }
}