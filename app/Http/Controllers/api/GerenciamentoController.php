<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\GerenciamentoController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseEception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Gerenciamento;

class GerenciamentoController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Gerenciamento::select('id','servico_id','funcionario_id')
                ->whereNull('deleted_at')
                ->orderBy($props,$dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
                      ->limit($pageSize)
                      ->get();

        $totalPages = ceil($total/$pageSize);
        
        return response()->json([
            'message'=>'Relatório de gerenciamento',
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
            'funcionario_id'=>'required|exists:funcionarios,id',
            'servico_id'=>'required|exists:servicos,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações de serviço',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Gerenciamento::create([
            'servico_id' => $request->servico_id,
            'funcionario_id' => $request->funcionario_id,
        ]);
        return response()->json([
            'message'=>"Gerenciamento cadastrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function show(Request $request, string $id){
        try{
            $data = Gerenciamento::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Gerenciamento não Localizado"),
                404,
            );
        }
        return response()->json([
            'message'=>"Gerenciamento encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
        $validator = Validator::make($request->all(),[
            'funcionario_id'=>'required|exists:funcionarios,id',
            'servico_id'=>'required|exists:servicos,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações de gerenciamento',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Gerenciamento::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Gerenciamento não encontrado',
                'data'=> $id,
                'status'=>404,
            ],404);
        }
        $data->funcionario_id = $request->funcionario_id ?? $data->funcionario_id;
        $data->servico_id = $request->servico_id ?? $data->servico_id;
        $data->save();
        return response()->json([
            'message'=>'Gerenciamento atualizado com sucesso',
            'data'=> $data,
            'status'=>200,
        ],200);
    }

    public function destroy(string $id){
        $data = Gerenciamento::find($id);
        if(!$data){
            return response()->json([
                response()->json("Gerenciamento não Localizado"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Gerenciamento excluido com sucesso",
            'status'=>200,
        ],200);
    }
}
