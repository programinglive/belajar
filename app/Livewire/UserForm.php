<?php

namespace App\Livewire;

use App\Livewire\ModalLivewireTigaPage;
use App\Models\User;
use Livewire\Component;

class UserForm extends Component
{
    public $userId;
    public $name;
    public $email;
    public $actionButton = "daftarUser";
    
    public function daftarUser()
    {
        if($this->userId){
            User::find($this->userId)->update([
                'name' => $this->name,
                'email' => $this->email,
            ]);
        } else {
            User::create([
                'name' => $this->name,
                'email' => $this->email,
                'password' => bcrypt('programinglive'),
            ]);
        }

        $this->dispatch('hideUserForm')->self();
        $this->dispatch('refreshTable')->to(ModalLivewireTigaPage::class);
        $this->reset();
    }

    public function render()
    {
        return view('livewire.user-form');
    }
}
