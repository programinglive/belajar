<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public static function saveUserFromLivewire($userData){
        User::create($userData);
    }

    public static function updateUserFromLivewire(User $user, $userData){
        $user->update($userData);
    }

    public static function deleteUserFromLivewire($userId){
        $user = User::find($userId);
        
        $user->delete();
    }

    public function crud_with_jquery($value='')
    {
        $users = User::all();

        return view('crud_with_jquery', compact('users'));
    }

    public function getUserById($id)
    {
        return User::find($id);
    }

    public function updateUser(Request $request)
    {
        if($request->get('userid')){
            $user = User::find($request->get('userid'));
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);
        } else {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt('password'),
            ]);
        }

        return redirect()->back();
    }

    public function deleteUser($id)
    {
        $user = User::find($id);

        $user->delete();
        return redirect()->back();
    }
}
