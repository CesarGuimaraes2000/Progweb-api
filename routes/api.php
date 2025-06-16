<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UsuarioController;
use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\CategoriaController;
use App\Http\Controllers\api\TorrentController;
use App\Http\Controllers\api\ComentarioController;
use App\Http\Controllers\api\FavoritoController;
use App\Http\Controllers\api\FuncionarioController;
use App\Http\Controllers\api\VeiculoController;
use App\Http\Controllers\api\ServicoController;
use App\Http\Controllers\api\GerenciamentoController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login',[LoginController::class,'login']);
Route::post('/logout',[LoginController::class,'logout']);
Route::post('/recover',[LoginController::class,'recover']);
Route::post('/sendConfirmationMail',[LoginController::class,'sendConfirmationMail']);

Route::prefix('/user')->group(function(){
    Route::get('/index' ,[UsuarioController::class, 'index'] );
    Route::get('/show/{id}' ,[UsuarioController::class, 'show'] );
    Route::post('/store' ,[UsuarioController::class, 'store'] );
    Route::put('/update/{id}' ,[UsuarioController::class, 'update'] );
    Route::delete('/destroy/{id}' ,[UsuarioController::class, 'destroy'] );
});

Route::prefix('/categoria')->group(function(){
    Route::get('/index' ,[CategoriaController::class, 'index'] );
    Route::get('/show/{id}' ,[CategoriaController::class, 'show'] );
    Route::post('/store' ,[CategoriaController::class, 'store'] );
    Route::put('/update/{id}' ,[CategoriaController::class, 'update'] );
    Route::delete('/destroy/{id}' ,[CategoriaController::class, 'destroy'] );
});

Route::prefix('/torrent')->group(function(){
    Route::get('/index' ,[TorrentController::class, 'index'] );
    Route::get('/show/{id}' ,[TorrentController::class, 'show'] );
    Route::post('/store' ,[TorrentController::class, 'store'] );
    Route::put('/update/{id}' ,[TorrentController::class, 'update'] );
    Route::delete('/destroy/{id}' ,[TorrentController::class, 'destroy'] );
});

Route::prefix('/favorito')->group(function(){
    Route::get('/index' ,[FavoritoController::class, 'index'] );
    Route::get('/show/{id}' ,[FavoritoController::class, 'show'] );
    Route::post('/store' ,[FavoritoController::class, 'store'] );
    Route::put('/update/{id}' ,[FavoritoController::class, 'update'] );
    Route::delete('/destroy/{id}' ,[FavoritoController::class, 'destroy'] );
});

Route::prefix('/comentario')->group(function(){
    Route::get('/index' ,[ComentarioController::class, 'index'] );
    Route::get('/show/{id}' ,[ComentarioController::class, 'show'] );
    Route::post('/store' ,[ComentarioController::class, 'store'] );
    Route::put('/update/{id}' ,[ComentarioController::class, 'update'] );
    Route::delete('/destroy/{id}' ,[ComentarioController::class, 'destroy'] );
});

Route::prefix('/funcionario')->group(function(){
    Route::get('/index' ,[FuncionarioController::class, 'index'] );
    Route::get('/show/{id}' ,[FuncionarioController::class, 'show'] );
    Route::post('/store' ,[FuncionarioController::class, 'store'] );
    Route::put('/update/{id}' ,[FuncionarioController::class, 'update'] );
    Route::delete('/destroy/{id}' ,[FuncionarioController::class, 'destroy'] );
});

Route::prefix('/veiculo')->group(function(){
    Route::get('/index' ,[VeiculoController::class, 'index'] );
    Route::get('/show/{id}' ,[VeiculoController::class, 'show'] );
    Route::post('/store' ,[VeiculoController::class, 'store'] );
    Route::put('/update/{id}' ,[VeiculoController::class, 'update'] );
    Route::delete('/destroy/{id}' ,[VeiculoController::class, 'destroy'] );
});

Route::prefix('/servico')->group(function(){
    Route::get('/index' ,[ServicoController::class, 'index'] );
    Route::get('/show/{id}' ,[ServicoController::class, 'show'] );
    Route::post('/store' ,[ServicoController::class, 'store'] );
    Route::put('/update/{id}' ,[ServicoController::class, 'update'] );
    Route::delete('/destroy/{id}' ,[ServicoController::class, 'destroy'] );
});

Route::prefix('/gerenciamento')->group(function(){
    Route::get('/index' ,[GerenciamentoController::class, 'index'] );
    Route::get('/show/{id}' ,[GerenciamentoController::class, 'show'] );
    Route::post('/store' ,[GerenciamentoController::class, 'store'] );
    Route::put('/update/{id}' ,[GerenciamentoController::class, 'update'] );
    Route::delete('/destroy/{id}' ,[GerenciamentoController::class, 'destroy'] );
});

