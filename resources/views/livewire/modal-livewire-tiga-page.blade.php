<div class="container d-flex flex-column gap-3 mt-3">
  <livewire:user-form />
  <h1 class="text-center text-light">Users Table</h1>
  <div class="d-flex justify-content-end">
    <button class="btn btn-primary" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">+</button>
  </div>
  <table class="table table-bordered table-hover text-light">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      @foreach($users as $user)
      <tr>
        <td> {{ $user->id }} </td>
        <td> {{ $user->name }} </td>
        <td> {{ $user->email }} </td>
        <td> 
          <button wire:click="editUser({{ $user }})" class="btn btn-info">Edit</button>
          <button wire:click="removeUser({{ $user }})" class="btn btn-danger">remove</button>
        </td>
      </tr>
      @endforeach
    </tbody>
  </table>
</div>


@push('scripts')
<script>
  document.addEventListener('livewire:initialized', () => {

    @this.on('refreshTable', (event) => {
      Livewire.dispatch('refreshTable')
    });

  });

</script>
@endpush