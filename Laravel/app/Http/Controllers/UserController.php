<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function add_project(Request $request)
    {
        dd("Hit");
        return response()->json([
            'message' => 'Project created successfully'
        ]);
    }   
}
