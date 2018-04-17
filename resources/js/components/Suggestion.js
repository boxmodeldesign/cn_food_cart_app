class Suggestion extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                {this.props.randomEatery.name} <br />
                {this.props.randomEatery.type} <br />
                {this.props.randomEatery.category} <br />
                {this.props.randomEatery.dishes[0].name}
            </div>
        )
    }
}