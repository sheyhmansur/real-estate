export default class Favourites {

    constructor() {
        this.favs = [];
        this.readStorage() // Todo:  Работа с localStorage - Получение элементов из localStorage

    }

    addFav(id) {
        this.favs.push(id);
        // Сохранение в localStorage
        this.saveData()
    }

    removeFav(id) { //будет находить индекс данного элемента в массиве и с помощью метода slice его оттуда удалим
        const index = this.favs.indexOf(id);
        this.favs.splice(index, 1); // таким образом удалили данный элемент из массива favs
        // Сохранение в localStorage
        this.saveData()
    }

    isFav(id) {
        return this.favs.indexOf(id) !== -1 ? true : false; // есть ли элемент в массиве или нет
    }

    toggleFav(id) {
        this.isFav(id) ? this.removeFav(id) : this.addFav(id);
    }


    saveData() {
        localStorage.setItem('favs', JSON.stringify(this.favs));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('favs'));
        if (storage) this.favs = storage; // Если есть записываем в localStorage
    }
}