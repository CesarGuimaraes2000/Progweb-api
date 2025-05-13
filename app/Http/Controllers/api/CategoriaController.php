<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseEception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',5);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Categoria::select('id','nome')
                ->whereNull('deleted_at')
                ->orderBy($props,$dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
                      ->limit($pageSize)
                      ->get();

        $totalPages = ceil($total/$pageSize);
        
        return response()->json([
            'message'=>'Relatório de categorias',
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
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações da categoria',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Categoria::create([
            'nome' =>$request->nome,
        ]);
        return response()->json([
            'message'=>"Categoria cadastrada com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function show(Request $request, string $id){
        try{
            $data = Categoria::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Categoria não Localizada"),
                404,
            );
        }
        return response()->json([
            'message'=>"Categoria encontrada com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
        $validator = Validator::make($request->all(),[
            'nome'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações da categoria',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Categoria::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Categoria não encontrada',
                'data'=> $id,
                'status'=>404,
            ],404);
        }
        $data->nome = $request->nome ?? $data->nome;
        $data->save();
        return response()->json([
            'message'=>'Categoria atualizada com sucesso',
            'data'=> $data,
            'status'=>200,
        ],200);
    }

    public function destroy(string $id){
        $data = Categoria::find($id);
        if(!$data){
            return response()->json([
                response()->json("Categoria não Localizada"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Categoria excluida com sucesso",
            'status'=>200,
        ],200);
    }
}
