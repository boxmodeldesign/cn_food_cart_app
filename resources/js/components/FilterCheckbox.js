class FilterCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.makeBadge = this.makeBadge.bind(this);
        this.state = {checked: this.props.value};
    }
    handleChange(e) {
        var val = e.target.checked;
        this.setState( {checked: val} );
        this.props.handleChange(this.props.name, val);
    }
    makeBadge() {
        var badge = this.props.badge;
        if (badge != undefined) {
            return (
                <span className={"ml-2 font-weight-normal text-light badge badge-pill badge-"+badge.toLowerCase()}>{badge}</span>
            );
        } else {
            return null;
        }
    }
    render() {
        const id = this.props.name+"-filter";
        const badge = this.makeBadge();
        return (
            <div className="custom-control custom-checkbox">
                <input className="custom-control-input" type="checkbox" checked={this.state.checked} onChange={this.handleChange} id={id}  />
                <label className="custom-control-label" htmlFor={id}>{this.props.label}{badge}</label>
            </div>
        );
    }
}