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
        const chooseRandomly = this.props.chooseRandomly;
        const cuisineList = this.props.cuisineList;
        const foodList = this.props.foodList;

        return (
            <form>
                <div className="form-group">
                    <strong>Show me:</strong>
                    <FilterCheckbox label="Carts only" name="cartsOnly" value={filters.cartsOnly} handleChange={this.updateFilter} />
                    {/* Ben - removed for now
                    <FilterCheckbox label="Alder square only" name="mainSquare" value={filters.mainSquare} handleChange={this.updateFilter} />
                    */}
                </div>
                <div className="form-group">
                    <strong>Type of food:</strong>
                    <FilterDropdown noLabel={true} label="Any cuisine" options={cuisineList} name="cuisine" value={filters.cuisine} handleChange={this.updateFilter} />
                    <FilterDropdown noLabel={true} label="Any dish" options={foodList} name="foodType" value={filters.foodType} handleChange={this.updateFilter} />
                </div>
                <div className="form-group">
                    <strong>Dietary options:</strong>
                    <FilterCheckbox label="Gluten-free" badge="GF" name="gf" value={filters.gf} handleChange={this.updateFilter} />
                    <FilterCheckbox label="Meat" badge="M" name="meat" value={filters.meat} handleChange={this.updateFilter} />
                    <FilterCheckbox label="Vegetarian" badge="V" name="veggie" value={filters.veggie} handleChange={this.updateFilter} />
                    <FilterCheckbox label="Vegan" badge="VG" name="vegan" value={filters.vegan} handleChange={this.updateFilter} />
                </div>
                <div className="form-group">
                    <ChooseRandomlyButton chooseRandomly={chooseRandomly} />
                </div>
            </form>
        );
    }
}