class Cart extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const cart = this.props.cart;
        const name = cart.name;
        const dish = cart.dishes[0];
        return (
            <div className="row">
                <div className="card card-body">
                    <h4>{name}</h4>
                    <p>Try the {dish.name}!</p>
                </div>
            </div>
        );
    }
}

class CartList extends React.Component {
    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
        this.testFilters = this.testFilters.bind(this);
        this.checkTags = this.checkTags.bind(this);
    }
    checkTags(dishes, param) {
        for (var i=0;i<dishes.length;i++) {
            if (dishes[i].tags.indexOf(param) != -1) {
                return true;
            }
        }
        return false;
    }
    testFilters(cart) {
        var filters = this.props.filters;
        // test for "cart" v "restaurant"
        if (filters.cartsOnly) {
            if (cart.type != "cart") {
                return false;
            }
        }
        // test for location
        if (filters.mainSquare) {
            if (cart.location != "main") {
                return false;
            }
        }
        // test for veggie options
        if (filters.veggie) {
            if (!this.checkTags(cart.dishes, "veggie")) {
                return false;
            }
        }
        // test for vegan options
        if (filters.vegan) {
            if (!this.checkTags(cart.dishes, "vegan")) {
                return false;
            }
        }
        // test for gluten-free options
        if (filters.gf) {
            if (!this.checkTags(cart.dishes, "gf")) {
                return false;
            }
        }
        // We made it!
        return true;
    }
    makeList() {
        var list = [];
        this.props.carts.forEach(cart => {
            if (this.testFilters(cart) && cart.open) {
                list.push(cart);
            }
        });
        return list.map( (item, index) =>
            <Cart cart={item} key={"cart"+index} />
        );
    }
    render() {
        var carts = this.makeList();
        return (
            <div>
                {carts}
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.parseData = this.parseData.bind(this);
        this.state = {
            message: "Hello World!",
            filters: {
                cartsOnly: true,
                mainSquare: false,
                veggie: true,
                vegan: false,
                gf: false
            },
            // This was supposed to be in src.json but the parse isn't working so it's here for now.
            data: [
                {
                    "name": "Tito's Tacos",
                    "open": true,
                    "location": "main",
                    "type": "cart",
                    "link": "https://maps.google.com/?cid=1956414439244754021",
                    "category": "Mexican",
                    "dishes": [
                        {
                            "name": "Chicken Burrito",
                            "type": "burrito",
                            "tags": ["meat"],
                            "notes": "Rice, beans, chicken. Real good."
                        },
                        {
                            "name": "Veggie Burrito",
                            "type": "burrito",
                            "tags": ["veggie", "vegan"],
                            "notes": "Can be made vegan on request."
                        }
                    ]
                },
                {
                    "name": "Bombay Chaat House",
                    "open": true,
                    "location": "12th & Yamhill",
                    "type": "cart",
                    "link": "https://maps.google.com/?cid=17362000647289883045",
                    "category": "Indian",
                    "dishes": [
                        {
                            "name": "Lunch Special",
                            "type": "curry",
                            "tags": ["veggie", "vegan"],
                            "notes": "3 curries, rice, and naan. Try an iced chai for $2."
                        }
                    ]
                },
                {
                    "name": "Another Example",
                    "open": false,
                    "location": "main",
                    "type": "restaurant"
                }
            ]
        };
    }
    componentWillMount() {
        //Bring this back to use the JSON
        /*var openData = new XMLHttpRequest();
        openData.onload = this.parseData();
        openData.open("get", "resources/data/src.json", true);
        openData.send();*/
    }
    parseData(e) {
        var a = JSON.stringify(this.responseText);
        console.log(a);
        console.log("data: "+this.state.data);
    }
    render() {
        const msg = this.state.message;
        const filters = this.state.filters;
        const data = this.state.data;
        return (
            <div>
                {msg}
                <CartList filters={filters} carts={data} />
            </div>
        );
    }
}