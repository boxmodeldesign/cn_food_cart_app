class Suggestion extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const eatery = this.props.randomEatery;
        return(
            <div>
                <p>Head on over to <em>{eatery.name}</em> for the <em>{eatery.dishes[0].name}</em>.</p>
                
                <p class="text-muted">{eatery.dishes[0].notes}</p>

                Location: <a href={eatery.link} target="_blank" title={"See "+eatery.name+" on the map"}><i className="material-icons">place</i>{eatery.location}</a>

                <br /> <br />

                <button onClick={this.props.goBack}>
                    Back to the recommendation list
                </button>
            </div>
        )
    }
}