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
            <div className="form-group form-inline">
                <FilterCheckbox label="Show only carts" name="cartsOnly" value={filters.cartsOnly} handleChange={this.updateFilter} />
                <FilterCheckbox label="Main square only" name="mainSquare" value={filters.mainSquare} handleChange={this.updateFilter} />
                <strong className="mr-2">Dietary options:</strong>
                <FilterCheckbox label="Vegetarian" name="veggie" value={filters.veggie} handleChange={this.updateFilter} />
                <FilterCheckbox label="Vegan" name="vegan" value={filters.vegan} handleChange={this.updateFilter} />
                <FilterCheckbox label="Gluten-free" name="gf" value={filters.gf} handleChange={this.updateFilter} />
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.parseData = this.parseData.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.state = {
            message: "Hello World!",
            filters: {
                cartsOnly: true,
                mainSquare: false,
                veggie: true,
                vegan: false,
                gf: false
            },
            data: []
        };
    }
    componentWillMount() {
        var root = this;
        //Bring this back to use the JSON
        var openData = new XMLHttpRequest();
        openData.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                root.setState( {data: JSON.parse(this.responseText)} );
            }
        }
        openData.open("get", "resources/data/src.json", true);
        openData.send();
    }
    parseData(e) {
        var a = JSON.parse(this.responseText);
        console.log(a);
        //this.setState( {data: a} );
    }
    updateFilter(filter, value) {
        // Because we have to update the entire {filters} object when we setState, we need to update the changed filter in an intermediary and then pass that in.
        var newState = this.state.filters;
        newState[filter] = value;
        this.setState({ filters: newState }, function() {
            //console.log(filter, this.state.filters[filter]);
        });
    }
    render() {
        const msg = this.state.message;
        const filters = this.state.filters;
        const data = this.state.data;
        return (
            <div>
                {msg}
                <FilterSetup filters={filters} handleChange={this.updateFilter} />
                <CartList filters={filters} carts={data} />
            </div>
        );
    }
}