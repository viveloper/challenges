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

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (this.state.isLoading) {
      this.$searchResult.innerHTML = `<div>Loading...</div>`;
      return;
    }

    if (this.state.error) {
      this.$searchResult.innerHTML = `<div>Error!</div>`;
      return;
    }

    if (!this.state.data.length) {
      this.$searchResult.innerHTML = `<div>No Result!</div>`;
      return;
    }

    this.$searchResult.innerHTML = this.state.data
      .map(
        (cat) => `
          <div class="item">
            <img src=${cat.url} alt=${cat.name} />
          </div>
        `
      )
      .join('');

    this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
      $item.addEventListener('click', () => {
        this.onClick(this.state.data[index]);
      });
    });
  }
}
