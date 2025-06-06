<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Favorito extends Model
{
    use SoftDeletes;
    protected $table = 'favoritos';

    protected $fillable = [
        'user_id',
        'torrent_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function user(){
        $this->belongsTo(User::class);
    }

    public function torrent(){
        $this->belongsTo(Torrent::class);
    }
}
