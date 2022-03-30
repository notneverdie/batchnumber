$(document).ready(function() {
    $(".expenses").on('keyup change', calculateSum);
  });
  
  function calculateSum() {
    var $input = $(this);
    var $row = $input.closest('tr');
    var sum = 0;
    $row.find(".expenses").each(function() {
      sum += parseFloat(this.value) || 0;
    });
    $row.find(".expenses_sum").val(sum.toFixed(0));
}