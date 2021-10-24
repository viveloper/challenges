import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import { api } from './api.js';

class App {
  $target = null;
  state = {
    images: {
      isLoading: false,
      data: JSON.parse(localStorage.getItem('images')) || null,
      error: null,
    },
    image: {
      isLoading: false,
      data: null,
      error: null,
    },
    isImageInfoVisible: false,
    recentKeywords: JSON.parse(localStorage.getItem('recentKeywords')) || [],
  };

  constructor($target) {
    this.$target = $target;

    this.fetchCats = this.fetchCats.bind(this);
    this.fetchRandomCats = this.fetchRandomCats.bind(this);
    this.fetchCat = this.fetchCat.bind(this);
    this.handleImageInfoClose = this.handleImageInfoClose.bind(this);

    this.searchInput = new SearchInput({
      $target,
      initialState: {
        recentKeywords: this.state.recentKeywords,
      },
      onSearch: (keyword) => {
        if (!keyword) {
          return;
        }
        this.addRecentKeyword(keyword);
        this.fetchCats(keyword);
      },
      onRandomSearch: this.fetchRandomCats,
    });

    this.searchResult = new SearchResult({
      $target,
      initialState: this.state.images,
      onClick: this.fetchCat,
      onNextPageSearch: () => {
        const keyword = this.searchInput.$searchInput.value;
        if (!keyword) {
          return;
        }
        this.fetchCatsAndAppend(keyword);
      },
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
    if (this.state === nextState) {
      return;
    }
    this.state = nextState;
    this.searchResult.setState(this.state.images);
    this.imageInfo.setState({
      ...this.state.image,
      visible: this.state.isImageInfoVisible,
    });
    this.searchInput.setState({
      recentKeywords: this.state.recentKeywords,
    });

    localStorage.setItem('images', JSON.stringify(this.state.images.data));
    localStorage.setItem(
      'recentKeywords',
      JSON.stringify(this.state.recentKeywords)
    );
  }

  handleImageInfoClose() {
    this.setState({
      ...this.state,
      isImageInfoVisible: false,
    });
  }

  addRecentKeyword(keyword) {
    this.setState({
      ...this.state,
      recentKeywords: [
        keyword,
        ...this.state.recentKeywords.filter((v) => v !== keyword).slice(0, 4),
      ],
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
    this.setAsyncLoadingState('images');
    try {
      const { data } = await api.fetchCats(keyword);
      this.setAsyncSuccessState('images', data);
    } catch (err) {
      this.setAsyncFailState('images', err);
    }
  }

  async fetchCatsAndAppend(keyword) {
    this.setAsyncLoadingState('images');
    try {
      const { data } = await api.fetchCats(keyword);
      this.setAsyncSuccessState('images', [...this.state.images.data, ...data]);
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
