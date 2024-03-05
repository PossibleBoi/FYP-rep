<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function users()
    {
        $users = User::select('id', 'name','role','email', 'location')->get();
        return response()->json([
            $users
        ]);
    }
}
