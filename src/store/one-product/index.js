import StoreModule from "../module";

class OneProduct extends StoreModule {

  initState() {
    return {
      product: {}
    }
  }

  async load(id) {
    this.setState({
      ...this.getState(),
      status: 'loading'
    }, 'Загрузка');

    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const result = await response.json();

    this.setState({
      ...this.getState(),
      product: result.result,
      status: 'success'
    }, 'Загружен один товар из АПИ');
  }
}

export default OneProduct;
