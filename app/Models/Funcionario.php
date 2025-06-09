<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    protected $table = 'funcionarios';

    protected $fillable = [
        'nome',
        'cargo',
        'salario',
    ];

    public function gerenciamentos()
    {
        $this->hasMany(Gerenciamento::class);
    }
}