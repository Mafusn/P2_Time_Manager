var xValues = ["Worked hours", "Hours remaining"];
var yValues = [5, 7];
var barColors = ["#FF551B", "#FF8659"];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {}
});