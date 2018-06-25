class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateFilter = this.updateFilter.bind(this);
        this.chooseRandomly = this.chooseRandomly.bind(this);
        this.notChooseRamdonly = this.notChooseRamdonly.bind(this);
        this.getCuisine = this.getCuisine.bind(this);
        this.getFoodTypes = this.getFoodTypes.bind(this);
        this.getLocations = this.getLocations.bind(this);
        this.cleanJSON = this.cleanJSON.bind(this);
        this.state = {
            chooseRandomly: false,
            randomDish: null,
            filters: {
                cartsOnly: false,
                location: "",
                cuisine: "",
                foodType: "",
                price: [],
                // If you add a new filter based on dish tags, be sure to do so here, in <CartList />, <Cart />, and <FilterSetup />
                meat: false,
                veggie: false,
                vegan: false,
                gf: false
            },
            data: []
        };
    }
    cleanJSON(raw) {
        var clean = [];
        raw.forEach(item => {
            var temp = item;
            temp.category = item.category.split(", ");
            temp.dishes = [];
            for (var i=1;i<4;i++) {
                // check that data exists
                if (temp["dishname"+i] != "" && temp["dishname"+i] != undefined) {
                    var d = {};
                    // set the dish props
                    d.name = temp["dishname"+i];
                    d.type = temp["dishtype"+i].split(", ");
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
        return clean;
    }
    componentWillMount() {
        var scope = this;
        var openData = new XMLHttpRequest();
        openData.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //parse the not-quite-right JSON to match our previous structure
                var clean = scope.cleanJSON(JSON.parse(this.responseText));
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
        
        let allDishes = [];
        let randNum = 0;
        
        // flatten the data according to dishes
        this.state.data.map(eatery => { 
            return eatery.dishes.length === 1 
            // if an eatery has only rec'd dish push it into the array
            ? allDishes.push(eatery) 
            // if an eatery has more than one rec'd dish push the dish and a copy of the eatery data into the array
            : eatery.dishes.forEach(dish => allDishes.push({
                'name': eatery.name,
                'open': eatery.open,
                'location': eatery.location,
                'type': eatery.type,
                'category': eatery.category,
                'dishes': [dish],
                'address': eatery.address, 
                'link': eatery.link,
                'price': eatery.price,
            }))
        });
        
        randNum = Math.floor(Math.random() * Math.floor(allDishes.length));
        let randomDish = allDishes[randNum];

        this.setState({chooseRandomly: true, randomDish: randomDish});
    }

    notChooseRamdonly(e){
        e.preventDefault();
        this.setState({chooseRandomly: false});
    }

    getCuisine() {
        var data = this.state.data;
        var cuisines = [];
        data.forEach(cart => {
            for (var i=0; i<cart.category.length; i++) {
                if (cuisines.indexOf(cart.category[i]) == -1) {
                    cuisines.push(cart.category[i]);
                }
            };
        });
        return cuisines.sort();
    }

    getFoodTypes() {
        var data = this.state.data;
        var cuisine = this.state.filters.cuisine;
        var foods = [];
        if (cuisine != "") {
            data.forEach(cart => {
                if (cart.category.indexOf(cuisine) != -1) {
                    for (var i=0; i<cart.dishes.length; i++) {
                        for (var j=0; j<cart.dishes[i].type.length; j++) {
                            if (foods.indexOf(cart.dishes[i].type[j]) == -1) {
                                foods.push(cart.dishes[i].type[j]);
                            }
                        }
                    }
                }
            });
        } else {
            data.forEach(cart => {
                for (var i=0; i<cart.dishes.length; i++) {
                    for (var j=0; j<cart.dishes[i].type.length; j++) {
                        if (foods.indexOf(cart.dishes[i].type[j]) == -1) {
                            foods.push(cart.dishes[i].type[j]);
                        }
                    }
                }
            });
        }
        return foods.sort();
    }

    getLocations() {
        var data = this.state.data;
        var locs = [];
        data.forEach(cart => {
            if (cart.type.toLowerCase() == "cart") {
                if (locs.indexOf(cart.location) == -1) {
                    locs.push(cart.location);
                }
            }
        });
        return locs.sort();
    }

    render() {
        const msg = this.state.message;
        const filters = this.state.filters;
        const data = this.state.data;
        const randomDish = this.state.randomDish;
        var cuisines = this.getCuisine();
        var foodTypes = this.getFoodTypes();
        var locations = this.getLocations();

        return (
            <div className="row">
                <Header />
                <div className="col-md-3">
                    <FilterSetup filters={filters} handleChange={this.updateFilter} chooseRandomly={this.chooseRandomly} cuisineList={cuisines} foodList={foodTypes} locationList={locations} />
                </div>
                <div className="col-md-8 offset-md-1">
                    {this.state.chooseRandomly === true
                    ? <Suggestion randomDish={randomDish} goBack={this.notChooseRamdonly} />
                    : <CartList filters={filters} carts={data} />
                    }
                </div>
                <Footer />
            </div>
        );
    }
}
