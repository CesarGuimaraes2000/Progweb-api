<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\UsuarioController;
use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\CategoriaController;
use App\Http\Controllers\api\TorrentController;

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
