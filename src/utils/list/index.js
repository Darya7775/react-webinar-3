/**
 * Преобразование списка
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Object} список всех родителей
 */
export default function list(list, key = '_id') {
  let trees = {};
  let roots = {};
  for (const item of list) {

    // Добавление элемента в индекс узлов и создание свойства children
    if (!trees[item[key]]) {
      trees[item[key]] = item;
      trees[item[key]].children = [];
      // Ещё никто не ссылался, поэтому пока считаем корнем
      roots[item[key]] = trees[item[key]];
    } else {
      trees[item[key]] = Object.assign(trees[item[key]], item);
    }

    // Если элемент имеет родителя, то добавляем его в подчиненные родителя
    if (item.parent?._id) {
      // Если родителя ещё нет в индексе, то индекс создаётся, ведь _id родителя известен
      if (!trees[item.parent._id]) trees[item.parent[key]] = { children: [] };
      // Добавления в подчиненные родителя
      trees[item.parent[key]].children.push(trees[item[key]]);
    }
  }
  return roots;
}
