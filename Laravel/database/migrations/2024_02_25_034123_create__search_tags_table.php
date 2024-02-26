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
        Schema::create('search_tags', function (Blueprint $table) {
            $table->id('searchID');
            $table->unsignedBigInteger('projectID');
            $table->json('keywords'); 

            $table->foreign('projectID')->references('id')->on('projects');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_search_tags');
    }
};
