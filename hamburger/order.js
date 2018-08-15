/** Класс, объекты которого описывают заказ
 * 
 * @constructor
 * @param {any} consist 
 */
function Order(consist) {
  //
  this.consist = consist;
  this.burger = {};
}

/**
 * Сбор информации о заказе 
 * @return массив с данными заказа
 */
Order.prototype.getOrder = function () {
  var result = [];
  // найдем DOM элементы, содержащие данные о заказе
  var form = document.getElementById('mainForm');
  for (const key in form) {
    if (form.hasOwnProperty(key)) {
      const element = form[key];
      if (element.checked) { result.push(element.value); }
    }
  }
  this.consist = result;
}

/**
 * Создание бургера по заказу
 * 
 * consist - состав бургера: 1 элемент - размер, 2 элемент - начинка, 3,4(необязательные) - приправы
 */
Order.prototype.createBurger = function () {
  var consist = this.consist;
  if (consist.length > 0) {
    var burger = new Hamburger(consist[0], consist[1]);
    if (consist[2]) { burger.addTopping(consist[2]) };
    if (consist[3]) { burger.addTopping(consist[3]) };
    this.burger = burger;
  }
}

/**
 * Заполнение DOM элементов данными по заказу
 * 
 * 
 */
Order.prototype.renderOrder = function () {
  var burger = this.burger;
  // найдем DOM элементы для вывода информации
  var infoSize = document.getElementById('infoSize');
  var infoStuffing = document.getElementById('infoStuffing');
  var infoTopping = document.getElementById('infoTopping');
  var infoCalories = document.getElementById('infoCalories');
  var infoPrice = document.getElementById('infoPrice');
  // получим данные о составленном бургере
  var size = burger.getSize();
  var calories = burger.calculateCalories();
  var price = burger.calculatePrice();
  var stuffing = burger.getStuffing();
  var topping = burger.getToppings();
  // выводим информацию о бургере в DOM элементы
  infoSize.innerText = size;
  infoCalories.innerText = calories;
  infoPrice.innerText = price;
  infoStuffing.innerText = stuffing;
  infoTopping.innerText = topping;
}