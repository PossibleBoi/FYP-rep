<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_title',
        'description',
        'type',
        'start_date',
        'end_date',
        'status',
        'funding_goal',
        'cover_image',
        'user_id'
    ];

    protected $table = "projects";

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }
}
