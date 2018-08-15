/**
 * Класс, объекты которого описывают параметры гамбургера. 
 * @constructor
 * @param size        Размер
 * @param stuffing    Начинка
 * @throws {HamburgerException}  При неправильном использовании
 */
function Hamburger(size, stuffing) {
  /* Размеры, виды начинок и добавок */
  Hamburger.SIZE_SMALL = {
    price: 50,
    calories: 20
  };
  Hamburger.SIZE_LARGE = {
    price: 100,
    calories: 40
  };
  Hamburger.STUFFING_CHEESE = {
    price: 10,
    calories: 20
  };
  Hamburger.STUFFING_SALAD = {
    price: 20,
    calories: 5
  };
  Hamburger.STUFFING_POTATO = {
    price: 14,
    calories: 10
  };
  Hamburger.TOPPING_MAYO = {
    price: 20,
    calories: 5
  };
  Hamburger.TOPPING_SPICE = {
    price: 15,
    calories: 0
  };

  this.size = size;
  this.stuffing = stuffing;
  this.topping = [];

  // Проверка правильности указания размера
  var isSizeCorrect = false;
  for (var attr in Hamburger) {
    if (this.size == attr) {
      isSizeCorrect = true;
    }
  }
  if (!isSizeCorrect) {
    var message = 'Ошибка указания размера. ' + this.size + ' - некорректное значение';
    var errorSize = new HamburgerException(message);
  }
  // Проверка правильности указания начинки
  var isStuffingCorrect = false;
  for (var attr in Hamburger) {
    if (this.stuffing == attr) {
      isStuffingCorrect = true;
    }
  }
  if (!isStuffingCorrect) {
    var message = 'Ошибка указания начинки. ' + this.stuffing + ' - некорректное значение';
    var errorStuffing = new HamburgerException(message);
  }
  // Подсчет начальной стоимости бургера при создании
  var price = 0;
  for (var attr in Hamburger) {
    var element = Hamburger[attr];
    if ((this.size == attr) || (this.stuffing == attr)) {
      price += element.price;
    }
  }

  // Подсчет начальной калорийности бургера при создании
  var calories = 0;
  for (var attr in Hamburger) {
    var element = Hamburger[attr];
    if ((this.size == attr) || (this.stuffing == attr)) {
      calories += element.calories;
    }
  }
  //
  this.currentPrice = price;
  this.currentCalories = calories;
};

/**
 * Добавить добавку к гамбургеру. Можно добавить несколько
 * добавок, при условии, что они разные.
 * @returns message в случае ошибки, topping в случае успеха
 * @param topping     Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.addTopping = function (topping) {
  var existTopping = this.topping;
  var result;
  if (existTopping.indexOf(topping) == -1) {
    // Обновляем текущую стоимость бургера с учетом добавки
    var price = 0;
    // Ищем цену добавки
    for (var attr in Hamburger) {
      var element = Hamburger[attr];
      if (topping == attr) {
        price += element.price;
      }
    }
    this.currentPrice += price;
    // Обновляем текущую калорийность бургера с учетом добавки
    var calories = 0;
    // Ищем калорийность добавки
    for (var attr in Hamburger) {
      var element = Hamburger[attr];
      if (topping == attr) {
        calories += element.calories;
      }
    }
    this.currentCalories += calories;
    // Запоминаем добавление нового топпинга
    existTopping.push(topping);
    result = topping;
  } else {
    // Сообщение об ошибке;
    var message = 'Ошибка добавления. Такая добавка: ' + topping + ' уже есть в наборе.'
    var errorAdd = new HamburgerException(message);
    result = message;
  }
  return result;
};


/**
 * Убрать добавку, при условии, что она ранее была 
 * добавлена.
 * @returns message в случае ошибки, topping в случае успешного удаления
 * @param topping   Тип добавки
 * @throws {HamburgerException}  При неправильном использовании
 */
Hamburger.prototype.removeTopping = function (topping) {
  var existTopping = this.topping;
  var index = existTopping.indexOf(topping);
  var result;
  if (index == -1) {
    // Сообщение об ошибке;
    var message = 'Ошибка удаления. Такой добавки: ' + topping + ' нет в наборе.'
    var errorRemove = new HamburgerException(message);
    result = message;
  } else {
    // Обновляем текущую стоимость бургера с учетом удаления добавки
    var price = 0;
    // Ищем цену добавки
    for (var attr in Hamburger) {
      var element = Hamburger[attr];
      if (topping == attr) {
        price += element.price;
      }
    }
    this.currentPrice -= price;
    // Обновляем текущую калорийность бургера с учетом удаления добавки
    var calories = 0;
    // Ищем калорийность добавки
    for (var attr in Hamburger) {
      var element = Hamburger[attr];
      if (topping == attr) {
        calories += element.calories;
      }
    }
    this.currentCalories -= calories;
    // Удаляем топпинг из гамбургера
    existTopping.splice(index, 1);
    result = topping;
  }
  return result;
};


/**
 * Получить список добавок.
 *
 * @return {Array} Массив добавленных добавок, содержит константы
 *                 Hamburger.TOPPING_*
 */
Hamburger.prototype.getToppings = function () {
  var toppingArr = this.topping;
  var result = [];
  for (var i = 0; i < toppingArr.length; i++) {
    var topping = toppingArr[i];
    for (var attr in Hamburger) {
      var element = Hamburger[attr];
      if (topping == attr) {
        toppingDescr = topping + ', ' + element.price + ' rub., ' + element.calories + ' cal.';
        result.push(toppingDescr);
      }
    }
  }
  return result;
};

/**
 * Узнать размер гамбургера
 */
Hamburger.prototype.getSize = function () {
  var size = this.size;
  return size;
};

/**
 * Узнать начинку гамбургера
 */
Hamburger.prototype.getStuffing = function () {
  var stuffing = this.stuffing;
  return stuffing;
};

/**
 * Узнать цену гамбургера
 * @return {Number} Цена 
 */
Hamburger.prototype.calculatePrice = function () {
  var price = 0;
  price = this.currentPrice;
  return price;
};

/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
Hamburger.prototype.calculateCalories = function () {
  var calories = 0;
  calories = this.currentCalories;
  return calories;
};

/**
 * Представляет информацию об ошибке в ходе работы с гамбургером. 
 * Подробности хранятся в свойстве message.
 * @constructor 
 */
function HamburgerException(message) {
  console.log(message);
}