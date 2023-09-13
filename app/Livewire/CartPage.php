<?php

namespace App\Livewire;

use App\Models\Cart;
use App\Models\Product;
use Livewire\Component;

class CartPage extends Component
{
    public $item = 0;
    public $itemName;
    public $itemPrice = 0;
    public $itemQuantity = 0;
    
    public $carts = [];

    public function mount()
    {
        $firstProduct = Product::first();

        $this->itemName = $firstProduct->name; 
        $this->itemPrice = $firstProduct->price; 
    }

    public function addToCart()
    {
        $item['product_name'] = $this->itemName;
        $item['product_price'] = $this->itemPrice;
        $item['product_quantity'] = $this->itemQuantity;

        array_push($this->carts, $item);

        foreach ($this->carts as $key => $cart) {
            Cart::create([
                'product_id' => Product::first()->id,
                'quantity' => $this->itemQuantity,
                'price' => $this->itemPrice,
                'total_price' => $this->itemPrice * $this->itemQuantity,
            ]);
        }
    }

    public function render()
    {
        return view('livewire.cart-page', [
            'products' => Product::all()->take(1)
        ]);
    }
}
