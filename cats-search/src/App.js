console.log('app is running!');

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
      onSearch: (keyword) => {
        this.setState({
          ...this.state,
          images: { ...this.state.images, isLoading: true, error: null },
        });
        api
          .fetchCats(keyword)
          .then(({ data }) => {
            this.setState({
              ...this.state,
              images: { data, isLoading: false, error: null },
            });
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              images: {
                ...this.state.images,
                isLoading: false,
                error: err.message,
              },
            });
          });
      },
      onRandomSearch: () => {
        this.setState({
          ...this.state,
          images: { ...this.state.images, isLoading: true, error: null },
        });
        api
          .fetchRandomCats()
          .then(({ data }) => {
            this.setState({
              ...this.state,
              images: { data, isLoading: false, error: null },
            });
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              images: {
                ...this.state.images,
                isLoading: false,
                error: err.message,
              },
            });
          });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialState: this.state.images,
      onClick: (image) => {
        this.setState({
          ...this.state,
          image: {
            ...this.state.image,
            isLoading: true,
            error: null,
          },
          isImageInfoVisible: true,
        });
        api
          .fetchCat(image.id)
          .then(({ data }) => {
            this.setState({
              ...this.state,
              image: {
                ...this.state.image,
                data,
                isLoading: false,
                error: null,
              },
            });
          })
          .catch((err) => {
            this.setState({
              ...this.state,
              image: {
                ...this.state.image,
                isLoading: false,
                error: err.message,
              },
            });
          });
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
