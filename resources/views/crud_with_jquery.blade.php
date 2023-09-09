<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Programinglive | Belajar Membuat Website</title>
  <meta name="description" content="A Simple CRUD with Jquery Datatable + Bootstrap Modal">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  <link rel="stylesheet" href="//cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
</head>
<body class="p-5 bg-dark">
  <h1 class="text-center mb-5 text-light">A Simple CRUD with Jquery Datatable + Bootstrap Modal</h1>
  <div class="card p-5">
    <div class="mb-5">
      <button class="btn btn-primary float-end"  data-bs-toggle="modal" data-bs-target="#exampleModal">tambah User</button>
    </div>
    <table id="myTable" class="display">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        @foreach($users as $user)
        <tr>
          <td>{{ $user->name }}</td>
          <td>{{ $user->email }}</td>
          <td>
            <button type="button" class="btn btn-primary edit-user" data-bs-toggle="modal" data-bs-target="#exampleModal" data-userid="{{ $user->id }}">edit</button>
            <a href="/delete/{{$user->id}}" >delete</a>
          </td>
        </tr>
        @endforeach
      </tbody>
    </table>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="updateUser" method="POST">
            
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="userid" id="userid">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="name" class="form-control">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="text" id="email" name="email" class="form-control">
            </div>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-5 text-center">
    <a href="/" class="btn btn-success">Back to Home</a>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script src="//cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
  <script>
    $(document).ready( function () {
      $('#myTable').DataTable();

      // ajax request load data edit from row
      
      $('.edit-user').on('click', function(value){

        let userId = $(this).data('userid');
        
        $.get("getUserById/" + userId, function(data, status){
        
          $('#username').val(data.name)
          $('#email').val(data.email)
          $('#userid').val(data.id)

        });
 
      });

    });
  </script>
</body>
</html>