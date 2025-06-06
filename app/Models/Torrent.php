<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Torrent extends Model
{
    use SoftDeletes;
    protected $table = 'torrents';

    protected $fillable = [
        'titulo',
        'descricao',
        'tamanho',
        'link_magnetico',
        'user_id',
        'categoria_id',
    ];

    protected $hidden = [
        'updated_at',
    ];

    public function user(){
        $this->belongsTo(User::class);
    }

    public function categoria(){
        $this->belongsTo(Categoria::class);
    }

    public function comentario(){
        $this->HasMany(Comentario::class);
    }

    public function favorito(){
        $this->HasMany(Favorito::class);
    }
}
