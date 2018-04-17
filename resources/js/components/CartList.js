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
            <Cart cart={item} filters={this.props.filters} key={"cart"+index} />
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