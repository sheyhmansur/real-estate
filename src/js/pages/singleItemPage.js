import singleItem from './../singleItem/singleItemController';

export default function(state) {

    // Когда user будет переходить с главной страницы либо с любой другой на страницу конкретного объекта, весь предыдущий контент должен уйти  и должен отобразиться новый
    // Очищаем контейнер приложения
    document.querySelector('#app').innerHTML = '';

    // Запускаем компонент singleItem
    singleItem(state);
}