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

    //for project page to show the details of the project for viewing, edit view to be done through the user 
    public function project(Request $request)
    {

        $project = Projects::where('ProjectID', $request->id)->get();

        $genre = Genre::where('genreID', $project[0]->genre_id)->get();
        $creator = User::where('id', $project[0]->creator_id)->get();
        $images = Images::select('image')
            ->where('image_id', $request->id)
            ->where('image_type', 'App\Projects')
            ->get();

        $project[0]->genre = $genre[0]->name;
        $project[0]->creator = $creator[0]->name;
        $project[0]->creator_email = $creator[0]->email;
        $project[0]->images = $images;

        return response()->json([
            'project' => $project,
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
