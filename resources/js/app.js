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
                console.log(cart.name + " failed at filter 'cartsOnly': "+cart.type);
                return false;
            }
        }
        // test for location
        if (filters.mainSquare) {
            if (cart.location != "main") {
                console.log(cart.name + " failed at filter 'location': "+cart.location);
                return false;
            }
        }
        // test for veggie options
        if (filters.veggie) {
            if (!this.checkTags(cart.dishes, "veggie")) {
                console.log(cart.name + " failed at filter 'veggie'");
                return false;
            }
        }
        // test for vegan options
        if (filters.vegan) {
            if (!this.checkTags(cart.dishes, "vegan")) {
                console.log(cart.name + " failed at filter 'vegan'");
                return false;
            }
        }
        // test for gluten-free options
        if (filters.gf) {
            if (!this.checkTags(cart.dishes, "gf")) {
                console.log(cart.name + " failed at filter 'gf'");
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

class FilterCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {checked: this.props.value};
    }
    handleChange(e) {
        var val = e.target.checked;
        this.setState( {checked: val} );
        this.props.handleChange(this.props.name, val);
    }
    render() {
        const id = this.props.name+"-filter";
        return (
            <div className="custom-control custom-checkbox form-check-inline">
                <input className="custom-control-input" type="checkbox" checked={this.state.checked} onChange={this.handleChange} id={id}  />
                <label className="custom-control-label" htmlFor={id}>{this.props.label}</label>
            </div>
        );
    }
}

class FilterSetup extends React.Component {
    constructor(props) {
        super(props);
        this.updateFilter = this.updateFilter.bind(this);
    }
    updateFilter(filter, value) {
        this.props.handleChange(filter, value);
    }
    render() {
        const filters = this.props.filters;
        return (
            <div className="form-group form-inline">
                <FilterCheckbox label="Show only carts" name="cartsOnly" value={filters.cartsOnly} handleChange={this.updateFilter} />
                <FilterCheckbox label="Main square only" name="mainSquare" value={filters.mainSquare} handleChange={this.updateFilter} />
                <strong className="mr-2">Dietary options:</strong>
                <FilterCheckbox label="Vegetarian" name="veggie" value={filters.veggie} handleChange={this.updateFilter} />
                <FilterCheckbox label="Vegan" name="vegan" value={filters.vegan} handleChange={this.updateFilter} />
                <FilterCheckbox label="Gluten-free" name="gf" value={filters.gf} handleChange={this.updateFilter} />
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.parseData = this.parseData.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
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
                    "open": true,
                    "location": "main",
                    "type": "restaurant",
                    "link": "https://maps.google.com/?cid=17362000647289883045",
                    "category": "Demo",
                    "dishes": [
                        {
                            "name": "Demo Plate",
                            "type": "test",
                            "tags": ["gf", "veggie", "vegan"],
                            "notes": "This one is an example."
                        }
                    ]
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
    updateFilter(filter, value) {
        // Because we have to update the entire {filters} object when we setState, we need to update the changed filter in an intermediary and then pass that in.
        var newState = this.state.filters;
        newState[filter] = value;
        this.setState({ filters: newState }, function() {
            //console.log(filter, this.state.filters[filter]);
        });
    }
    render() {
        const msg = this.state.message;
        const filters = this.state.filters;
        const data = this.state.data;
        return (
            <div>
                {msg}
                <FilterSetup filters={filters} handleChange={this.updateFilter} />
                <CartList filters={filters} carts={data} />
            </div>
        );
    }
}