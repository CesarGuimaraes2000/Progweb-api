<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servico extends Model
{
    protected $table = 'servicos';

    protected $fillable = [
        'veiculo_id',
        'data_abertura',
        'data_conclusao',
        'descricao',
        'status',
        'valor',
    ];

    public function veiculo()
    {
        $this->belongsTo(Veiculo::class);
    }

    public function gerenciamentos()
    {
        $this->hasMany(Gerenciamento::class);
    }
}