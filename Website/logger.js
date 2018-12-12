var num1 = document.querySelector('#num1');
var num2 = document.querySelector('#num2');
var rdmButton = document.querySelector('#rdmButton');
var clearButton = document.querySelector('#reset');
var canvas = document.querySelector('#myCanvas');
var ctx = canvas.getContext('2d');

var histogram = {};

function randomNum() {
  var min = -10;
  var max = 10;
  return Math.floor(Math.random() * (max - min) ) + min;
}

submitButton.addEventListener('click', function() {
  var num = document.querySelector('#num');
  num.innerHTML = num1.valueAsNumber +' '+num2.valueAsNumber;
	drawHistogram(num1.valueAsNumber+num2.valueAsNumber);
})

rdmButton.addEventListener('click', function() {
	rdmNum = randomNum();
	rdmNum2 = randomNum();
  var num = document.querySelector('#num');
  num.innerHTML = rdmNum +' '+rdmNum2;
  drawHistogram(rdmNum+rdmNum2);
});

multiRdmButton.addEventListener('click', function() {
	var i;
	for (i = 0; i < 100; i++) { 
		var rdmNum = randomNum();
		var rdmNum2 = randomNum();
		var num = document.querySelector('#num');
		num.innerHTML = rdmNum +' '+rdmNum2;
		drawHistogram(rdmNum+rdmNum2);
	}

});

clearButton.addEventListener('click', function() {
  for(var num in histogram) {
    delete histogram[num];
  }
  ctx.fillStyle = '#f2f2f2';
  ctx.fillRect(0,0,canvas.width,canvas.height);
});

function drawHistogram(nextNum) {
  if(histogram.hasOwnProperty(nextNum)) {
    histogram[nextNum]++;
  } else {
    histogram[nextNum] = 1;
  }
  ctx.fillStyle = '#f2f2f2';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#888';
  ctx.strokeStyle = 'black';
  
  var max = 0;
  for(var num in histogram) {
    if(histogram[num] > max) {
      max = histogram[num];
    }
  }
  
  var width = canvas.width/Object.keys(histogram).length;
  var offset = 0;
  for(var num in histogram) {
		ctx.fillStyle = '#ccff00';
    ctx.fillRect(offset,canvas.height,width,-canvas.height*histogram[num]/(max+1));
    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'black';
    ctx.fillText(num, offset+width/2 - 3,canvas.height*(1 - histogram[num]/(2*(max+1))));
    offset += width;
  }
}

//React components
'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#histogram-1');
ReactDOM.render(e(LikeButton), domContainer);
