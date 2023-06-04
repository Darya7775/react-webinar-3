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

    // 2 дублирующих массива: categoryRows - заначения по строкам (чтоб легко найти родителя);
    // categoryObjects - итоговый массив
    let categoryRows = [];
    let categoryObjects = [];
    let idParents = {};

    categoryObjects.push({value: '', title: 'Все'});

    result.result.items.map((item) => {
      if(item.parent){
        // поиск родителя
        let parent = idParents[item.parent._id];
        // если у родителя есть родитель
        if(parent.parent) {
          //находим индекс родителя
          const indexPar = categoryRows.indexOf(`-${parent.name}`);
          //добавляем под родителя
          categoryRows.splice(indexPar + 2, 0, `--${item.title}`);
          categoryObjects.splice(indexPar + 2, 0, {value: item._id, title: `--${item.title}`});
        } else {
          // если 1 родитель добавляем в конец
          idParents[item._id] = {"parent": parent, "name": item.title};
          categoryRows.push(`-${item.title}`);
          categoryObjects.push({value: item._id, title: `-${item.title}`});
        }
      } else {
        // если нет родителя добавляем в конец
        idParents[item._id] = item.title;
        categoryRows.push(item.title);
        categoryObjects.push({value: item._id, title: item.title});
      }
    });

    // сложность получается O(m * n) - где n - количество элементов в массиве,
    // m - количество элементов, у которых 2 родителя. + память.

    this.setState({
      ...this.getState(),
      categories: categoryObjects
    }, 'categories загружены');
  }
}

export default Categories;
