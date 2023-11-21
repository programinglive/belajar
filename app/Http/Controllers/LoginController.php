<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Exception;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{/**
 * Redirect the user to the GitHub authentication page.
 *
 * @return RedirectResponse|\Symfony\Component\HttpFoundation\RedirectResponse
 */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return Application|\Illuminate\Foundation\Application|Redirector|RedirectResponse|void
     */
    public function handleGoogleCallback()
    {
        try {
            //create a user using socialite driver google
            $user = Socialite::driver('google')->user();
            // if the user exits, use that user and login
            $finduser = User::where('google_id', $user->id)->first();
            if($finduser){
                //if the user exists, login and show dashboard
                Auth::login($finduser);
            }else{
                //user is not yet created, so create first
                $newUser = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'google_id'=> $user->id,
                    'password' => encrypt('')
                ]);
                //login as the new user
                Auth::login($newUser);
                // go to the dashboard
            }
            return redirect('/dashboard');
            //catch exceptions
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }
}
