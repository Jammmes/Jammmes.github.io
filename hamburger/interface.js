window.onload = function () {
  // установим обработчик на нажатие кнопки
  var buttonOrder = document.getElementById('buttonOrder');
  buttonOrder.addEventListener('click', makeBurger);
}

function makeBurger() {
  var order = new Order([]);
  order.getOrder();
  order.createBurger();
  order.renderOrder();
}