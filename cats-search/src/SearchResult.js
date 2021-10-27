import { lazyLoadImage } from './utils/lazyLoadImage.js';
import { setIntersctionObserver } from './utils/intersectionObserverUtils.js';

class SearchResult {
  $searchResult = null;
  state = null;
  onClick = null;

  constructor({ $target, initialState, onClick, onNextPageSearch }) {
    const searchResultWrapper = document.createElement('div');

    this.$searchResult = document.createElement('div');
    this.$searchResult.className = 'SearchResult';
    this.handleClick = this.handleClick.bind(this);
    this.$searchResult.addEventListener('click', this.handleClick);

    searchResultWrapper.appendChild(this.$searchResult);

    this.$loading = document.createElement('div');
    this.$loading.className = 'LoadingSearch';
    const loadingTextEl = document.createElement('span');
    loadingTextEl.textContent = 'Loading...';
    this.$loading.appendChild(loadingTextEl);
    searchResultWrapper.appendChild(this.$loading);

    this.$error = document.createElement('div');
    this.$error.className = 'ErrorSearch';
    searchResultWrapper.appendChild(this.$error);

    $target.appendChild(searchResultWrapper);

    this.state = initialState;
    this.onClick = onClick;
    this.onNextPageSearch = onNextPageSearch;

    this.render();
  }

  setState(nextState) {
    if (this.state === nextState) {
      return;
    }
    this.state = nextState;
    this.render();
  }

  handleClick(e) {
    const item = e.target.closest('.item');
    if (item) {
      this.onClick(item.dataset['id']);
    }
  }

  addScrollFetch() {
    const scrollEndArea = document.createElement('div');
    setIntersctionObserver(
      scrollEndArea,
      () => {
        if (!this.state.isLoading) {
          this.onNextPageSearch();
        }
      },
      {
        threshold: 0.1,
      }
    );
    this.$searchResult.appendChild(scrollEndArea);
  }

  render() {
    const { isLoading, data, error } = this.state;

    this.$loading.style.display = isLoading ? 'flex' : 'none';

    this.$error.style.display = error ? 'flex' : 'none';
    if (error) {
      this.$error.innerHTML = `<span>${error}</span>`;
      setTimeout(() => {
        this.$error.style.display = 'none';
        this.addScrollFetch();
      }, 2000);
      return;
    }

    if (!data) {
      return;
    }

    if (!data.length) {
      this.$searchResult.innerHTML = `<div>No Result!</div>`;
      return;
    }

    this.$searchResult.innerHTML = data
      .map(
        (cat) => `
          <div class="item" data-id="${cat.id}">
            <img class="lazy" data-src="${cat.url}" alt=${cat.name} title="${cat.name}" />
          </div>
        `
      )
      .join('');

    this.$searchResult
      .querySelectorAll('img')
      .forEach((img) => lazyLoadImage(img));

    this.addScrollFetch();
  }
}

export default SearchResult;
