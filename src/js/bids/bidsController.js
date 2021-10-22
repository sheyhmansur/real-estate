import * as view from './bidsView';
import Bids from './bidsModel';

// в этой функции будем делат запрос на сервер и делать рендер
export default async function(state) {

    // Создаем объект модели для работы с заявками
    if (!state.bids) state.bids = new Bids();

    // Получаем заявки с сервера (массив с заявками)
    await state.bids.getBids();

    // Отображаем заявки на странице
    view.renderBids(state.bids.bids)

}