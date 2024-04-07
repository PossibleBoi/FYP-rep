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
                'image_id' => $project->projectID,
                'image_type' => 'App\Projects'
            ]);
        }

        return response()->json([
            'message' => 'Project created successfully',
            'project_type' => $request->type,
        ]);
    }

    //for project page to show the details of the project for viewing, edit view to be done through the user 
    public function project_edit(Request $request)
    {

        $project = Projects::where('ProjectID', $request->id)->get();

        $genre = Genre::where('genreID', $project[0]->genre_id)->get();
        $creator = User::where('id', $project[0]->creator_id)->get();
        $images = Images::select(['image', 'id'])
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

    public function updateProjectDetails(Request $request, $id)
    {
        $project = Projects::where('projectID', $id)->firstOrFail();

        // Update project details
        $project->project_title = $request->input('project_title') ?: 'Default Project Title';
        $project->short_description = $request->input('short_description') ?: 'Default Short Description';
        $project->description = $request->input('description') ?: 'Default Description';
        $project->save();

        return response()->json([
            'message' => 'Project details updated successfully'
        ]);
    }

    public function updateProjectImages(Request $request, $id)
    {

        $project = Projects::where('projectID', $id)->firstOrFail();

        // Update cover image if changed
        if ($request->hasFile('cover_image')) {
            // Delete the old cover image
            if ($project->cover_image) {
                $oldCoverImage = public_path($project->cover_image);
                if (file_exists($oldCoverImage)) {
                    unlink($oldCoverImage);
                }
            }

            $coverImage = $request->file('cover_image');
            $filename = time() . '_' . $coverImage->getClientOriginalName();
            $coverImage->move(public_path('/images'), $filename);
            $project->cover_image = "images/$filename";
            $project->save();
        }

        // Process other images
        if ($request->hasFile('otherImages')) {
            // Delete the old images
            $oldImages = Images::where('image_id', $project->id)
                ->where('image_type', 'App\\Projects')
                ->get();

            foreach ($oldImages as $oldImage) {
                $oldImagePath = public_path($oldImage->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
                $oldImage->delete();
            }

            foreach ($request->file('otherImages') as $index => $image) {
                $filename = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('/images'), $filename);
                $imagePath = "images/$filename";

                Images::create([
                    'image' => $imagePath,
                    'image_id' => $project->projectID, 
                    'image_type' => 'App\\Projects'
                ]);
            }
        }

        return response()->json([
            'message' => 'Project images updated successfully',
            'project' => $project,
        ]);
    }
}
