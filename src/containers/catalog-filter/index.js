import {memo, useCallback, useMemo} from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

function CatalogFilter() {

  const store = useStore();

  useInit(() => {
    store.actions.categories.setCategories();
  }, []);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({sort}), [store]),
    // Сортировка по категории
    onSortCategory: useCallback(category => store.actions.catalog.setParams({category, page: 1}), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({query, page: 1}), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(() => ([
      {value: 'order', title: 'По порядку'},
      {value: 'title.ru', title: 'По именованию'},
      {value: '-price', title: 'Сначала дорогие'},
      {value: 'edition', title: 'Древние'},
    ]), [])
  };

  const categories = useSelector(state => state.categories);

  const {t} = useTranslate();

  return (
    <SideLayout padding='medium'>
      <Select options={categories.categories} value={select.category} onChange={callbacks.onSortCategory}/>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort}/>
      <Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
             delay={1000}/>
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  )
}

export default memo(CatalogFilter);


// useEffect(() => {
//   async function load () {
//     const response = await fetch('/api/v1/categories')
//     const result = await response.json();
//     const res = {...result.result}
//     return(res);
//   }

//   function sort(array) {

//     let levels = {};
//     let idParents = {};

//     ar.map(item => {
//         if(item.parent){
//             // поиск родителя
//             let parent = idParents[item.parent._id];
//             // если у родителя есть роидтель
//             if(parent.parent) {
//                 //копируем и запись в родителя
//                 levels[parent.parent] = {...levels[parent.parent], [parent.name]: {...levels[parent.parent][parent.name], [item.title]:{} }}
//             } else {
//                 // запись в родителя
//                 levels[parent] = {...levels[parent], [item.title]:{}};
//             }
//             // добавление по id
//             idParents[item._id] = {"parent": parent, "name": item.title};
//         } else {
//             // добавление по id
//             idParents[item._id] = item.title;
//             levels[item.title] = {};
//         }
//     });
//     return levels;
// }
//   let res = load();
//   console.log(res)
// }, []);
