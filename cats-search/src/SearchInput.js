const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $searchInputWrapper = document.createElement('div');
    $searchInputWrapper.className = 'SearchInputWrapper';

    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    $searchInput.className = 'SearchInput';
    $searchInputWrapper.appendChild($searchInput);

    const $randomButton = document.createElement('button');
    this.$randomButton = $randomButton;
    $randomButton.textContent = 'Random';
    $searchInputWrapper.appendChild($randomButton);

    $target.appendChild($searchInputWrapper);

    $searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
      }
    });

    $randomButton.addEventListener('click', () => {
      onRandomSearch();
    });

    console.log('SearchInput created.', this);
  }
  render() {}
}

export default SearchInput;
