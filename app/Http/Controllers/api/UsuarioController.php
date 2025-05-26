<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\api\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseEception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UsuarioController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = User::select('id','name','email')
                ->whereNull('deleted_at')
                ->orderBy($props,$dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
                      ->limit($pageSize)
                      ->get();

        $totalPages = ceil($total/$pageSize);
        
        return response()->json([
            'message'=>'Relatório de usuarios',
            'status'=>200,
            'page'=>$page,
            'pageSize'=>$pageSize,
            'dir'=>$dir,
            'props'=>$props,
            'search'=>$search,
            'total' =>$total,
            'totalPage'=>$totalPages,
            'data'=>$data
        ],200);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|string|max:255|email|unique:users,email',
            'password'=>'required|string|max:255|min:6',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do usuário',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = User::create([
            'name' =>$request->name,
            'email' =>$request->email,
            'password' =>Hash::make($request->password)
        ]);
        return response()->json([
            'message'=>"Usuario cadastrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function show(Request $request, string $id){
        try{
            $data = User::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Usuario não Localizado"),
                404,
            );
        }
        return response()->json([
            'message'=>"Usuario encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
        $validator = Validator::make($request->all(),[
            'name'=>'required|string|max:255',
            'email'=>'required|string|max:255|email|unique:users,email,'.$id,
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do usuário',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = User::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Usuário não encontrado',
                'data'=> $id,
                'status'=>404,
            ],404);
        }
        $data->name = $request->name ?? $data->name;
        $data->email = $request->email ?? $data->email;
        if($request->has('password')){
            $data->password = Hash::make($request->password);
        }
        $data->save();
        return response()->json([
            'message'=>'Usuário atualizado com sucesso',
            'data'=> $data,
            'status'=>200,
        ],200);
    }

    public function destroy(string $id){
        $data = User::find($id);
        if(!$data){
            return response()->json([
                response()->json("Usuario não Localizado"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Usuario excluido com sucesso",
            'status'=>200,
        ],200);
    }

}
