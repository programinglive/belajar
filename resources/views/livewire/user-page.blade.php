<div class="d-flex flex-column w-75 mx-auto pt-5">
  <div class="card p-5">
    <div class="d-flex justify-content-between">
      <div>
        <h1 class="mb-3">Users</h1>
      </div>
      <div>
        <button class="btn btn-success" wire:click="{{$actionButton}}">{{ $actionLabel }}</button>
      </div>
    </div>
    <div class="d-flex justify-content-start gap-3 mb-3">
      <div class="form-group col">
        <label for="name">Name</label>
        <input wire:model="name" type="text" id="name" class="form-control" placeholder="Input Name...">
        @error('name')<span class="text-danger">{{ $message }}</span>@enderror
      </div>
      <div class="form-group col">
        <label for="email">Email</label>
        <input wire:model.live.debounce.150ms="email" type="email" id="email" class="form-control" placeholder="Input Email...">
        @error('email')<span class="text-danger">{{ $message }}</span>@enderror
      </div>
    </div>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        @forelse($users as $key => $user)
        <tr>
          <th scope="row">{{ $i++ }}</th>
          <td>{{ $user->name }}</td>
          <td>{{ $user->email }}</td>
          <td>
            <button wire:click="editUser( {{ $user->id }} )" class="btn btn-primary">Edit</button>
            <button wire:click="deleteUser( {{ $user->id }} )" class="btn btn-danger">Delete</button>
          </td>
        </tr>
        @empty
        <tr>
          <td colspan="4" class="text-center">Empty Data</td>
        </tr>
        @endforelse
      </tbody>
    </table>
  </div>
  <div class="pt-5 mx-auto">
    {{ $users->links('custom_pagination') }}
  </div>
</div>
