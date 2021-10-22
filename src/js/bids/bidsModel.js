export default class Bids {
  constructor() {}

  //Метод который будет запрашивать заявки и сохранить в объект данного компонента
  async getBids() {
    try {
      const queryString = "http://cw40939.tmweb.ru/api/bids";
      const result = await fetch(queryString); // await - т.е ждем пока он выполниться. await возвращает результат данного пpromise
      const data = await result.json(); // из response получаем данные из json формата в обычный формат
      this.bids = await data; // this.params свойство объекта filter
    } catch (error) {
      alert("Error with getting Bids");
      console.log(error);
    }
  }
}
