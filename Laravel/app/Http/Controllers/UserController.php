<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function add_project(Request $request)
    {
        $file = $request->file('coverImage');
       
        if(is_array($file)) {
            $filenameArray = [];
            foreach($file as $singleFile) {
                $filename = time() . '_' . $singleFile->getClientOriginalName();
                $singleFile->move(public_path('/images'), $filename);
                $filenameArray[] = $filename;
            }
            $coverImage = implode(',', $filenameArray);
        } else {

            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('/images'), $filename);
            $coverImage = $filename;
        }

        Projects::create([
            'project_title' => $request->projectTitle,
            'description' => $request->description,
            'type' => $request->type,
            'start_date' => $request->startDate,
            'end_date' => $request->endDate,
            'funding_goal' => $request->goal,
            'cover_image' => ("D:\FYP\FYP-rep\Laravel\public\images\\$coverImage"),
            'genre_id' => $request->genre,
            'creator_id' => $request->user
        ]);

        return response()->json([
            'message' => 'Project created successfully',
            'project_type' => $request->type,
        ]);
    }
}
