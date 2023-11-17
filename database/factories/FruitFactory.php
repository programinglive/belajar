<?php

namespace Database\Factories;

use App\Models\Fruit;
use Illuminate\Database\Eloquent\Factories\Factory;

class FruitFactory extends Factory
{
    protected $model = Fruit::class;

    public function definition(): array
    {
        return [
            'name' => 'Alpukat',
            'price' => $this->faker->randomFloat(2, 0, 1000),
        ];
    }
}
