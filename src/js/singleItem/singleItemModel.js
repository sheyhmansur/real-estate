// На основе класс будем создавать объект и работать через его методы

export default class SingleItem {
  constructor(id) {
    this.id = id;
  }

  // Делаем запрос на сервер
  async getItem() {
    try {
      const queryString = `http://cw40939.tmweb.ru/api/items/${this.id}`;
      const response = await fetch(queryString); // в ответ получаем промис который записываем в response
      const data = await response.json();
      this.result = await data;
    } catch (error) {
      alert(error);
    }
  }

  async submitForm(formData) {
    // данный методе будет отправлять данные на сервер
    const queryString = `http://cw40939.tmweb.ru/api/bidnew`;

    const response = await fetch(queryString, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json(); // Здесь тоже получаем promise но уже с данными
    this.response = await data;
    console.log(this.response.message);
  }
}
