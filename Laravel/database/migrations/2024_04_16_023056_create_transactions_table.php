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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transactionID');
            $table->decimal('amount', 10, 2);
            $table->timestamp('transaction_date');
            $table->unsignedBigInteger('backerID');
            $table->unsignedBigInteger('projectID');
            $table->unsignedBigInteger('rewardID')->nullable(); 

            $table->foreign('backerID')->references('id')->on('users'); 
            $table->foreign('projectid')->references('projectid')->on('projects');
            $table->foreign('rewardid')->references('rewardid')->on('rewards')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions_tables');
    }
};
