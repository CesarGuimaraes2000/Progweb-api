<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comentario extends Model
{
    use SoftDeletes;

    protected $table = 'comentarios';

    protected $fillable = [
        'mensagem',
        'user_id',
        'torrent_id',
    ];

    protected $hidden = [
        'updated_at',
    ];

    public function user(){
        $this->belongsTo(User::class);
    }

    public function torrent(){
        $this->belongsTo(Torrent::class);
    }
}
