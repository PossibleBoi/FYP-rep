<?php

namespace App\Http\Controllers;

use App\Models\Genre;
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
        $users = User::select('id', 'name','role','email', 'location', 'status')->get();
        return response()->json([
            $users
        ]);
    }

    public function users_total(){
        $users = User::all()->count();
        return response()->json([
            $users
        ]);
    }

    public function user_edit($id)
    {
        $user = User::select('id', 'name', 'role', 'email', 'location', 'status')
        ->find($id);
        
        return response()->json([
            $user
        ]);
    }

    public function user_status(Request $request, $id)
    {
        $user = User::find($id);
        $user->status = $request->status;
        $user->save();
        return response()->json([
            'message' => 'User status updated successfully'
        ]);
    }
    
    public function user_role(Request $request, $id)
    {
        $user = User::find($id);
        $user->role = $request->role;
        $user->save();
        return response()->json([
            'message' => 'User role updated successfully'
        ]);
    }

    public function user_info(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->location = $request->location;
        $user->save();
        return response()->json([
            'message' => 'User information updated successfully'
        ]);
    }


    public function add_project_genre()
    {
        $genre = request('genre');
     
        Genre::create([
            'name' => $genre
        ]);

        return response()->json(['message' => 'Successfully added genre']);

    }

    public function project_genre()
    {
        $genre = Genre::all();
        return response()->json([
            $genre
        ]);
    }
}

