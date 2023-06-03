import StoreModule from "../module";

/**
 * Категории
 */
class Categories extends StoreModule {

  initState() {
    return {
      categories: [],
    }
  }

  async setCategories() {
    const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
    const result = await response.json();

    let idParents = {};

    let newAr = result.result.items.map((item) => {
      if(item.parent){
        // поиск родителя
        let parent = idParents[item.parent._id];
        // если у родителя есть роидтель
          if(parent.parent) {
            return {value: item._id, title: `--${item.title}`}
          } else {
            idParents[item._id] = {"parent": parent, "name": item.title};
            return {value: item._id, title: `-${item.title}`}
          }
      } else {
        idParents[item._id] = item.title;
        return {value: item._id, title: item.title}
      }
    });
    const newAr2 = newAr.splice(8, 2);
    newAr.splice(2, 0, ...newAr2);
    newAr.unshift({value: '', title: 'Все'});

    this.setState({
      ...this.getState(),
      categories: newAr
    }, 'categories загружены');
  }
}

export default Categories;
