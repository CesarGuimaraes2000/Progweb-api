<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Services\EmailService;

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
        
        /* $email = $request->input('email');
         $user = User::where('email', $email)->first();
         $user->tokens()->delete;
       // 
        return response('',204); */
    } 

    public function recover(Request $request){
        $email = $request->input('email');
        $data = User::where('email', $email)->first();

        if (!$data) {
            return response()->json([
                'message' => "Usuário não localizado",
                'status' => 404,
                'data' => null
            ], 404);
        }

        return response()->json([
            'message' => "Usuário encontrado com sucesso",
            'status' => 200,
            'data' => $data
        ], 200);
    }

    public function sendConfirmationMail(Request $request, EmailService $emailService)
    {
        $emailService->sendConfirmationMail(
            $request->name,
            $request->codigo,
            $request->email
        );
        return response()->json(['message' => 'E-mail enviado com sucesso']);
    }

}
