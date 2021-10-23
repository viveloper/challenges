console.log('app is running!');

class App {
  $target = null;
  state = {
    images: {
      isLoading: false,
      data: [],
      error: null,
    },
    image: {
      isLoading: false,
      visible: false,
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
    });

    this.searchResult = new SearchResult({
      $target,
      initialState: this.state.images,
      onClick: (image) => {
        this.setState({
          ...this.state,
          image: {
            ...this.state.image,
            visible: true,
            isLoading: true,
            error: null,
          },
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
              visible: true,
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
      initState: this.state.image,
    });
  }

  setState(nextState) {
    console.log(this);
    this.state = nextState;
    this.searchResult.setState(nextState.images);
    this.imageInfo.setState(nextState.image);
  }
}
