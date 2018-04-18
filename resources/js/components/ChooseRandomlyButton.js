class ChooseRandomlyButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // This will change the 'chooseRandomly' state to 'true' and change the 'randomEatery' state to an eatery object from state.data
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.props.chooseRandomly}>
                    Choose for me!
                </button>
            </div>
        );
    }
}
