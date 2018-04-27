class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {toggle: true};
        this.getIcons = this.getIcons.bind(this);
        this.getDish = this.getDish.bind(this);
         this.addActiveClass = this.addActiveClass.bind(this);
         const food = this.props.cart.dishes;
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
            if (dishes[i].tags.length >= checks.length) {
                var match = true;
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
        // if no dish matched all filters, return the first one
        return dishes[0];
    }



    addActiveClass(){
        this.setState((prevState) => ({
        toggle: !prevState.toggle
         })
     );
    }
    render() {
        const cart = this.props.cart;
        const name = cart.name;
        const dish = this.getDish();
        var icons = this.getIcons();
        return (
            <div className="row mb-1">
                <div className="card card-body cart" id="cart" data-toggle="collapse" data-target={"#"+name+"-expand"} aria-expanded="false" aria-controls={name+"-expand"} onClick={this.addActiveClass}>
                    <div className="row flex-wrap">
                        <h4 className="col-auto mr-auto">{name}</h4>
                        <span className="icons col-auto">{icons}</span>
                    </div>
                    <p>Try the {dish.name}!</p>
                    <span className="cart_chevron text-muted"> <i  className={this.state.toggle ? 'fa fa-chevron-down' : 'fa fa-chevron-down fa-rotate-180'} ></i></span>
                    <div className="collapse" id={name+"-expand"}>
                        <p className="text-muted">{dish.notes}</p>
                        <p><a href={cart.link} target="_blank" title={"See "+name+" on the map"}><i className="fa fa-map-pin"></i> {cart.address}</a></p>
                    </div>
                </div>
            </div>
        );
    }
}
