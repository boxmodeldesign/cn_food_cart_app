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
        const foodData = this.props.foodData;
        const chooseRandomly = this.props.chooseRandomly;
        const cuisineList = this.props.cuisineList;

        return (
            <form>
                <div className="form-group">
                    <strong>Show me:</strong>
                    <FilterCheckbox label="Carts only" name="cartsOnly" value={filters.cartsOnly} handleChange={this.updateFilter} />
                    <FilterCheckbox label="Alder square only" name="mainSquare" value={filters.mainSquare} handleChange={this.updateFilter} />
                </div>
                <div className="form-group">
                    <strong>With this type of food:</strong>
                    <FilterDropdown noLabel={true} label="Any cuisine" options={cuisineList} name="cuisine" value={filters.cuisine} handleChange={this.updateFilter} />
                </div>
                <div className="form-group">
                    <strong>With these options:</strong>
                    <FilterCheckbox label="Meat" name="meat" value={filters.meat} handleChange={this.updateFilter} />
                    <FilterCheckbox label="Vegetarian" name="veggie" value={filters.veggie} handleChange={this.updateFilter} />
                    <FilterCheckbox label="Vegan" name="vegan" value={filters.vegan} handleChange={this.updateFilter} />
                    <FilterCheckbox label="Gluten-free" name="gf" value={filters.gf} handleChange={this.updateFilter} />
                </div>
                <div className="form-group">
                    <ChooseRandomlyButton chooseRandomly={chooseRandomly} />
                </div>
            </form>
        );
    }
}