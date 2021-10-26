import { lazyLoadImage } from './utils/lazyLoadImage.js';
import { setIntersctionObserver } from './utils/intersectionObserverUtils.js';

class RandomBanner {
  $randomBanner = null;
  state = null;

  constructor({ $target, initialState, onClickPrev, onClickNext }) {
    this.$randomBanner = document.createElement('div');
    this.$randomBanner.className = 'RandomBanner';

    $target.appendChild(this.$randomBanner);

    this.state = initialState;

    this.onClickPrev = onClickPrev;
    this.onClickNext = onClickNext;

    this.render();
  }

  setState(nextState) {
    if (this.state === nextState) {
      return;
    }
    this.state = nextState;
    this.render();
  }

  render() {
    const { isLoading, data, error, bannerStartIndex } = this.state;

    if (data && data.length) {
      this.$randomBanner.innerHTML = `
        <ul class="list">
          ${data
            .slice(bannerStartIndex, bannerStartIndex + 5)
            .map(
              (cat) => `
              <li class="item" data-id="${cat.id}">
                <img src="${cat.url}" alt=${cat.name} title="${cat.name}" />
              </li>
            `
            )
            .join('')}
        </ul>
        <div class="ButtonGroup">
          <button id="prev">${'<'}</button>
          <button id="next">${'>'}</button>
        </div>
      `;

      const prevBtn = this.$randomBanner.querySelector('#prev');
      const nextBtn = this.$randomBanner.querySelector('#next');

      prevBtn.addEventListener('click', this.onClickPrev);
      nextBtn.addEventListener('click', this.onClickNext);
    }
  }
}

export default RandomBanner;
