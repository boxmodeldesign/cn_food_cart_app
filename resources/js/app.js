class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateFilter = this.updateFilter.bind(this);
        this.chooseRandomly = this.chooseRandomly.bind(this);
        this.notChooseRamdonly = this.notChooseRamdonly.bind(this);
        this.getCuisine = this.getCuisine.bind(this);
        this.getFoodTypes = this.getFoodTypes.bind(this);
        this.state = {
            chooseRandomly: false,
            randomEatery: null,
            filters: {
                cartsOnly: false,
                mainSquare: false,
                cuisine: "",
                foodType: "",
                // If you add a new filter based on dish tags, be sure to do so here, in <CartList />, <Cart />, and <FilterSetup />
                meat: false,
                veggie: false,
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
                //parse the not-quite-right JSON to match our previous structure
                var raw = JSON.parse(this.responseText);
                var clean = [];
                raw.forEach(item => {
                    var temp = item;
                    temp.dishes = [];
                    for (var i=1;i<4;i++) {
                        // check that data exists
                        if (temp["dishname"+i] != "" && temp["dishname"+i] != undefined) {
                            var d = {};
                            // set the dish props
                            d.name = temp["dishname"+i];
                            d.type = temp["dishtype"+i]
                            // array-ify the tags
                            d.tags = temp["dishtags"+i].split(", ");
                            d.notes = temp["dishnotes"+i];
                            // push it to dishes
                            temp.dishes.push(d);
                            // clear the useless props
                            temp["dishname"+i] = "";
                            temp["dishtype"+i] = "";
                            temp["dishtags"+i] = "";
                            temp["dishnotes"+i] = "";
                        }
                    }
                    // push the formatted object to the clean array
                    clean.push(temp);
                });
                // set the state to the polished array
                scope.setState( {data: clean} );
            }
        }
        openData.open("get", "resources/data/test.json", true);
        openData.send();
    }
    updateFilter(filter, value) {
        // Because we have to update the entire {filters} object when we setState, we need to update the changed filter in an intermediary and then pass that in.
        var newState = this.state.filters;
        newState[filter] = value;
        // FoodType is an odd duck in that its options change depending on the value of cuisine, so this is a special check to see if cuisine has been changed and if so, clear foodType. If we build other co-dependent features, we should refactor this.
        if (filter == "cuisine") {
            newState.foodType = "";
        }
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
        return cuisines.sort();
    }

    getFoodTypes() {
        var data = this.state.data;
        var cuisine = this.state.filters.cuisine;
        var foods = [];
        if (cuisine != "") {
            data.forEach(cart => {
                if (cart.category == cuisine) {
                    for (var i=0; i<cart.dishes.length; i++) {
                        if (foods.indexOf(cart.dishes[i].type) == -1) {
                            foods.push(cart.dishes[i].type);
                        }
                    }
                }
            });
        } else {
            data.forEach(cart => {
                for (var i=0; i<cart.dishes.length; i++) {
                    if (foods.indexOf(cart.dishes[i].type) == -1) {
                        foods.push(cart.dishes[i].type);
                    }
                }
            });
        }
        return foods.sort();
    }

    render() {
        const msg = this.state.message;
        const filters = this.state.filters;
        const data = this.state.data;
        const randomEatery = this.state.randomEatery;
        var cuisines = this.getCuisine();
        var foodTypes = this.getFoodTypes();

        return (
            <div className="row">
                <div className="col-md-3">
                    <FilterSetup filters={filters} handleChange={this.updateFilter} chooseRandomly={this.chooseRandomly} cuisineList={cuisines} foodList={foodTypes} />
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