<div class="container mt-5">

  <a href="{{ route('cartPages') }}" class="btn btn-success mb-5">Cart</a>

  <form id="productForm" class="d-flex flex-column gap-3">
    <div class="form-group">
      <label for="name" class="text-white">Product Name</label>
      <input wire:model="name" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="price" class="text-white">Product Price</label>
      <input wire:model="price" type="number" class="form-control">
    </div>
    <button wire:click="store" class="btn btn-primary">Save</button>
  </form>

  <table class="table table-bordered table-hover mt-5">
    <thead class="text-white">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody class="text-white">
      @forelse($products as $product)
      <tr>
        <td>{{ $product->id }}</td>
        <td>{{ $product->name }}</td>
        <td>{{ $product->price }}</td>
      </tr>
      @empty
      <tr>
        <td colspan="3" class="text-center">Empty Data</td>
      </tr>
      @endforelse
    </tbody>
  </table>
</div>
