<?php

namespace App\Livewire;

use App\Models\User;
use Livewire\Component;

class ModalLivewireTigaPage extends Component
{
    protected $listeners = ['refreshTable' => 'refresh'];

    public function refresh()
    {
        $this->render();
    }

    public function editUser(User $user)
    {
        $this->dispatch('showUserForm', $user)->to(UserForm::class);
    }

    public function removeUser(User $user)
    {
        $user->delete();
        $this->render();
    }

    public function render()
    {
        return view('livewire.modal-livewire-tiga-page',[
            'users' => User::orderBy('id', 'desc')->get()
        ]);
    }
}
