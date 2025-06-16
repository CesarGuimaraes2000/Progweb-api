<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class VerifyUserAccount extends Controller
{
    public function verifyUserAccount(Request $request){
        $user = User::where('remember_token',$request->token)->first();

        if($user){
            $user->remember_token = null;
            $user->ativo = true;
            $user->email_verified_at = Carbon::now();
            $user->save();
            return User::sendEmailUserActivated($user);
        } else {
            return User::sendEmailUserActivatedFailed($user);
        }
    }
}
