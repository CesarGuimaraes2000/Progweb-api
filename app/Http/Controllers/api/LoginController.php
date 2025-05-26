<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $request){
        $email = $request->email;
        $password = $request->password;
        $user = User::where('email', $email)->first();
        if(!$user){
            return response()->json([
                'message'=> 'Usuário não existe',
            ]);
        }
        
        if(!Hash::check($password,$user->password)){
            return response()->json([
                'password'=>$password,
                'message'=> 'Senha inválida : ',
            ]);
        }

        $token = $user->createToken($user->name)->plainTextToken;

        return response()->json([
            'user'=>$user,
            'token'=>$token,
        ]);
    }

    public function logout(Request $request){
        $email = $request->email;
        $user = User::where('email', $email)->first();
        $user->tokens()->delete;
        return response('',204);
    }

}
