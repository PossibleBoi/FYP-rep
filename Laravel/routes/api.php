<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;

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

Route::group(['middleware' => 'api'], function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh',  [AuthController::class, 'refresh']);
    Route::post('me',  [AuthController::class, 'me']);
    Route::get('admin/projects/genre', [AdminController::class, 'project_genre']);
});

Route::group(['middleware' => ['auth:api','admin']], function () {
    Route::get('admin/users', [AdminController::class, 'users']);
    Route::get('admin/users/total',[AdminController::class, 'users_total']);
    Route::get('admin/users/edit/{id}', [AdminController::class, 'user_edit']);
    Route::put('admin/user/edit/{id}/status', [AdminController::class, 'user_status']);
    Route::put('admin/user/edit/{id}/role', [AdminController::class, 'user_role']);
    Route::put('admin/user/edit/{id}/information', [AdminController::class, 'user_info']);

    Route::post('admin/projects/genre/add', [AdminController::class, 'add_project_genre']);

});

Route::group(['middleware' => ['auth:api','user']], function () {
    Route::post('user/projects/create', [UserController::class, 'add_project']);
});
