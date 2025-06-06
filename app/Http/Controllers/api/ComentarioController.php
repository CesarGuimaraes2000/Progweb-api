<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\ComentarioController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseEception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Comentario;

class ComentarioController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Comentario::select('id','mensagem','user_id','torrent_id','created_at')
                ->whereNull('deleted_at')
                ->orderBy($props,$dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
                      ->limit($pageSize)
                      ->get();

        $totalPages = ceil($total/$pageSize);
        
        return response()->json([
            'message'=>'Relatório de comentários',
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
            'mensagem'=>'required|string|max:255',
            'user_id'=>'required|exists:users,id',
            'torrent_id'=>'required|exists:torrents,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do comentário',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Comentario::create([
            'mensagem' => $request->mensagem,
            'user_id' => $request->user_id,
            'torrent_id' => $request->torrent_id,
        ]);
        return response()->json([
            'message'=>"Comentário cadastrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function show(Request $request, string $id){
        try{
            $data = Comentario::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Comentário não Localizado"),
                404,
            );
        }
        return response()->json([
            'message'=>"Comentário encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
        $validator = Validator::make($request->all(),[
            'mensagem'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do comentário',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Comentario::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Comentario não encontrado',
                'data'=> $id,
                'status'=>404,
            ],404);
        }
        $data->mensagem = $request->mensagem ?? $data->mensagem;
        $data->save();
        return response()->json([
            'message'=>'Comentário atualizado com sucesso',
            'data'=> $data,
            'status'=>200,
        ],200);
    }

    public function destroy(string $id){
        $data = Comentario::find($id);
        if(!$data){
            return response()->json([
                response()->json("Comentario não Localizado"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Comentario excluido com sucesso",
            'status'=>200,
        ],200);
    }
}
