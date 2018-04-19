class FilterDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.makeOptions = this.makeOptions.bind(this);
    }
    handleChange(e) {
        this.props.handleChange(this.props.name, e.target.value);
    }
    makeOptions() {
        return this.props.options.map( (item, index) =>
            <option value={item} key={item+"-dd-"+index}>{item}</option>
        );
    }
    render() {
        const options = this.makeOptions();
        const label = this.props.label;
        const value = this.props.value;
        const id = this.props.name+"-filter-dd";
        // noLabel == true shows the label prop as the first option
        if (this.props.noLabel) {
            return (
                <div className="mt-1">
                    <select className="custom-select" value={value} onChange={this.handleChange}>
                        <option value="">{label}</option>
                        {options}
                    </select>
                </div>
            );
        // noLabel == false shows a blank first option and a <label> element
        } else {
            return (
                <div>
                    <label htmlFor={id}>{label}</label>
                    <select className="custom-select" value={value} onChange={this.handleChange} id={id}>
                        <option value=""></option>
                        {options}
                    </select>
                </div>
            );
        }
    }
}