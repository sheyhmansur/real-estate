import Filter from "./filterModel";
import * as view from "./filterView";

// Создаем функцию которую будем экспортировать и импортировать в homePage
export default async function (state) {
  // будет отвечать за работу фильтра
  //Создание объект фильтра
  if (!state.filter) state.filter = new Filter();

  // Получаем параметры сервера (для фильтра)
  await state.filter.getParams();

  //Отрисовка фильтра
  view.render(state.filter.params);

  //Делаем запрос на сервер
  await state.filter.getResults();
  state.results = state.filter.result; // будут храниться наши результаты

  // Обновляем счетчик на кнопке
  view.changeButtonText(state.filter.result.length);

  //Прослушка событий формы
  const form = document.querySelector("#filter-form");

  // Изменение формы
  form.addEventListener("change", async function (e) {
    e.preventDefault();
    state.filter.query = view.getInput();
    await state.filter.getResults();
    state.results = state.filter.result; // будут храниться наши результаты
    view.changeButtonText(state.filter.result.length);
  });

  //Сброс данных формы
  form.addEventListener("reset", async function () {
    state.filter.query = "";
    await state.filter.getResults();
    //Когда получаем данные по фильтру, мы должны их сохранить также и в state
    //Сохраним их в общий state приложения
    view.changeButtonText(state.filter.result.length);
    console.log("Cброс формы");
  });

  //Отправка формы
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("submit");
    state.emitter.emit("event:render-listing", {}); //Сгенерировали событие, теперь нужно сделать прослушку этого события
  });
}
