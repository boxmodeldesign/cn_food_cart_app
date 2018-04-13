class RandomizerButton extends React.Component {
    constructor(props) {
        super(props);

        this.makeList = this.makeList.bind(this);
    }

    makeList() {
        let list = [];
        let randNum = function(max){
            return Math.floor(Math.random() * Math.floor(max));
        };

        this.props.foodData.forEach(cart => {
            if (cart.open) {
                list.push(cart)
            }
        });
        
        return this.props.foodData.map( x => x.type).length; //console.log(x.type));
    }

    render() {
        return (
            <div>
                {this.makeList()}
                <button>button text</button>
            </div>
        );
    }
}