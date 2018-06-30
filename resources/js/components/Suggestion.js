class Suggestion extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const eatery = this.props.randomDish;
        return(
            <div className="card card-body">
                {eatery.link.startsWith('no more left')
                    ? /* there are no more dishes to randomly display. state.unchosenDishes is 0 */
                    <p>
                        You cycled through all of the suggestions!
                        <br />
                        Click the button below to see all the food options again.
                    </p>
                    : /* display a random dish's info */
                    <div>
                        <h4>Head on over to <em>{eatery.name}</em>.</h4>
                        <p>Randomly recommended menu item:</p>
                        <ul>
                            <li className="font-weight-bold"><em>{eatery.dishes[0].name}</em></li>
                        </ul>
                        
                        <p className="text-muted">{eatery.dishes[0].notes}</p>
                        
                        <p>
                            <a href={eatery.link} target="_blank" title={"See "+eatery.name+" on the map"}><i className="fa fa-map-pin"></i> {eatery.address}</a>
                        </p>
                    </div>
                }
          
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