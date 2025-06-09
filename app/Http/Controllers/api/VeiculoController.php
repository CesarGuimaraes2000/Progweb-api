<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\VeiculoController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseEception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Veiculo;

class VeiculoController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Veiculo::select('id','placa','modelo','ano','fabricante','user_id')
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
            'placa'=>'required|string|max:10',
            'modelo'=>'required|string|max:255',
            'ano'=>'required|string|max:4',
            'fabricante'=>'required|string|max:255',
            'user_id'=>'required|exists:users,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do veiculo',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Veiculo::create([
            'placa' => $request->placa,
            'modelo' => $request->modelo,
            'ano' => $request->ano,
            'fabricante' => $request->fabricante,
            'user_id' => $request->user_id,
        ]);
        return response()->json([
            'message'=>"Veículo cadastrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function show(Request $request, string $id){
        try{
            $data = Veiculo::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Veiculo não Localizado"),
                404,
            );
        }
        return response()->json([
            'message'=>"Veiculo encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
        $validator = Validator::make($request->all(),[
            'placa'=>'required|string|max:10',
            'modelo'=>'required|string|max:255',
            'ano'=>'required|string|max:4',
            'fabricante'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do veiculo',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Veiculo::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Veiculo não encontrado',
                'data'=> $id,
                'status'=>404,
            ],404);
        }
        $data->placa = $request->placa ?? $data->placa;
        $data->modelo = $request->modelo ?? $data->modelo;
        $data->ano = $request->ano ?? $data->ano;
        $data->fabricante = $request->fabricante ?? $data->fabricante;
        $data->user_id = $request->user_id ?? $data->user_id;
        $data->save();
        return response()->json([
            'message'=>'Veiculo atualizado com sucesso',
            'data'=> $data,
            'status'=>200,
        ],200);
    }

    public function destroy(string $id){
        $data = Veiculo::find($id);
        if(!$data){
            return response()->json([
                response()->json("Veiculo não Localizado"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Veiculo excluido com sucesso",
            'status'=>200,
        ],200);
    }
}
