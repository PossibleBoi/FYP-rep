<?php

use App\Models\User;
use App\Models\Projects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BasicController;
use App\Http\Controllers\ProjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login',  [AuthController::class, 'login']);
Route::post('register',  [AuthController::class, 'register']);
Route::get('/home', [ProjectController::class, 'home_projects']);
Route::get('user/project/{id}', [ProjectController::class, 'project']);

Route::group(['middleware' => 'api'], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh',  [AuthController::class, 'refresh']);
    Route::post('me',  [AuthController::class, 'me']);
    Route::get('/projects/genre', [AdminController::class, 'project_genre']);
});

Route::group(['middleware' => ['auth:api', 'admin']], function () {
    Route::get('admin/users', [UserController::class, 'users']);
    Route::get('admin/users/total', function () {
        return response()->json([User::count()]);
    });
    Route::get('admin/projects/total', function () {
        return response()->json([Projects::count()]);
    });
    Route::get('admin/users/edit/{id}', [AdminController::class, 'user_edit']);
    Route::put('admin/user/edit/{id}/status', [AdminController::class, 'user_status']);
    Route::put('admin/user/edit/{id}', [AdminController::class, 'user_update']);

    Route::post('admin/projects/genre/add', [AdminController::class, 'add_project_genre']);
});

Route::group(['middleware' => ['auth:api', 'user']], function () {
    Route::get('user/my_projects/{id}', [ProjectController::class, 'all_user_projects']); //get all unique user projects from this api, for all projects use the admin api route
    Route::post('user/projects/create', [UserController::class, 'add_project']);
});
