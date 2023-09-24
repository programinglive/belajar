<?php

namespace Database\Seeders;

use App\Models\District;
use App\Models\Province;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $province = Province::first();

        District::create([
            'province_id' => $province->id,
            'code' => 'JKB',
            'name' => 'Jakarta Barat',
        ]);
     
        District::create([
            'province_id' => 2,
            'code' => 'BDGB',
            'name' => 'Bandung Barat',
        ]);
     
        District::create([
            'province_id' => 2,
            'code' => 'BDGT',
            'name' => 'Bandung Timur',
        ]);
     
        District::create([
            'province_id' => 2,
            'code' => 'BDGS',
            'name' => 'Bandung Selatan',
        ]);
    }
}
