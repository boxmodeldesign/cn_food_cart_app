class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.getIcons = this.getIcons.bind(this);
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
    render() {
        const cart = this.props.cart;
        const name = cart.name;
        const dish = cart.dishes[0];
        var icons = this.getIcons();
        return (
            <div className="row">
                <div className="card card-body" data-toggle="collapse" data-target={"#"+name+"-expand"} aria-expanded="false" aria-controls={name+"-expand"}>
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
