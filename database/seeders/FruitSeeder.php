<?php

namespace Database\Seeders;

use App\Models\Fruit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FruitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Fruit::factory(10)->create();
    }
}
