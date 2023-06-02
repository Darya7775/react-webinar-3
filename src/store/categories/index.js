import StoreModule from "../module";

/**
 * Категории
 */
class Categories extends StoreModule {

  initState() {
    return {
      categories: {},
    }
  }

  async setCategories() {
    const response = await fetch('/api/v1/categories')
    const result = await response.json();

    let levels = {};
    let idParents = {};
    let arr = [];

    result.result.items.map(item => {
      if(item.parent){
        // поиск родителя
        let parent = idParents[item.parent._id];
        // если у родителя есть роидтель
        if(parent.parent) {
          //копируем и запись в родителя
          levels[parent.parent] = {...levels[parent.parent], [parent.name]: {...levels[parent.parent][parent.name], [item.title]:{} }}
          arr.push(`--${item.title}`);
        } else {
          // запись в родителя
          levels[parent] = {...levels[parent], [item.title]:{}};
          arr.push(`-${item.title}`);
        }
        // добавление по id
        idParents[item._id] = {"parent": parent, "name": item.title};
      } else {
        // добавление по id
        idParents[item._id] = item.title;
        levels[item.title] = {};
        arr.push(item.title);
      }
    });

    this.setState({
      ...this.getState(),
      categories: arr
    }, 'categories загружены');
  }
}

export default Categories;
