$('document').ready(function)() {

  if document.getElementById('recipe-id-div') {
    function pieData() {
      $chartData = []
      $recipeId = document.getElementById('recipe-id-div').innerHTML;
      var $response = $.get('/api/v1/recipes/' + $recipeId,
      function(data) {
        $chartData.push(data.recipe.success_count);
        $chartData.push(data.recipe.failure_count);
        recipePie($chartData);
      });
    };

    function recipePie(recipeData) {
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: [
            "Success",
            "Failure",
          ],
          datasets: [
            {
              data: recipeData,
              backgroundColor: [
                "#e3a50f",
                "#4d4d4d"
              ],
              hoverBackgroundColor: [
                "#e7c36e",
                "#949494"
              ]
            }
          ]
        }
      });
    }
  }
}
