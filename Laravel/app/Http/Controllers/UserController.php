<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Genre;
use App\Models\Images;
use App\Models\Projects;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function users() //Returns all user information
    {
        $users = User::select('id', 'name', 'role', 'email', 'location', 'status')->get();
        return response()->json([
            $users
        ]);
    }

    // Add a new project as a user
    public function add_project(Request $request)
    {
        $coverImage = $request->file('coverImage');

        if (is_array($coverImage)) {
            $filenameArray = [];
            foreach ($coverImage as $singleFile) {
                $filename = time() . '_' . $singleFile->getClientOriginalName();
                $singleFile->move(public_path('/images'), $filename);
                $filenameArray[] = "images/$filename"; // Store full path
            }
            $coverImage = implode(',', $filenameArray); // Store comma-separated paths
        } else {
            $filename = time() . '_' . $coverImage->getClientOriginalName();
            $coverImage->move(public_path('/images'), $filename);
            $coverImage = "images\\$filename"; // Store full path
        }

        // Process other images
        $otherImages = [];
        if ($request->hasFile('otherImages')) {
            foreach ($request->file('otherImages') as $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('/images'), $filename);
                $otherImages[] = "images\\$filename"; // Store full path
            }
        }

        $project = Projects::create([
            'project_title' => $request->projectTitle,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'type' => $request->type,
            'start_date' => $request->startDate,
            'end_date' => $request->endDate,
            'funding_goal' => $request->goal,
            'cover_image' => $coverImage,
            'genre_id' => $request->genre,
            'creator_id' => $request->user
        ]);

        foreach ($otherImages as $imagePath) {
            Images::create([
                'image' => $imagePath,
                'image_id' => $project->id,
                'image_type' => 'App\Projects'
            ]);
        }

        return response()->json([
            'message' => 'Project created successfully',
            'project_type' => $request->type,
        ]);
    }

    public function edit_project(Request $request)
    {
        //Update send garne
        //Data get from project controller project first for view
    }
   
}
