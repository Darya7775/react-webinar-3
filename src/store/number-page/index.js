import StoreModule from "../module";

class NumberPage extends StoreModule {

  initState() {
    return(1);
  }

  saveCurrentPageNumbers(currentPage) {
    this.setState(currentPage);
  }
}

export default NumberPage;
