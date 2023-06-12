export default function getIdChildren(ob) {
  return(ob.children.length === 0 ? ob._id : getIdChildren(ob.children[ob.children.length - 1]))
}
