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
