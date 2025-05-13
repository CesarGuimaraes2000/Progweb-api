<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categoria extends Model
{
    use HasFactory;
    
    protected $table = 'categorias';

     protected $fillable = [
        'nome',
    ];

    protected $hidden = [
        "updated_at",
        "created_at",
    ];
}
