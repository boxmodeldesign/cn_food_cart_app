class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toggle: true};
        this.getIcons = this.getIcons.bind(this);
        this.getDish = this.getDish.bind(this);
        this.addActiveClass = this.addActiveClass.bind(this);
        this.getSecondDish = this.getSecondDish.bind(this);
        const food = this.props.cart.dishes;
    }
    getSecondDish() {
        var dishes = this.props.cart.dishes;
        var x = [];
        for (var i=0;i<dishes.length;i++) {
            x.push(dishes[i]);
        }
        return x.map( (dish, index) =>
            <p key={dish.name+index}>{dish.name} {dish.tags}</p>
        );
    }
    getIcons() {
        var dishes = this.props.cart.dishes;
        var icons = [];
        for (var i=0; i<dishes.length; i++) {
            for (var j=0; j<dishes[i].tags.length; j++) {
                if (icons.indexOf(dishes[i].tags[j]) == -1) {
                    icons.push(dishes[i].tags[j]);
                }
            }
        }
        return icons.sort().map( (tag, index) =>
            <span className={"ml-2 font-weight-normal text-light badge badge-pill badge-"+tag.toLowerCase()} key={this.props.cart.name+"-"+tag}>{tag}</span>
        );
    }
    getDish() {
        // Try to recommend a dish that matches all of the user's filters
        var dishes = this.props.cart.dishes;
        var filters = this.props.filters;
        var checks = [];
        // state.filters names
        var against = ["meat", "veggie", "vegan", "gf"];
        // tag names
        var tags = ["M", "V", "VG", "GF"];
        for (var i=0; i<against.length; i++) {
            if (filters[against[i]]) {
                checks.push(tags[i]);
            }
        };
        for (var i=0; i<dishes.length; i++) {
            // first check that it's the right type of food
            if (filters.foodType == "" || dishes[i].type.indexOf(filters.foodType) != -1) {
                // then check that the dish even has enough tags to maybe work
                if (dishes[i].tags.length >= checks.length) {
                    var match = true;
                    // then make sure it has all the ones it needs
                    for (var j=0; j<checks.length; j++) {
                        if (dishes[i].tags.indexOf(checks[j]) == -1) {
                            match = false;
                            break;
                        }
                    }
                    // if a dish met all filters, return it as the featured dish
                    if (match) {
                        return dishes[i];
                    }
                }
            }
        }
        // if no dish matched all filters, return the first one
        return dishes[0];
    }



    addActiveClass() {
        this.setState( (prevState) => ({
            toggle: !prevState.toggle
        }) );
    }


    render() {
        const cart = this.props.cart;
        const name = cart.name;
        const dishes = this.getSecondDish();
        const dish = this.getDish();
        var icons = this.getIcons();
        return (
            <div className="row mb-1">
                <div className="card card-body cart" id="cart" data-toggle="collapse" data-target={"#"+name+"-expand"} aria-expanded="false" aria-controls={name+"-expand"} onClick={this.addActiveClass}>
                    <div className="row flex-wrap">
                        <h4 className="col-auto">{name}</h4>
                        <h4 className="price-icon"> {cart.price}</h4>
                        <span className="icons col-auto">{icons}</span>
                    </div>
                    <p><a href={cart.link} target="_blank" title={"See "+name+" on the map"}><i className="fa fa-map-pin"></i> {cart.address}</a></p>
                    <span className="cart_chevron text-muted"><i className={this.state.toggle ? 'fa fa-chevron-down' : 'fa fa-chevron-down fa-rotate-180'}></i></span>
                    <div className="collapse" id={name+"-expand"}>
                        <div className="border m-3 p-3">
                            <p>{dish.name}</p>
                            <p className="text-muted">{dish.notes}</p>
                        </div>
                        <div className="card card-body">
                            {dishes}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
