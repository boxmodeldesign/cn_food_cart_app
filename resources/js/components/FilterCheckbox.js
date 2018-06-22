class FilterCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.makeBadge = this.makeBadge.bind(this);
        var filterVal;
        if (!this.props.shared) {
            filterVal = this.props.value;
        } else {
            if (this.props.value.indexOf(this.props.element) == -1) {
                filterVal = false;
            } else {
                filterVal = true;
            }
        }
        this.state = {checked: filterVal};
    }
    handleChange(e) {
        var val = e.target.checked;
        if (this.props.shared) {
            // if this is a shared checkbox (multiple boxes related to the same filter), then we want to splice this element if it's currently in the filter array and push it if it's not. Then, handleChange() with the updated array, not the value of the checkbox.
            var valArray = this.props.value;
            if (!val) {
                valArray.splice(this.props.value.indexOf(this.props.element), 1);
            } else {
                valArray.push(this.props.element);
            }
            this.props.handleChange(this.props.name, valArray);
        } else {
            // if this is just one checkbox for one filter, easy-peasy
            this.props.handleChange(this.props.name, val);
        }
        // the "checked" state needs to reflect the individual checkbox, and can't accept an array, so this is always set to val
        this.setState( {checked: val} );
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
        const id = this.props.name+"-"+this.props.element+"-filter";
        const badge = this.makeBadge();
        return (
            <div className="custom-control custom-checkbox">
                <input className="custom-control-input" type="checkbox" checked={this.state.checked} onChange={this.handleChange} id={id}  />
                <label className="custom-control-label" htmlFor={id}>{this.props.label}{badge}</label>
            </div>
        );
    }
}