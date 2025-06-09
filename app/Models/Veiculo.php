<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Veiculo extends Model
{
    protected $table = 'veiculos';

    protected $fillable = [
        'user_id',
        'placa',
        'modelo',
        'ano',
        'fabricante',
    ];

    public function user()
    {
        $this->belongsTo(User::class);
    }

    public function servicos()
    {
        $this->hasMany(Servico::class);
    }
}