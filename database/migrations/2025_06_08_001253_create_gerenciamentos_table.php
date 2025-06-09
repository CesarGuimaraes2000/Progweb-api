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
        Schema::create('gerenciamentos', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('servico_id')
                  ->constrained('servicos')
                  ->onDelete('cascade');
            $table->foreignId('funcionario_id')
                  ->constrained('funcionarios')
                  ->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gerenciamentos', function(Blueprint $table){
            $table->softDeletes();
        });
        Schema::dropIfExists('gerenciamentos');
    }
};
