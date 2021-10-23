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

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.setState({
          ...this.state,
          images: { ...this.state.images, isLoading: true, error: null },
        });

        try {
          const { data } = await api.fetchCats(keyword);
          this.setState({
            ...this.state,
            images: { data, isLoading: false, error: null },
          });
        } catch (err) {
          this.setState({
            ...this.state,
            images: {
              ...this.state.images,
              isLoading: false,
              error: err.message,
            },
          });
        }
      },
      onRandomSearch: async () => {
        this.setState({
          ...this.state,
          images: { ...this.state.images, isLoading: true, error: null },
        });
        try {
          const { data } = await api.fetchRandomCats();
          this.setState({
            ...this.state,
            images: { data, isLoading: false, error: null },
          });
        } catch (err) {
          this.setState({
            ...this.state,
            images: {
              ...this.state.images,
              isLoading: false,
              error: err.message,
            },
          });
        }
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialState: this.state.images,
      onClick: async (id) => {
        this.setState({
          ...this.state,
          image: {
            ...this.state.image,
            isLoading: true,
            error: null,
          },
          isImageInfoVisible: true,
        });

        try {
          const { data } = await api.fetchCat(id);
          this.setState({
            ...this.state,
            image: {
              ...this.state.image,
              data,
              isLoading: false,
              error: null,
            },
          });
        } catch (err) {
          this.setState({
            ...this.state,
            image: {
              ...this.state.image,
              isLoading: false,
              error: err.message,
            },
          });
        }
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      initialState: {
        ...this.state.image,
        visible: this.state.isImageInfoVisible,
      },
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
}

export default App;
