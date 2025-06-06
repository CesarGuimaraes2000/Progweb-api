<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categoria extends Model
{
    use HasFactory,softDeletes;
    
    protected $table = 'categorias';

     protected $fillable = [
        'nome',
    ];

    protected $hidden = [
        "updated_at",
        "created_at",
    ];

    public function torrent(){
        $this->HasMany(Torrent::class);
    }
}
