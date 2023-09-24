<?php

namespace App\Livewire;

use App\Models\District;
use App\Models\Province;
use Livewire\Component;

class RegionSelector extends Component
{
    public $provinces;
    public $provinceSelector;

    public $districts;

    public $testName;

    public function updatedProvinceSelector($provinceID)
    {
        $this->districts = District::where('province_id', $provinceID)->get();
    }

    public function mount()
    {
        $this->provinces = Province::all();
        $this->districts = collect();
    }

    public function render()
    {
        return view('livewire.region-selector');
    }
}
