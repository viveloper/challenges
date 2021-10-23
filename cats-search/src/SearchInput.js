const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $searchInputWrapper = document.createElement('div');
    $searchInputWrapper.className = 'SearchInputWrapper';

    this.$searchInput = document.createElement('input');
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.className = 'SearchInput';
    this.$searchInput.autofocus = true;
    $searchInputWrapper.appendChild(this.$searchInput);

    const $randomButton = document.createElement('button');
    this.$randomButton = $randomButton;
    $randomButton.textContent = 'Random';
    $searchInputWrapper.appendChild($randomButton);

    $target.appendChild($searchInputWrapper);

    this.$searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
      }
    });

    this.$searchInput.addEventListener('click', () => {
      this.clearInput();
    });

    $randomButton.addEventListener('click', () => {
      onRandomSearch();
    });

    console.log('SearchInput created.', this);
  }

  clearInput() {
    this.$searchInput.value = '';
  }

  render() {}
}

export default SearchInput;
