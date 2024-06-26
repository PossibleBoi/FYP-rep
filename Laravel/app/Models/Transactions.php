<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    use HasFactory;
    protected $primaryKey = 'transactionID';

    protected $fillable = [
        'transactionID',
        'amount',
        'transaction_date',
        'backerID',
        'projectID',
        'rewardID'
    ];
}
