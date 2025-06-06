<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UsuarioController;
use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\CategoriaController;
use App\Http\Controllers\api\TorrentController;
use App\Http\Controllers\api\ComentarioController;
use App\Http\Controllers\api\FavoritoController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login',[LoginController::class,'login']);
Route::post('/logout',[LoginController::class,'logout']);

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

