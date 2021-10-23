class ImageInfo {
  $imageInfo = null;
  state = null;

  constructor({ $target, initialState }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyup = this.handleKeyup.bind(this);

    $imageInfo.addEventListener('click', this.handleClick);
    document.addEventListener('keyup', this.handleKeyup);

    this.state = initialState;

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  closeImage() {
    this.setState({
      ...this.state,
      visible: false,
    });
  }

  handleClick(e) {
    if (e.target.className === 'ImageInfo' || e.target.className === 'close') {
      this.closeImage();
    }
  }

  handleKeyup(e) {
    if (e.key === 'Escape') {
      this.closeImage();
    }
  }

  render() {
    this.$imageInfo.style.display = this.state.visible ? 'block' : 'none';

    if (this.state.isLoading) {
      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div style="width: 50vw; height: 50vh; display: flex; justify-content: center; align-items: center;">Loading...</div>
        </div>`;
      return;
    }

    if (this.state.error) {
      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div style="width: 50vw; height: 50vh; display: flex; justify-content: center; align-items: center;">${this.state.error}</div>
        </div>`;
      return;
    }

    if (this.state.visible) {
      const { name, url, temperament, origin } = this.state.data;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
    }
  }
}

export default ImageInfo;
