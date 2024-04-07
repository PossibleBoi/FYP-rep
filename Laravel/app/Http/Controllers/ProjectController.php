<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Genre;
use App\Models\Images;
use App\Models\Projects;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    //for home page or instances to show the cover images of the project
    public function all_user_projects(Request $request)
    {
        $projects = Projects::where('creator_id', $request->id)->get();

        return response()->json([
            'projects' => $projects
        ]);
    }

    //show projects on the home page
    public function home_projects()
    {
        $projects = Projects::all();

        return response()->json([
            'projects' => $projects
        ]);
    }

}
