<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('diary', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('date');
            $table->string('detail')->nullable();
            $table->binary('image');
            $table->timestamps();
        });

        Schema::create('zipcode', function (Blueprint $table) {
            $table->id();
            $table->string('address1');
            $table->string('address2');
            $table->string('address3');
            $table->string('kana1');
            $table->string('kana2');
            $table->string('kana3');
            $table->string('prefcode');
            $table->string('postal_code');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diary');
        Schema::dropIfExists('zipcode');
    }
};
