class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(isAvailable) {
        this.available = isAvailable;
    }
}

class GoodsList {
    #goods
    constructor(filter, sortPrice, sortDir) {
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    add(good) {
        this.#goods.push(good)
    }

    remove(id) {
        let goodId = this.#goods.findIndex(good => good.id == id);
        if (goodId != undefined) {
            this.#goods.splice(goodId, 1);
        }
        return goodId;
    }

    get list() {
        let goodsList = this.#goods.filter(good => this.filter.test(good.name));
        if (!this.sortPrice) {
            return goodsList;
        }
        if (this.sortDir) {
            return goodsList.sort((good1, good2) => good1.price - good2.price);
        }
        return goodsList.sort((good1, good2) => good2.price - good1.price);
    }
}

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = []
    }

    get totalAmount() {
        return this.goods.reduce((acc, good) => acc + good.amount, 0)
        
    }

    get totalSum() {
        return this.goods.reduce((acc, good) => acc + good.amount * good.price, 0)
    }

    add(good, amount) {
        let goodId = this.goods.findIndex(idx => idx.id == good.id);
        if (goodId >= 0) {
            this.goods[goodId].amount += amount 
        } else {
            let newGood = new BasketGood(good.id, good.name, good.description, good.sizes, good.price, good.available, amount)
            this.goods.push(newGood)
        }
    }

    remove(good, amount) {
        let goodId = this.goods.findIndex(idx => idx.id == good.id);
        if (goodId === -1) {
            return
        }
        this.goods[goodId].amount -= amount
        if (this.goods[goodId].amount <= 0) {
            this.goods.splice(goodId, 1);
        }  
    }

    clear() {
        this.goods = []
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available)
        return this.goods
    }
}

const good1 = new Good(1, 'good1', 'Описание1', ['xs', 's', 'l'], 1100, true);
const good2 = new Good(2, 'good2', 'Описание2', ['xs', 's'], 2300, true);
const good3 = new Good(3, 'good3', 'Описание3', ['xs', 's', 'l', 'xl'], 350, false);
const good4 = new Good(4, 'good4', 'Описание4', ['xs', 's', 'l', 'xxl'], 1400, false);
const good5 = new Good(5, 'good5', 'Описание5', ['s', 'l', 'xl'], 590, true);

// good4.setAvailable(true)

let catalog = new GoodsList(/./, false, false)
catalog.add(good1);
catalog.add(good2);
catalog.add(good3);
catalog.add(good4);
catalog.add(good5);

// console.log(catalog.list);
// catalog.remove(3)
catalog.sortPrice = true;
catalog.sortDir = true;
// console.log(catalog.list)

let basket = new Basket();

basket.add(good1, 1);
basket.add(good2, 1);
basket.add(good3, 1);
basket.add(good4, 1);
basket.add(good5, 2);

// console.log(basket.totalAmount);
// console.log(basket.totalSum);

basket.remove(good5, 2)
// console.log(basket.totalAmount);
// console.log(basket.totalSum);
// basket.clear()
basket.removeUnavailable()
// console.log(basket.goods)
// console.log(basket.totalAmount);
// console.log(basket.totalSum);

