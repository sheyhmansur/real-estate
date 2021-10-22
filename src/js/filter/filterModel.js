export default class Filter {
  constructor() {
    this.query = ""; // Указываем что как только фильтр отрендерился, запрос это просто пустая строка
  }

  // Функция которая будет отправляться запрос на сервер
  // await используется внутри асинхронной функции
  async getParams() {
    try {
      const queryString = "http://cw40939.tmweb.ru/api/itemsinfo";
      const response = await fetch(queryString); // await - т.е ждем пока он выполниться. await возвращает результат данного пpromise
      const data = await response.json(); // из response получаем данные из json формата в обычный формат
      this.params = await data; // this.params свойство объекта filter
    } catch (error) {
      alert(error);
    }
  }

  async getResults() {
    try {
      const queryString = `http://cw40939.tmweb.ru/api/items${this.query}`;
      const response = await fetch(queryString);
      const data = await response.json();
      this.result = await data;
      console.log("getResults", this.result);
    } catch (error) {
      alert(error);
    }
  }
}
