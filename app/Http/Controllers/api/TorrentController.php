<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\TorrentController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseEception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Torrent;

class TorrentController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Torrent::select('id','titulo','descricao','tamanho','link_magnetico','user_id','categoria_id','created_at')
                //->whereNull('deleted_at')
                ->orderBy($props,$dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
                      ->limit($pageSize)
                      ->get();

        $totalPages = ceil($total/$pageSize);
        
        return response()->json([
            'message'=>'Relatório de torrents',
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
            'titulo'=>'required|string|max:255',
            'descricao'=>'required|string|max:255',
            'tamanho'=>'required|integer',
            'link_magnetico'=>'required|string|max:255',
            'user_id'=>'required|exists:users,id',
            'categoria_id'=>'required|exists:categorias,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do torrent',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Torrent::create([
            'titulo' => $request->titulo,
            'descricao' => $request->descricao,
            'tamanho' => $request->tamanho,
            'link_magnetico' => $request->link_magnetico,
            'user_id' => $request->user_id,
            'categoria_id' => $request->categoria_id,
        ]);
        return response()->json([
            'message'=>"Torrent cadastrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function show(Request $request, string $id){
        try{
            $data = Torrent::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Torrent não Localizado"),
                404,
            );
        }
        return response()->json([
            'message'=>"Torrent encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
        $validator = Validator::make($request->all(),[
            'titulo'=>'required|string|max:255',
            'descricao'=>'required|string|max:255',
            'tamanho'=>'required|integer',
            'link_magnetico'=>'required|string|max:255',
            'categoria_id'=>'required|exists:categorias,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do torrent',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Torrent::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Torrent não encontrado',
                'data'=> $id,
                'status'=>404,
            ],404);
        }
        $data->titulo = $request->titulo ?? $data->titulo;
        $data->descricao = $request->descricao ?? $data->descricao;
        $data->tamanho = $request->tamanho ?? $data->tamanho;
        $data->link_magnetico = $request->link_magnetico ?? $data->link_magnetico;
        $data->categoria_id = $request->categoria_id ?? $data->categoria_id;
        $data->user_id = $request->user_id ?? $data->user_id;
        $data->save();
        return response()->json([
            'message'=>'Torrent atualizado com sucesso',
            'data'=> $data,
            'status'=>200,
        ],200);
    }

    public function destroy(string $id){
        $data = Torrent::find($id);
        if(!$data){
            return response()->json([
                response()->json("Torrent não Localizado"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Torrent excluido com sucesso",
            'status'=>200,
        ],200);
    }
}
