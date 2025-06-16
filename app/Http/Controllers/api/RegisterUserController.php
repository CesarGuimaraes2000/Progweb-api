<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class RegisterUserController extends Controller
{
    public function signup(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=>'required|string',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
            response()->json([
                'message'=>'Erro nos dados informados pelo usuário',
                'erros'=>$validator->errors(),
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        if($user){
            User::sendVerificationEmail($user);
            return response()->json([
                'message'=>'Verifique seu endereço de e-mail',
                'token'=>$token,
            ]);
        } else {
           return response()->json([
                'message'=>'Erro no cadastro do usuário, erro no servidor, tente novamente mais tarde',
                'status' =>'500',
            ]); 
        }
    }
}
