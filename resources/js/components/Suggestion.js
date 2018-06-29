class Suggestion extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const eatery = this.props.randomDish;
        return(
            <div className="card card-body">
                <h4>Head on over to <em>{eatery.name}</em>.</h4>
                <p>Randomly recommended menu item:</p>
                <ul>
                    <li class="font-weight-bold"><em>{eatery.dishes[0].name}</em></li>
                </ul>
                
                <p className="text-muted">{eatery.dishes[0].notes}</p>

                <p>
                    <a href={eatery.link} target="_blank" title={"See "+eatery.name+" on the map"}><i className="fa fa-map-pin"></i> {eatery.address}</a>
                </p>

                {/* This will change the 'chooseRandomly' state to 'false' to bring back the CartList view */}
                <p>
                    <button className="btn btn-primary" onClick={this.props.goBack}>
                        Back to the recommendation list
                    </button>
                </p>
            </div>
        )
    }
}