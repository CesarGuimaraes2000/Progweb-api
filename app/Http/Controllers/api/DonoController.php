<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Request\StoreDonoRequest;
use App\Models\Dono;

class DonoController extends Controller
{
    public function index(Request $request){
        $page = $request->get('page',1);
        $pageSize = $request->get('pageSize',5);
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');

        $query = Dono::select('id','nome','email')
                ->orderBy($props,$dir);

        $total = $query->count();

        $data = $query->offset(($page - 1) * $pageSize)
                      ->limit($pageSize)
                      ->get();

        $totalPages = ceil($total/$pageSize);
        
        return response()->json([
            'message'=>'Relatório de donos',
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

    public function store(StoreAutorRequest $request){
        
    }

    public function show(Request $request, string $id){
        try{
            $data = Dono::findOrFail($id);
        }
        catch(HttpResponseException $e){
            response()->json(
                response()->json("Dono não Localizado"),
                404,
            );
        }
        return response()->json([
            'message'=>"Dono encontrado com sucesso",
            'status'=>200,
            'data'=>$data
        ],200);
    }

    public function update(Request $request, string $id){
    }

    public function destroy(string $id){
        $data = Dono::find($id);
        if(!$data){
            return response()->json([
                response()->json("Dono não Localizado"),
                'status'=>404,
            ],404);
        }
        $data->delete();
        return response()->json([
            'message'=>"Dono excluido com sucesso",
            'status'=>200,
        ],200);
    }
}
