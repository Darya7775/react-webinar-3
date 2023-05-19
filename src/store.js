/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item
   */
  addItemInCart(item) {
    this.setState({
      ...this.state,
      list: this.state.list.map(it => {
              if (it.code === item.code) {
                return {
                  ...it,
                  isCart: true,
                };
              }
              return it;
            }),
      cart: {
        ...this.state.cart,
        // увеличивается цена товара в корзине
        totalPrice: this.state.cart.totalPrice + item.price,
        // увеличивается количество товара в корзине
        total: this.state.cart.total + 1,
        // Новый список id товаров в корзине
        ids: [...this.state.cart.ids, item.code],
        // Новый список товаров в корзине
        entities: {...this.state.cart.entities, [item.code]: {code: item.code, title: item.title, price: item.price, count: 1, isCart: true}}
      }
    })
  };

  /**
   * Удаление товара из корзины
   * @param item
   */
  deleteItemInCart(item) {
    const newEntities = { ...this.state.cart.entities};
    delete newEntities[item.code];
    this.setState({
      ...this.state,
      list: this.state.list.map(it => {
              if (it.code === item.code) {
                return {
                  ...it,
                  isCart: false,
                };
              }
              return it;
            }),
      cart: {
        ...this.state.cart,
        // уменьшается итоговая цена за количество одного товара
        totalPrice: this.state.cart.totalPrice - (item.price * this.state.cart.entities[item.code].count),
        // уменьшается количество товара в корзине
        total: this.state.cart.total - 1,
        // Новый список, в котором не будет id удаляемого товара
        ids: this.state.cart.ids.filter(id => item.code !== id),
        // Новый список товаров в корзине
        entities: newEntities
      }
    })
  };

  /**
   * Увеличение количества товара и цены
   * @param item
   */
  increaseCountAndPrice(item) {
    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        // увеличивается цена товара в корзине
        totalPrice: this.state.cart.totalPrice + item.price,
        // увеличивается количество одного товара в корзине
        entities: {...this.state.cart.entities, [item.code]: {...this.state.cart.entities[item.code], count: this.state.cart.entities[item.code].count + 1}}
      }
    })
  };
}

export default Store;
