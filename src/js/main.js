import homePage from './pages/homePage';
import singleItem from './pages/singleItemPage';
import favouritesPage from './pages/favouritesPage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import EventImitter from './utils/EventEmitter';
import Favourites from './favourites/favouritesModes';


const state = {
    results: [], // Будут храниться те данные, которые мы получили с помощю компонента фильтр, и именно эти данные будет брать отсюда компонент листинг
    emitter: new EventImitter(),
    favourites: new Favourites()
}

// Тестироваре после удалить
window.state = state;


// Массив с маршрутами (Routes)

const routes = [
    //path - адрес по которому заходит пользователь
    // component - компонент который будет открытваться при заходу по указанному адресу
    { path: '/', component: homePage },
    { path: 'item', component: singleItem }, // item необходим для открытия отдельной страницы с объектом
    { path: 'favourites', component: favouritesPage },
    { path: 'bids', component: bidsPage }, // заявки 
];

// Для работы маршрутизатора необходима функция, которая будет принимать в себя маршрут и будет выдывать название компонента, который нужно запустить под этот маршрут

function findComponentByPath(path, routes) { // routes - это массив
    return routes.find(function(route) {
        //соответствует ли переданный путь , тому пути который указан в наших маршрутах
        return route.path === path;
    });
    // По итогу функция будет возвращать название компонента
}

// Описание самого роутера. Задача роутера понять по какому адресу мы зашли на сайт, что у нас написано в адресной строке
function router() {

    // Split path to array  // hash - обращаемся к тому, что написано в адресной строке
    const pathArray = location.hash.split('/'); // разбиваем на массив и извлекам значение которое отвечает за component

    //Если в массиве на 1 -ом месте стоит пустая строка, то тогда был заход без параметров, т.е нужно отобразить главную - и в текущий путь записываем слешь / (слешь отвечает за главную страницу)
    let currentPath = pathArray[0] === '' ? '/' : pathArray[1];
    currentPath = currentPath === '' ? '/' : currentPath; // item // bids
    // По итогу либо пользователь попадает на главную либо на тот адрес, который он запросил


    // Сохраняем параметры роутера
    state.routeParams = pathArray[2] ? pathArray[2] : '';


    // Выбираем компонент для указанного адреса, либо компонент с ошибкой
    const { component = errorPage } = findComponentByPath(currentPath, routes) || {};

    component(state); // подразумеваем что наши компоненты являются функциями и мы запускаем  данный компонент как функцию и оно уже выполняется, она делает рендер той страницы, за которую отвечает

}

// запускаем роутер

window.addEventListener('hashchange', router);
window.addEventListener('load', router);