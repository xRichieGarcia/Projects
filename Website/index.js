var sum = document.getElementById("summary");

var date = new Date().toLocaleString().split(',')[0]
date = date + '.'

var t = document.createTextNode(date);
sum.appendChild(t);


