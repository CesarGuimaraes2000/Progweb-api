<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\FuncionarioController;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Exceptions\HttpResponseEception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Funcionario;

class FuncionarioController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Funcionario::select('id','nome','cargo','salario')
                ->whereNull('deleted_at')
                ->orderBy($props,$dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
                      ->limit($pageSize)
                      ->get();

        $totalPages = ceil($total/$pageSize);
        
        return response()->json([
            'message'=>'Relatório de funcionários',
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
            'nome'=>'required|string|max:255',
            'cargo'=>'required|string|max:255',
            'salario'=>'required|numeric',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do funcionário',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Funcionario::create([
            'nome' => $request->nome,
            'cargo' => $request->cargo,
            'salario' => $request->salario,
        ]);
        return response()->json([
            'message'=>"Funcionario cadastrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function show(Request $request, string $id){
        try{
            $data = Funcionario::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Funcionário não Localizado"),
                404,
            );
        }
        return response()->json([
            'message'=>"Funcionário encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
        $validator = Validator::make($request->all(),[
            'nome'=>'required|string|max:255',
            'cargo'=>'required|string|max:255',
            'salario'=>'required|numeric',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do funcionário',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Funcionario::find($id);

        if(!$data){
            return response()->json([
                'message'=>'funcionário não encontrado',
                'data'=> $id,
                'status'=>404,
            ],404);
        }
        $data->nome = $request->nome ?? $data->nome;
        $data->cargo = $request->cargo ?? $data->cargo;
        $data->salario = $request->salario ?? $data->salario;
        $data->save();
        return response()->json([
            'message'=>'funcionario atualizado com sucesso',
            'data'=> $data,
            'status'=>200,
        ],200);
    }

    public function destroy(string $id){
        $data = Funcionario::find($id);
        if(!$data){
            return response()->json([
                response()->json("Funcionário não Localizado"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Funcionário excluido com sucesso",
            'status'=>200,
        ],200);
    }
}
