/**
 * Получение id самого "глубокого" ребенка
 * @param [ob] {Object} Родительский объект
 * @returns {string} id самого "глубокого" ребенка
 */

export default function getIdChildren(ob) {
  return(ob.children.length === 0 ? ob._id : getIdChildren(ob.children[ob.children.length - 1]))
}
