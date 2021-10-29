import { numberWithCommas } from './utils.js';

class ProductListPage {
  $target = null;
  state = null;

  constructor($target, initialState, routeProps) {
    this.state = initialState;
    this.routeProps = routeProps;

    this.$productListPage = document.createElement('div');
    this.$productListPage.className = 'ProductListPage';
    $target.appendChild(this.$productListPage);

    this.$productListPage.addEventListener('click', this.handleClickItem);

    this.render();
  }

  setState(nextState) {
    if (this.state === nextState) {
      return;
    }
    this.state = nextState;
    this.render();
  }

  handleClickItem = (e) => {
    const targetItem = e.target.closest('.Product');
    if (targetItem) {
      const productId = targetItem.dataset['id'];
      const path = `/web/products/${productId}`;
      this.routeProps.push(path);
    }
  };

  render() {
    const { isLoading, data: products, error } = this.state;

    this.$productListPage.innerHTML = `
            <h1>상품목록</h1>
            <ul>
                ${products
                  .map(
                    (product) => `
                    <li class="Product" data-id="${product.id}">
                        <img src="${product.imageUrl}">
                        <div class="Product__info">
                            <div>${product.name}</div>
                            <div>${numberWithCommas(product.price)}원~</div>
                        </div>
                    </li>
                `
                  )
                  .join('')}
            </ul>
        `;
  }
}

export default ProductListPage;
