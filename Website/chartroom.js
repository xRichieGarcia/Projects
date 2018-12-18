function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
  return a - b;
}

var App = React.createClass({
	getInitialState: function () {
		return {
			data: [],
			series: ['France', 'Italy', 'England', 'Sweden', 'Germany'], //get from DataLog
			labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
			colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
		}
	},

	componentDidMount: function () {
		this.populateArray();
		setInterval(this.populateArray, 8000);
	},
	populateArray: function () {
		var data = [],
			series = 4,//getRandomInt(2, 10),
			serieLength = 6;//getRandomInt(2, 10);
	
		for (var i = series; i--; ) {
			var tmp = [];
			
			for (var j = serieLength; j--; ) {
				tmp.push(getRandomInt(0, 20)); //get data from DataLog
			}
			
			data.push(tmp);			
		}
		
		this.setState({ data: data });
	},
	render: function () {
		return (
			<section>
				<button onClick={() => this.populateArray()}>
				Activate Lasers
				</button>
				<Charts
					data={ this.state.data }
					labels={ this.state.labels }
					colors={ this.state.colors }
					height={ 250 }
				/>
			
			</section>
		);
	}
});


var Charts = React.createClass({
	render: function () {
		var self = this,
			data = this.props.data,
			layered = this.props.grouping === 'layered' ? true : false,
			stacked = this.props.grouping === 'stacked' ? true : false,
			opaque = this.props.opaque,
			max = 0;
		
		for (var i = data.length; i--; ) {
			for (var j = data[i].length; j--; ) {
				if (data[i][j] > max) {
					max = data[i][j];
				}
			}
		}
		
				
		return (
			<div className={ 'Charts' + (this.props.horizontal ? ' horizontal' : '' ) }>
				{ data.map(function (serie, serieIndex) {
				 	var sortedSerie = serie.slice(0),
				 		sum;
				 	
				 	sum = serie.reduce(function (carry, current) {
				 		return carry + current;
					}, 0);
				 	sortedSerie.sort(compareNumbers);				 		
									 
					return (
						<div className={ 'Charts--serie ' + (self.props.grouping) }
				 			key={ serieIndex }
							style={{ height: self.props.height ? self.props.height: 'auto' }}
						>
						<label>{ self.props.labels[serieIndex] }</label>
						{ serie.map(function (item, itemIndex) {
							var color = self.props.colors[itemIndex], style,
								size = item / (stacked ? sum : max) * 100;
							
							style = {
								backgroundColor: color,
								opacity: opaque ? 1 : (item/max + .05),
								zIndex: item
							};
														
							style['height'] = size + '%';						
												
						 return (
							 <div
							 	className={ 'Charts--item ' + (self.props.grouping) }
							 	style={ style }
								key={ itemIndex }
							>
							 	<b style={{ color: color }}>{ item }</b>
							 </div>
						);
						}) }
						</div>
					);
				}) }
			</div>
		);
	}
});

React.render(<App />, document.getElementById('charts'));
