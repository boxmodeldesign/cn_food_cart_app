class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateFilter = this.updateFilter.bind(this);
        this.chooseRandomly = this.chooseRandomly.bind(this);
        this.notChooseRamdonly = this.notChooseRamdonly.bind(this);
        this.getCuisine = this.getCuisine.bind(this);
        this.state = {
            message: "Hello World!",
            chooseRandomly: false,
            randomEatery: null,
            filters: {
                cartsOnly: true,
                mainSquare: false,
                cuisine: "",
                foodType: "",
                // unfortunately, to add new dish-tag filters, you need to do so here, in <CartList />, <Cart />, and <FilterSetup />
                meat: false,
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

    notChooseRamdonly(e){
        e.preventDefault();
        this.setState({chooseRandomly: false});
    }

    getCuisine() {
        var data = this.state.data;
        var cuisines = [];
        data.forEach(cart => {
            if (cuisines.indexOf(cart.category) == -1) {
                cuisines.push(cart.category);
            }
        });
        return cuisines;
    }

    render() {
        const msg = this.state.message;
        const filters = this.state.filters;
        const data = this.state.data;
        const randomEatery = this.state.randomEatery;
        var cuisines = this.getCuisine();

        return (
            <div className="row">
                <div className="col-md-3">
                    <FilterSetup filters={filters} handleChange={this.updateFilter} chooseRandomly={this.chooseRandomly} cuisineList={cuisines} />
                </div>
                <div className="col-md-8 offset-md-1">
                    {this.state.chooseRandomly === true 
                    ? <Suggestion randomEatery={randomEatery} goBack={this.notChooseRamdonly} />
                    : <CartList filters={filters} carts={data} />
                    }
                </div>
            </div>
        );
    }
}