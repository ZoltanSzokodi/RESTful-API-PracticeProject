$(document).ready(function() {
  buildPage();
})
$('#usersList').on('click', '.remove', function() {
  var id = $(this).parent().data('user').id;
  $.ajax({
    url: '/users/' + id,
    type: 'DELETE',
    success: function(rep) {
      console.log(rep);
      buildPage();
    }
  })
})
$('#usersList').on('click', '.edit', function() {
  var data = $(this).parent().find('input').serialize();
  var id = $(this).parent().find('input[name="id"]').val();
  $.ajax({
    url: '/users/' + id,
    type: 'PUT',
    data: data,
    success: function(rep) {
      console.log(rep);
      buildPage();
    }
  })

})

$('.btn').click(function() {
  var user = $('input[name="user"]').val();
  var pass = $('input[name="pass"]').val();
  $.post('/users', $('#myform').serialize()).done(function(data) {
    console.log(data);
    buildPage();
  })
})

function buildPage() {
  $('#usersList').html(' ');
  $.getJSON('/users', function(data) {
    console.log(data);
    $.each(data, function(i, value) {

      var el = '<li><input type="text" name="name" value="' + value.name + '">';
      el += '<input type="text" name="pass" value="' + value.pass + '">';
      el += '<input type="hidden" name="id" value="' + value.id + '">';
      el += '<span class="remove">x</span><span class="edit">Save</span>';
      el += '<span class="viewLink"><a href="/users/' + value.id + '" target="_blank">View</a></span></li>'

      var listNew = $(el);
      listNew.data('user', value);

      $('#usersList').append(listNew);

    })
  })
}
