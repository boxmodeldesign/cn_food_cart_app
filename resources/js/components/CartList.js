class CartList extends React.Component {
    constructor(props) {
        super(props);
        this.makeList = this.makeList.bind(this);
        this.testFilters = this.testFilters.bind(this);
        this.checkTags = this.checkTags.bind(this);
        this.sortCartsAlpha = this.sortCartsAlpha.bind(this);
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
        if (filters.cartsOnly) {
            // test for "cart" v "restaurant"
            if (cart.type.toLowerCase() != "cart") {
                //console.log(cart.name + " failed at filter 'cartsOnly': "+cart.type);
                return false;
            }
            // test for location
            if (filters.location != "") {
                if (cart.location != filters.location) {
                    //console.log(cart.name + " failed at filter 'location': "+cart.location);
                    return false;
                }
            }
        }
        // test for cuisine
        if (filters.cuisine != "") {
            if (cart.category.indexOf(filters.cuisine) == -1) {
                //console.log(cart.name + " failed at filter: 'cuisine'");
                return false;
            }
        }
        // test for food type - getting ahead of myself
        if (filters.foodType != "") {
            var match = false;
            for (var i=0; i<cart.dishes.length; i++) {
                if (cart.dishes[i].type.indexOf(filters.foodType) != -1) {
                    match = true;
                    break;
                }
            }
            if (!match) {
                return false;
            }
        }
        // test for price range
        if (filters.price.length > 0) {
            match = false;
            for (i=0; i<filters.price.length; i++) {
                if (cart.price == filters.price[i]) {
                    match = true;
                    break;
                }
            }
            if (!match) {
                return false;
            }
        }
        // test for veggie options
        if (filters.meat) {
            if (!this.checkTags(cart.dishes, "M")) {
                //console.log(cart.name + " failed at filter 'meat'");
                return false;
            }
        }
        // test for veggie options
        if (filters.veggie) {
            if (!this.checkTags(cart.dishes, "V")) {
                //console.log(cart.name + " failed at filter 'veggie'");
                return false;
            }
        }
        // test for vegan options
        if (filters.vegan) {
            if (!this.checkTags(cart.dishes, "VG")) {
                //console.log(cart.name + " failed at filter 'vegan'");
                return false;
            }
        }
        // test for gluten-free options
        if (filters.gf) {
            if (!this.checkTags(cart.dishes, "GF")) {
                //console.log(cart.name + " failed at filter 'gf'");
                return false;
            }
        }
        // We made it!
        return true;
    }
    sortCartsAlpha(a, b) {
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();
        if (aName < bName) {
            return -1;
        } else if (aName > bName) {
            return 1;
        } else {
            return 0;
        }
    }
    makeList() {
        var list = [];
        this.props.carts.forEach(cart => {
            if (this.testFilters(cart) && cart.open) {
                list.push(cart);
            }
        });
        return list.sort(this.sortCartsAlpha).map( (item, index) =>
            <Cart cart={item} filters={this.props.filters} key={"cart"+index} />
        );
    }
    render() {
        var carts = this.makeList();
        return (
            <div>
                {carts}
                <div className="row no-results">
                    <div className="card card-body">
                        <h4>Sorry!</h4>
                        <p>We don't have any recommendations that meet those filters. Adjust or clear your search and we'll try again.</p>
                    </div>
                </div>
            </div>
        );
    }
}