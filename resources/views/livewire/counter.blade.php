<div class="card p-5 bg-light rounded w-25 mx-auto mt-5">
  <h1 class="text-center my-5">Livewire Sample</h1>
  <div class="text-center">
    <button wire:click="decrement" class="btn btn-danger">-</button>
    <button wire:click="increment" class="btn btn-primary">+</button>
    <p class="my-5 text-xl">{{ $count }}</p>
  </div>
</div>
