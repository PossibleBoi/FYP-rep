<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transactionID');
            $table->decimal('amount', 10, 2);
            $table->timestamp('transactiondate');
            $table->unsignedBigInteger('backerID');
            $table->unsignedBigInteger('projectid');
            $table->unsignedBigInteger('rewardid')->nullable(); // Assuming a transaction may not have a reward associated

            $table->foreign('backerID')->references('id')->on('users'); // Assuming 'users' is the table where backer information is stored
            $table->foreign('projectid')->references('id')->on('projects');
            $table->foreign('rewardid')->references('id')->on('rewards')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};