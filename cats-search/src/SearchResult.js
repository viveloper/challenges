class SearchResult {
  $searchResult = null;
  state = null;
  onClick = null;

  constructor({ $target, initialState, onClick }) {
    this.$searchResult = document.createElement('div');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.state = initialState;
    this.onClick = onClick;

    this.handleClick = this.handleClick.bind(this);

    this.$searchResult.addEventListener('click', this.handleClick);

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  handleClick(e) {
    const item = e.target.closest('.item');
    if (item) {
      this.onClick(item.dataset['id']);
    }
  }

  render() {
    if (this.state.isLoading) {
      this.$searchResult.innerHTML = `<div>Loading...</div>`;
      return;
    }

    if (this.state.error) {
      this.$searchResult.innerHTML = `<div>${this.state.error}</div>`;
      return;
    }

    if (!this.state.data) {
      return;
    }

    if (!this.state.data.length) {
      this.$searchResult.innerHTML = `<div>No Result!</div>`;
      return;
    }

    this.$searchResult.innerHTML = this.state.data
      .map(
        (cat) => `
          <div class="item" data-id="${cat.id}">
            <img src=${cat.url} alt=${cat.name} />
          </div>
        `
      )
      .join('');
  }
}
