console.log('app is running!');

class App {
  $target = null;
  state = {
    images: {
      isLoading: false,
      data: null,
      error: null,
    },
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
        this.imageInfo.setState({
          ...this.imageInfo.state,
          visible: true,
          isLoading: true,
          error: null,
        });
        api
          .fetchCat(image.id)
          .then(({ data }) => {
            this.imageInfo.setState({
              ...this.imageInfo.state,
              data,
              isLoading: false,
              error: null,
            });
          })
          .catch((err) => {
            this.imageInfo.setState({
              ...this.imageInfo.state,
              isLoading: false,
              error: err.message,
            });
          });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.searchResult.setState(nextState.images);
  }
}
