<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\SoftDeletes;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('servicos', function (Blueprint $table) {
             $table->id('id');
            $table->foreignId('veiculo_id')
                  ->constrained('veiculos')
                  ->onDelete('cascade');
            $table->string('data_abertura');
            $table->string('data_conclusao');
            $table->string('descricao');
            $table->string('status');
            $table->float('valor');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('servicos', function(Blueprint $table){
            $table->softDeletes();
        });
        Schema::dropIfExists('servicos');
    }
};
