class FilterCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {checked: this.props.value};
    }
    handleChange(e) {
        var val = e.target.checked;
        this.setState( {checked: val} );
        this.props.handleChange(this.props.name, val);
    }
    render() {
        const id = this.props.name+"-filter";
        return (
            <div className="custom-control custom-checkbox form-check-inline">
                <input className="custom-control-input" type="checkbox" checked={this.state.checked} onChange={this.handleChange} id={id}  />
                <label className="custom-control-label" htmlFor={id}>{this.props.label}</label>
            </div>
        );
    }
}