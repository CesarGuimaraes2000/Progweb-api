<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\ServicoController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseEception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Servico;

class ServicoController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Servico::select('id','data_abertura','data_conclusao','descricao','status','valor','veiculo_id')
                ->whereNull('deleted_at')
                ->orderBy($props,$dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
                      ->limit($pageSize)
                      ->get();

        $totalPages = ceil($total/$pageSize);
        
        return response()->json([
            'message'=>'Relatório de veiculos',
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
            'data_abertura'=>'required|string|max:255',
            'descricao'=>'required|string|max:255',
            'data_conclusao'=>'string|max:255',
            'status'=>'required|string|max:255',
            'valor'=>'required|numeric',
            'veiculo_id'=>'required|exists:veiculos,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do servico',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Servico::create([
            'data_abertura' => $request->data_abertura,
            'descricao' => $request->descricao,
            'data_conclusao' => $request->data_conclusao,
            'valor' => $request->valor,
            'status' => $request->status,
            'veiculo_id' => $request->veiculo_id,
        ]);
        return response()->json([
            'message'=>"Serviço cadastrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function show(Request $request, string $id){
        try{
            $data = Servico::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Servico não Localizado"),
                404,
            );
        }
        return response()->json([
            'message'=>"Serviço encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
        $validator = Validator::make($request->all(),[
            'data_abertura'=>'required|string|max:255',
            'descricao'=>'required|string|max:255',
            'data_conclusao'=>'string|max:255',
            'status'=>'required|string|max:255',
            'valor'=>'required|numeric',
            'veiculo_id'=>'required|exists:veiculos,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do servico',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Servico::find($id);

        if(!$data){
            return response()->json([
                'message'=>'servico não encontrado',
                'data'=> $id,
                'status'=>404,
            ],404);
        }
        $data->data_abertura = $request->data_abertura ?? $data->data_abertura;
        $data->descricao = $request->descricao ?? $data->descricao;
        $data->data_conclusao = $request->data_conclusao ?? $data->data_conclusao;
        $data->status = $request->status ?? $data->status;
        $data->valor = $request->valor ?? $data->valor;
        $data->veiculo_id = $request->veiculo_id ?? $data->veiculo_id;
        $data->save();
        return response()->json([
            'message'=>'servico atualizado com sucesso',
            'data'=> $data,
            'status'=>200,
        ],200);
    }

    public function destroy(string $id){
        $data = Servico::find($id);
        if(!$data){
            return response()->json([
                response()->json("Serviço não Localizado"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Servico excluido com sucesso",
            'status'=>200,
        ],200);
    }
}
