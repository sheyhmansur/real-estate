function renderContainer() {
    const markup = `
        <div class="container p-0 mb-5">
            <div class="heading-1">Избранное</div>
        </div>

        <div class="cards-wrapper">
                <div class="container p-0">
                <div id="cardsHolder" class="row">
                    <!-- cards will be here -->
                </div>
            </div>
         </div>
    `;

    document.querySelector('#app').insertAdjacentHTML('afterbegin', markup);
}

// Функция которая будет проходиться по массиву и для каждого его элемента будет рендерить карточку на странице

function renderCard(object) {

    const cardsContainer = document.querySelector('#cardsHolder');

    const markup = `<article class="col-md-4">
                            <!-- card -->
                            <a href="#/item/${object.id}" class="card" data-id="${object.id}">
                                <div class="card__header">
                                    <div class="card__title">
                                        ЖК ${object.complex_name}
                                    </div>
                                    <div class="card__like card__like--active">
                                        <i class="fas fa-heart"></i>
                                    </div>
                                </div>
                                <div class="card__img">
                                    <img src="${object.image}" alt="План квартиры" />
                                </div>
                                <div class="card__desc">
                                    <div class="card__price">
                                        <div class="card__price-total">
                                            ${object.price_total} ₽
                                        </div>
                                        <div class="card__price-per-meter">
                                        ${object.price_sq_m} ₽/м2
                                        </div>
                                    </div>

                                    <!-- card__params params -->
                                    <div class="card__params params">
                                        <div class="params__item">
                                            <div class="params__definition">
                                                Комнат
                                            </div>
                                            <div class="params__value">${object.rooms}</div>
                                        </div>
                                        <div class="params__item">
                                            <div class="params__definition">
                                                Площадь
                                            </div>
                                            <div class="params__value">${object.square}</div>
                                        </div>
                                    </div>
                                    <!-- //card__params params -->
                                </div>
                                <div class="card__footer">
                                    <div class="card__art">${object.scu}</div>
                                    <div class="card__floor">Этаж ${object.floor} из ${object.floors_total}</div>
                                </div>
                            </a>
                            <!-- // card -->
                        </article>`
    cardsContainer.insertAdjacentHTML('beforeend', markup);
}

// Общая функция котора рендерит всю страницу ее будем экспортировать и запускать
export function renderPage(cards) {
    renderContainer();

    cards.forEach((card) => {
        renderCard(card);
    });
}

export function toggleFavouriteIcon(elementIcon, isFaved) { // будет принимать в себя ту иконку по которой мы кликнули 
    // Если элемент в избранном(если isfaved = true, тогда делаем данную кнопку активной)
    if (isFaved) {
        elementIcon.classList.add('card__like--active');
    } else {
        elementIcon.classList.remove('card__like--active');
    }
}