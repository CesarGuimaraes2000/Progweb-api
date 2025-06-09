<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gerenciamento extends Model
{
    protected $table = 'gerenciamentos';

    protected $fillable = [
        'servico_id',
        'funcionario_id',
    ];

    public function servico()
    {
        $this->belongsTo(Servico::class);
    }

    public function funcionario()
    {
        $this->belongsTo(Funcionario::class);
    }
}