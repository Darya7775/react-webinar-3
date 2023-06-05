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
      if(item.parent === null) {
        idParents[item._id] = {name: item.title, countDash: ''};
        categoryRows.push(item.title);
        return(categoryObjects.push({value: item._id, title: item.title}));
      }

      // находим родителя и добавляем под родителя
      let parent = idParents[item.parent._id];
      idParents[item._id] = {name: item.title, countDash: `${parent.countDash} - `};

      if(idParents[item._id].countDash === ' - ') {
        //если один родитель
        categoryRows.push(`${parent.countDash} - ${item.title}`);
        return(categoryObjects.push({value: item._id, title: `${parent.countDash} - ${item.title}`}));
      }
        // находим index родителя и добавляем под родителя
        const indexPar = categoryRows.indexOf(`${parent.countDash}${parent.name}`);
        categoryRows.splice(indexPar + 1, 0, `${parent.countDash} - ${item.title}`);
        categoryObjects.splice(indexPar + 2, 0, {value: item._id, title: `${parent.countDash} - ${item.title}`});
      })

    // сложность получается O(m * n) - где n - количество элементов в массиве,
    // m - количество элементов, у которых 2 и более родителя (O(3N)). + память.

    this.setState({
      ...this.getState(),
      categories: categoryObjects
    }, 'categories загружены');
  }
}

export default Categories;
