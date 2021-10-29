import ProductListPage from './components/ProductListPage.js';
import ProductDetailPage from './components/ProductDetailPage.js';
import CartPage from './components/CartPage.js';
import { api } from './api.js';

class App {
  $target = null;
  state = {
    path: location.pathname,
    products: {
      isLoading: false,
      data: [],
      error: null,
    },
  };

  constructor($target) {
    this.$target = $target;

    const { path } = this.state;
    if (path === '/web/') {
      this.productListPage = new ProductListPage(
        this.$target,
        this.state.products,
        { push: this.push, goBack: this.goBack }
      );
    } else if (path.startsWith('/web/products/')) {
      this.productDetailPage = new ProductDetailPage(this.$target, {
        push: this.push,
        goBack: this.goBack,
      });
    } else if (path === '/web/cart') {
      this.cartPage = new CartPage(this.$target);
    } else {
      // TODO: Page Not Found
    }

    this.fetchProducts();
  }

  setState(nextState) {
    if (this.state === nextState) {
      return;
    }
    this.state = nextState;
    this.render();

    this.productListPage.setState(this.state.products);
  }

  push = (path) => {
    if (path === this.state.path) return;
    history.pushState({ path }, '', path);
    this.setState({
      ...this.state,
      path,
    });
  };

  goBack = () => {
    history.back();
  };

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

  async fetchProducts() {
    this.setAsyncLoadingState('products');
    try {
      const data = await api.fetchProducts();
      this.setAsyncSuccessState('products', data);
    } catch (err) {
      this.setAsyncFailState('products', err);
    }
  }

  render() {
    this.$target.innerHTML = '';
    const { path } = this.state;
    if (path === '/web/') {
      this.productListPage = new ProductListPage(
        this.$target,
        this.state.products,
        { push: this.push, goBack: this.goBack }
      );
    } else if (path.startsWith('/web/products/')) {
      this.productDetailPage = new ProductDetailPage(this.$target, {
        push: this.push,
        goBack: this.goBack,
      });
    } else if (path === '/web/cart') {
      this.cartPage = new CartPage(this.$target);
    } else {
      // TODO: Page Not Found
    }
  }
}

export default App;
