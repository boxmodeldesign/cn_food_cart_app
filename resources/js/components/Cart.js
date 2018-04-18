class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.getIcons = this.getIcons.bind(this);
        this.getDish = this.getDish.bind(this);
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
        return icons.map( (tag, index) =>
            <span className="font-weight-light badge badge-pill badge-success mr-2" key={this.props.cart.name+"-"+tag}>{tag}</span>
        );
    }
    getDish() {
        // Try to recommend a dish that matches all of the user's filters
        var dishes = this.props.cart.dishes;
        var filters = this.props.filters;
        var checks = [];
        var against = ["meat", "veggie", "vegan", "gf"];
        against.forEach(tag => {
            if (filters[tag]) {
                checks.push(tag);
            }
        });
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
    render() {
        const cart = this.props.cart;
        const name = cart.name;
        const dish = this.getDish();
        var icons = this.getIcons();
        return (
            <div className="row">
                <div className="card card-body cart" data-toggle="collapse" data-target={"#"+name+"-expand"} aria-expanded="false" aria-controls={name+"-expand"}>
                    <h4>{name} <small className="ml-2">{icons}</small></h4>
                    <p>Try the {dish.name}!</p>
                    <div className="collapse" id={name+"-expand"}>
                        <p className="text-muted">{dish.notes}</p>
                        <p><a href={cart.link} target="_blank" title={"See "+name+" on the map"}><i className="material-icons">place</i> View on map</a></p>
                    </div>
                </div>
            </div>
        );
    }
}
