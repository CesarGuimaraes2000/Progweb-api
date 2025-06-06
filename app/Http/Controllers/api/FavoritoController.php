<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\api\FavoritoController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseEception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Favorito;

class FavoritoController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',10);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Favorito::select('id','user_id','torrent_id')
                ->whereNull('deleted_at')
                ->orderBy($props,$dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
                      ->limit($pageSize)
                      ->get();

        $totalPages = ceil($total/$pageSize);
        
        return response()->json([
            'message'=>'Relatório de favoritos',
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
            'user_id'=>'required|exists:users,id',
            'torrent_id'=>'required|exists:torrents,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações de favorito',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Favorito::create([
            'user_id' => $request->user_id,
            'torrent_id' => $request->torrent_id,
        ]);
        return response()->json([
            'message'=>"Favorito cadastrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function show(Request $request, string $id){
        try{
            $data = Favorito::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Favorito não Localizado"),
                404,
            );
        }
        return response()->json([
            'message'=>"Favorito encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
        $validator = Validator::make($request->all(),[
            'torrent_id'=>'required|exists:torrents,id',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações de favorito',
                'data'=>$validator->errors(),
                'status'=>404,
            ],404);
        }

        $data = Favorito::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Favorito não encontrado',
                'data'=> $id,
                'status'=>404,
            ],404);
        }
        $data->torrent = $request->torrent ?? $data->torrent;
        $data->save();
        return response()->json([
            'message'=>'Favorito atualizado com sucesso',
            'data'=> $data,
            'status'=>200,
        ],200);
    }

    public function destroy(string $id){
        $data = Favorito::find($id);
        if(!$data){
            return response()->json([
                response()->json("Favorito não Localizado"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Favorito excluido com sucesso",
            'status'=>200,
        ],200);
    }
}
