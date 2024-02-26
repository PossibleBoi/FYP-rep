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
        Schema::create('project_genre', function (Blueprint $table) {
            $table->id('genreid');
            $table->unsignedBigInteger('projectid');

            $table->foreign('genreid')->references('genreID')->on('genre');
            $table->foreign('projectid')->references('id')->on('projects');

            // You may include additional columns as needed for this pivot table.

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_genre');
    }
};
