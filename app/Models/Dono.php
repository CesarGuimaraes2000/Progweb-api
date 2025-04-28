<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Dono extends Model
{
    use HasFactory;
    
    protected $table='donos';
    
    protected $fillable = [
        'nome',
        'email',
        'senha',
        'saldo',
    ];

    protected $hidden = [
        "updated_at",
        "created_at",
        "password",
    ];

    public function user(){
        $this->belongsTo(User::class);
    }

    public function livros(){
        $this->HasMany(EditoraLivroAutor::class);
    }
} 
