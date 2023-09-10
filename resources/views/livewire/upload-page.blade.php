<div class="d-flex flex-column w-75 mx-auto pt-5">
  <div class="card p-5">
    <div class="d-flex flex-column justify-content-between gap-3">
      <div>
        <h1 class="mb-3">Upload File with Livewire</h1>
      </div>
      <div>
        @if ($photo) 
          <img src="{{ $photo->temporaryUrl() }}" class="w-100">
        @endif
      </div>
      <form id="uploadFile" wire:submit="save">
        <input type="file" wire:model="photo" required>
        <button wire:loading.attr="disabled" type="submit" class="btn btn-primary">Save photo</button>
        <div>
          @error('photo') <span class="text-danger">{{ $message }}</span> @enderror
        </div>
      </form>
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          @forelse($photos as $photo)
          <tr>
            <td>
              <img src="{{ asset('/storage/' . $photo->image_path) }}" class="w-100">
            </td>
            <td class="text-center">
              <button wire:click="deleteImage({{$photo}})" class="btn btn-danger">
                x
              </button>
            </td>
          </tr>
          @empty
          <tr>
            <td class="text-center"> Empty Data</td>
          </tr>
          @endforelse
        </tbody>
      </table>
    </div>
  </div>
</div>