<?php

namespace App\Livewire;

use App\Http\Controllers\UserController;
use App\Models\User;
use Livewire\Attributes\Rule;
use Livewire\Component;
use Livewire\WithPagination;

class UserPage extends Component
{
    use WithPagination;

    public $i = 1;
    public $actionLabel = 'add';
    public $actionButton = 'addUser';
    
    public $user;

    #[Rule('required', as: 'name')]
    public $name = '';
    #[Rule('required|email|unique:users', as: 'email')]
    public $email = '';
    
    public $password = 'programinglive';

    public function updatedEmail()
    {
        $this->resetValidation();
    }

    public function addUser()
    {
        $validated = $this->validate();
        $validated['password'] = bcrypt($this->password);

        // Controller External (UserController)
        UserController::saveUserFromLivewire($validated);

        $this->reset();
    }

    public function editUser($userId)
    {
        $this->actionButton = 'updateUser('.$userId.')';
        $this->actionLabel = 'update';
        
        $this->user = User::find($userId);

        $this->name = $this->user->name;
        $this->email = $this->user->email;
        $this->password = bcrypt($this->password);
    }

    public function updateUser($userId)
    {
        if($this->email == ""){
            $this->addError('email', 'Email tidak boleh kosong');
        } else {
            $userData = [
                'name' => $this->name,
                'email' => $this->email,
                'password' => $this->password,
            ];

            // Controller External (UserController)        
            UserController::updateUserFromLivewire($this->user, $userData);

            $this->reset();
        }

    }

    public function deleteUser($userId)
    {
        // Controller External (UserController)
        UserController::deleteUserFromLivewire($userId);

        $this->reset();
    }

    public function render()
    {
        return view('livewire.user-page', [
            'users' => User::paginate(10)
        ]);
    }
}
