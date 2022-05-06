var xValues = ["Worked hours", "Hours remaining"];
var yValues = [5, 7];
var barColors = ["red", "blue"];

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