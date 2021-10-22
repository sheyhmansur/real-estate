import SingleItem from "./singleItemModel.js";
import * as view from "./singleItemView.js";
export default async function (state) {
  state.singleItem = new SingleItem(state.routeParams); // это id который записывается как внутреннее свойство объекта (будет находиться id данной страницы)

  // Получаем данные с сервера
  await state.singleItem.getItem();

  // Отрисовываем разметку для отдельного объекта
  view.render(
    state.singleItem.result,
    state.favourites.isFav(state.singleItem.id)
  );

  // Открытие модального окна
  document.querySelector(".button-order").addEventListener("click", () => {
    view.showModal();
  });

  // Закрытие модального окна - по кнопке
  document.querySelector(".modal__close").addEventListener("click", () => {
    view.hideModal();
  });

  // Закрытие модального окна по overlay
  document.querySelector(".modal-wrapper").addEventListener("click", (e) => {
    if (e.target.closest(".modal")) {
      return null;
    } else {
      view.hideModal();
    }
  });

  // Отправка формы
  document
    .querySelector(".modal__form")
    .addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = view.getInput();
      await state.singleItem.submitForm(formData);

      const response = state.singleItem.response;

      if (response.message === "Bid Created") {
        alert("Ваша заявка успешно получена!");
        view.hideModal();
        view.clearInput();
      } else if (response.message === "Bid Not Created") {
        console.log(response.errors);
        response.errors.forEach((item) => {
          alert(item);
        });
      }
    });

  // Клик по кнопке "Добавить в Избранное"
  document.querySelector("#addToFavouriteBtn").addEventListener("click", () => {
    state.favourites.toggleFav(state.singleItem.id);
    view.toggleFavouriteButton(state.favourites.isFav(state.singleItem.id));
  });
}
