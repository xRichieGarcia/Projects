function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

class App extends React.Component {
  constructor(props){
    super(props);
  }
  
  render () {
    return(
     <div>
      <Clock />
      <Histogram />
    </div>    
    );
  }
}
 
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>Yo its {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

class Histogram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      data: [],
			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'], //make variable & 1 dimension
      tags: [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0,
             1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //make variable same size as colors and data
			colors: ['#43A19E', '#4E8E9F', '#597B9F', '#6569A0', '#7056A0', 
               '#7B43A1', '#933F99', '#AB3C91', '#C2388A', '#DA3582',
               '#F2317A', '#F54669', '#F75A58', '#FA6F46', '#FC8335',
               '#FF9824', '#DEA332', '#BCAE41', '#9BB94F', '#79C45E',
               '#58CF6C'], //make variable
      height: 250 
    };
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  tick() {
    this.setState({
      date: new Date()
    });
    this.populateArray();
  }
   
  populateArray() {
		var data = [],
			series = 2,//getRandomInt(2, 10),
			serieLength = 21;//getRandomInt(2, 10);
	
		for (var i = series; i--; ) {
			var tmp = [];
			
			for (var j = serieLength; j--; ) {
				tmp.push(getRandomInt(0, 20));
			}
			
			data.push(tmp);			
		}
		
		this.setState({ data: data });
	}
  
  render() {
    var self = this,
        data = this.state.data,
        opaque = this.state.opaque,
        max = 0;
  
    for (var i = data.length; i--; ) {
			for (var j = data[i].length; j--; ) {
				if (data[i][j] > max) {
					max = data[i][j];
				}
			}
		}
    
    return (
      <div>
        <div className={ 'Charts' }>
          { data.map(function (serie, serieIndex) {
            var sortedSerie = serie.slice(0),
              sum;

            sum = serie.reduce(function (carry, current) {
              return carry + current;
            }, 0);
            sortedSerie.sort(compareNumbers);				 		

            return (
              <div className={ 'Charts--serie ' }
                key={ serieIndex }
                style={{ height: self.state.height ? self.state.height: 'auto' }}
              >
              <label>{ self.state.labels[serieIndex] }</label>
              { serie.map(function (item, itemIndex) {
                var color = self.state.colors[itemIndex],
                    tags = self.state.tags,
                    style,
                    size = item / (max) * 100;

                style = {
                  backgroundColor: color,
                  zIndex: item
                };

                style['height'] = size + '%';						

               return (
                 <div
                  className={ 'Charts--item ' }
                  style={ style }
                  key={ itemIndex }
                >
                  <b 
                    className={ 'values' } 
                    style={{ color: color }}
                  >
                    { item }
                  </b>

                  <b 
                    className={ 'tags' } 
                   
                  >
                    { tags[itemIndex] }
                  </b>

							 </div>
							 
						);
						}) }
						</div>
					);
            
            
				}) }
         
        </div>
      </div>
    ); //end of return
  } //end of render()
} //end of ChartApp

React.render(
  <App />,
  document.getElementById('root')
);

