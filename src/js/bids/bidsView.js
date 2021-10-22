 function renderContainer() {
     const markup = `<div class="container p-0 mb-5">
                            <div class="heading-1">Заявки</div>
                        </div>

                        <!-- panels-wrapper -->
                        <div class="panels-wrapper">
                            <div id="bidsHolder" class="container p-0">
                            <!-- Bids will be here -->



                        </div>
                    </div>`;

     document.querySelector('#app').insertAdjacentHTML('afterbegin', markup);
 }

 function renderBid(bid) { // bids - информация о конкретной заявке и будет рендерить ее небольшой шаблон с панелью под эту заявку
     const markup = `<div class="panel panel--no-hover">
                        <div class="panel__bidid">${bid.id}</div>
                        <div class="panel__bidname">${bid.name}</div>
                         <div class="panel__bidphone">${bid.phone}</div>
                  </div>`

     document.querySelector('#bidsHolder').insertAdjacentHTML('beforeend', markup);
 }

 // Создаем еще одну функцию которая пойдет на экспорт, которая будет рендерить сначала контейнер, а потом будет рендерить все заявки

 export function renderBids(bids) { // bids - это массив с заявками
     renderContainer();

     bids.forEach((item) => {
         renderBid(item);
     });
 }