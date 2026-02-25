<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserAuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/signup", [UserAuthController::class, "Signup"]);
Route::post("/login", [UserAuthController::class, "login"]);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/post', [PostController::class, 'AddPost']);
    Route::get('/allpost', [PostController::class, 'getAllPost']);
    Route::delete('/deletepost/{id}', [PostController::class, 'deletePost']);
    Route::get('/getpost/{id}', [PostController::class, 'GetPost']);
    Route::put('/editpost/{id}', [PostController::class, 'EditPost']);
    Route::post('/logout', [UserAuthController::class, 'logout']);

});


