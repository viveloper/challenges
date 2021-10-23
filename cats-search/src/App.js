import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import { api } from './api.js';

class App {
  $target = null;
  state = {
    images: {
      isLoading: false,
      data: null,
      error: null,
    },
    image: {
      isLoading: false,
      data: null,
      error: null,
    },
    isImageInfoVisible: false,
  };

  constructor($target) {
    this.$target = $target;

    this.fetchCats = this.fetchCats.bind(this);
    this.fetchRandomCats = this.fetchRandomCats.bind(this);
    this.fetchCat = this.fetchCat.bind(this);
    this.handleImageInfoClose = this.handleImageInfoClose.bind(this);

    this.searchInput = new SearchInput({
      $target,
      onSearch: this.fetchCats,
      onRandomSearch: this.fetchRandomCats,
    });

    this.searchResult = new SearchResult({
      $target,
      initialState: this.state.images,
      onClick: this.fetchCat,
    });

    this.imageInfo = new ImageInfo({
      $target,
      initialState: {
        ...this.state.image,
        visible: this.state.isImageInfoVisible,
      },
      onClose: this.handleImageInfoClose,
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.searchResult.setState(nextState.images);
    this.imageInfo.setState({
      ...nextState.image,
      visible: this.state.isImageInfoVisible,
    });
  }

  handleImageInfoClose() {
    this.setState({
      ...this.state,
      isImageInfoVisible: false,
    });
  }

  setAsyncLoadingState(key) {
    this.setState({
      ...this.state,
      [key]: {
        ...this.state[key],
        isLoading: true,
        error: null,
      },
    });
  }
  setAsyncSuccessState(key, data) {
    this.setState({
      ...this.state,
      [key]: {
        data,
        isLoading: false,
        error: null,
      },
    });
  }
  setAsyncFailState(key, err) {
    this.setState({
      ...this.state,
      [key]: {
        ...this.state[key],
        isLoading: false,
        error: err.message,
      },
    });
  }

  async fetchCats(keyword) {
    if (!keyword) {
      return;
    }

    this.setAsyncLoadingState('images');
    try {
      const { data } = await api.fetchCats(keyword);
      this.setAsyncSuccessState('images', data);
    } catch (err) {
      this.setAsyncFailState('images', err);
    }
  }

  async fetchRandomCats() {
    this.setAsyncLoadingState('images');
    try {
      const { data } = await api.fetchRandomCats();
      this.setAsyncSuccessState('images', data);
    } catch (err) {
      this.setAsyncFailState('images', err);
    }
  }

  async fetchCat(id) {
    this.setAsyncLoadingState('image');
    this.setState({
      ...this.state,
      isImageInfoVisible: true,
    });

    try {
      const { data } = await api.fetchCat(id);
      this.setAsyncSuccessState('image', data);
    } catch (err) {
      this.setAsyncFailState('image', err);
    }
  }
}

export default App;
