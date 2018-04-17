class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateFilter = this.updateFilter.bind(this);
        this.chooseRandomly = this.chooseRandomly.bind(this);
        this.state = {
            message: "Hello World!",
            chooseRandomly: false,
            randomEatery: null,
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
        var scope = this;
        var openData = new XMLHttpRequest();
        openData.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                scope.setState( {data: JSON.parse(this.responseText)} );
            }
        }
        openData.open("get", "resources/data/src.json", true);
        openData.send();
    }
    updateFilter(filter, value) {
        // Because we have to update the entire {filters} object when we setState, we need to update the changed filter in an intermediary and then pass that in.
        var newState = this.state.filters;
        newState[filter] = value;
        this.setState({ filters: newState });
    }

    chooseRandomly(e){
        // Prevent the page from reloading
        e.preventDefault();

        let maxEateries = this.state.data.length;
        let randNum = Math.floor(Math.random() * Math.floor(maxEateries));

        // Choose a random index from the eatery data array 
        let randomEatery = this.state.data[randNum];

        this.setState({chooseRandomly: true, randomEatery: randomEatery});
    }

    render() {
        const msg = this.state.message;
        const filters = this.state.filters;
        const data = this.state.data;
        const randomEatery = this.state.randomEatery;

        return (
            <div className="row">
                <div className="col-3">
                    <FilterSetup filters={filters} handleChange={this.updateFilter} chooseRandomly={this.chooseRandomly} />
                </div>
                <div className="col-9">
                    {this.state.chooseRandomly === true 
                    ? <Suggestion randomEatery={randomEatery} />
                    : <CartList filters={filters} carts={data} />
                    }
                </div>
            </div>
        );
    }
}