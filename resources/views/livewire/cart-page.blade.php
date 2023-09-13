<div class="container">
  <div class="d-flex justify-content-center">
    <a href="{{ route('productPages') }}" class="btn btn-success mt-5">Product</a>
  </div>
  <div>
    <h1 class="text-light">Your Card</h1>
    <div class="text-center text-danger border p-5 mb-5">
      @foreach($carts as $cart)
      <p>Name: {{ $cart['product_name']}}</p>
      <p>Price: {{ $cart['product_price']}}</p>
      <p>Quantity: {{ $cart['product_quantity']}}</p>
      <p>Total Harga: {{ $cart['product_quantity'] * $cart['product_price']}}</p>
      @endforeach
    </div>
  </div>
  <div class="card">
    <div class="d-flex justify-content-between gap-3 bg-dark p-5">
      @foreach($products as $key => $product)
      <div class="col d-flex flex-column gap-2">
        <h5 class="text-white text-center">{{ $product->name }}</h5>
        <div class="d-flex gap-3">
          <div class="col">
            <img src="https://cdn.eraspace.com/media/catalog/product/i/p/iphone_14_pro_space_black_1_5.jpg" alt="Product Iphone" class="img-thumbnail">
          </div>
          <div class="col d-flex flex-column gap-3">
            <input wire:model="itemName" type="text" class="form-control" readonly>
            <input wire:model="itemPrice" type="number" class="form-control" readonly>
            <input wire:model="itemQuantity" type="number" class="form-control">
            <button wire:click="addToCart" class="btn btn-primary">+</button>
          </div>
        </div>
      </div>
      @endforeach
    </div>
  </div>
</div>
