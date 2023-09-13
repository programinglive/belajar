<?php

namespace App\Livewire;

use App\Models\Product;
use Livewire\Component;

class ProductPage extends Component
{
    public $name;
    public $price = 0;

    public function store()
    {
        $product = Product::create([
            'name' => $this->name,
            'price' => $this->price,
        ]);
    }

    public function render()
    {
        return view('livewire.product-page', [
            'products' => Product::all()
        ]);
    }
}
