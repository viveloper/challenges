const TEMPLATE = '<input type="text">';

class SearchInput {
  state = null;

  constructor({ $target, initialState, onSearch, onRandomSearch }) {
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

    this.$recentKeywords = document.createElement('ul');
    this.$recentKeywords.className = 'RecentKeywords';
    this.$recentKeywords.addEventListener('click', (e) => {
      const item = e.target.closest('.item');
      if (!item || item.classList.contains('no-keyword')) {
        return;
      }
      const keyword = item.textContent;
      this.$searchInput.value = keyword;
      onSearch(keyword);
    });

    $target.appendChild(this.$recentKeywords);

    this.state = initialState;

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

    this.render();

    console.log('SearchInput created.', this);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  clearInput() {
    this.$searchInput.value = '';
  }

  render() {
    const { recentKeywords } = this.state;

    if (!recentKeywords.length) {
      this.$recentKeywords.innerHTML = `<li class="item no-keyword">최근 검색 기록이 없습니다.</li>`;
      return;
    }

    this.$recentKeywords.innerHTML = recentKeywords
      .map((keyword) => `<li class="item">${keyword}</li>`)
      .join('');
  }
}

export default SearchInput;
