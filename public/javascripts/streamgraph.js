// code adadpted from https://bl.ocks.org/mbostock/4060954
function streamgraph(){
	$('#map').html('<svg id="streamgraph" width="2000" height="500" margin="0px" padding="0px"></svg>');

	window.setInterval(function(){
	  transition();
	}, 4000);

	var n = 45, // number of layers
	    m = 300, // number of samples per layer
	    k = 10; // number of bumps per layer

	var stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetWiggle),
	    layers0 = stack(d3.transpose(d3.range(n).map(function() { return bumps(m, k); }))),
	    layers1 = stack(d3.transpose(d3.range(n).map(function() { return bumps(m, k); }))),
	    layers = layers0.concat(layers1);

	var svg = d3.select("svg"),
	    width = +svg.attr("width"),
	    height = +svg.attr("height");

	var x = d3.scaleLinear()
	    .domain([0, m - 1])
	    .range([0, width]);

	var y = d3.scaleLinear()
	    .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
	    .range([height, 0]);

	var z = d3.interpolateRgb("#d7c7cd", "#fff389")//.interpolateInferno;

	var area = d3.area()
	    .x(function(d, i) { return x(i); })
	    .y0(function(d) { return y(d[0]); })
	    .y1(function(d) { return y(d[1]); });

	svg.selectAll("path")
	  .data(layers0)
	  .enter().append("path")
	    .attr("d", area)
	    .attr("fill", function() { return z(Math.random()); });

	function stackMax(layer) {
	  return d3.max(layer, function(d) { return d[1]; });
	}

	function stackMin(layer) {
	  return d3.min(layer, function(d) { return d[0]; });
	}

	function transition() {
	  var t;
	  d3.selectAll("path")
	    .data((t = layers1, layers1 = layers0, layers0 = t))
	    .transition()
	      .duration(5000)
	      .attr("d", area);
	}

	// inspired by Lee Byron’s test data generator.
	function bumps(n, m) {
	  var a = [], i;
	  for (i = 0; i < n; ++i) a[i] = 0;
	  for (i = 0; i < m; ++i) bump(a, n);
	  return a;
	}

	function bump(a, n) {
	  var x = 1 / (0.1 + Math.random()),
	      y = 2 * Math.random() - 0.5,
	      z = 10 / (0.1 + Math.random());
	  for (var i = 0; i < n; i++) {
	    var w = (i / n - y) * z;
	    a[i] += x * Math.exp(-w * w);
	  }
	}
}