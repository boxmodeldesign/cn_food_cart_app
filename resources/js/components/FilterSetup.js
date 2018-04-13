class FilterSetup extends React.Component {
    constructor(props) {
        super(props);
        this.updateFilter = this.updateFilter.bind(this);
    }
    updateFilter(filter, value) {
        this.props.handleChange(filter, value);
    }
    render() {
        const filters = this.props.filters;
        return (
            <div className="form-group">
                <FilterCheckbox label="Show only carts" name="cartsOnly" value={filters.cartsOnly} handleChange={this.updateFilter} />
                <FilterCheckbox label="Main square only" name="mainSquare" value={filters.mainSquare} handleChange={this.updateFilter} />
                <strong>Dietary options:</strong>
                <FilterCheckbox label="Vegetarian" name="veggie" value={filters.veggie} handleChange={this.updateFilter} />
                <FilterCheckbox label="Vegan" name="vegan" value={filters.vegan} handleChange={this.updateFilter} />
                <FilterCheckbox label="Gluten-free" name="gf" value={filters.gf} handleChange={this.updateFilter} />
            </div>
        );
    }
}