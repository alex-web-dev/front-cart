export class FrontCart {
  constructor(options) {
    this.productClass = options.productClass;
    this.cartAddClass = options.cartAddClass;
    this.cartDeleteClass = options.cartDeleteClass;
    this.cartDecClass = options.cartDecClass;

    this.render();
  }

  render() {
    const cartAddBtns = document.querySelectorAll(`.${this.cartAddClass}`);
    cartAddBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const product = btn.closest(`.${this.productClass}`);
        const data = {};

        for (let dataItem of Object.keys(product.dataset)) {
          if (dataItem.includes('cart')) {
            data[dataItem] = isNum(product.dataset[dataItem]) ?
              +product.dataset[dataItem] :
              product.dataset[dataItem];
          }
        }

        this.addItem(data);
      });
    });

    const cartDeleteBtns = document.querySelectorAll(`.${this.cartDeleteClass}`);
    cartDeleteBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const product = btn.closest(`.${this.productClass}`);
        const id = +product.dataset.cartId;
        this.removeItem(id);
      });
    });

    const cartDecBtns = document.querySelectorAll(`.${this.cartDecClass}`);
    cartDecBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const product = btn.closest(`.${this.productClass}`);
        const id = +product.dataset.cartId;
        this.decItem(id);
      });
    });
  }

  addItem(data) {
    const storage = this.get();
    const product = data;
    product.cartQuantity = 1;

    if (!storage) {
      const storage = [product];
      this.set(storage);
      return;
    }

    for (let item of storage) {
      if (item.cartId === product.cartId) {
        item.cartQuantity++;
        this.set(storage);
        return;
      }
    }

    storage.push(product);
    this.set(storage);
  }

  decItem(id) {
    const storage = this.get();
    console.log(storage, id);
    
    if (!storage || !id || !this.hasItem(+id)) {
      return false;
    }

    storage.forEach((item, index) => {
      if (item.cartId === id) {
        if (item.cartQuantity > 1) {
          item.cartQuantity--;
        } else {
          storage.splice(index, 1);
        }
      }
    });

    this.set(storage);
  }

  removeItem(id) {
    const storage = this.get();
    if (!storage || !id || !this.hasItem(+id)) {
      return false;
    }

    storage.forEach((item, index) => {
      if (item.cartId === id) {
        storage.splice(index, 1);
      }
    });

    this.set(storage);
  }

  hasItem(id) {
    const storage = this.get();
    if (!storage) {
      return false;
    }

    for (let item of storage) {
      if (item.cartId === id) {
        return true;
      }
    }

    return false;
  }

  get() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  set(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem('cart');
  }
}

function isNum(num){
  return !isNaN(num)
}