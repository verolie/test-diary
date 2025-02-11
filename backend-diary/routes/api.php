<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\DiaryController;
use Illuminate\Support\Facades\Route;

// User Authentication
Route::post('/user', [UserController::class, 'userLogin']);
Route::post('/user/register', [UserController::class, 'registerUser']);

// Diary API (Protected with JWT)
Route::middleware('auth:api')->group(function () {
    Route::get('/diary/{id?}', [DiaryController::class, 'getDiary']);
    Route::post('/diary', [DiaryController::class, 'createDiary']);
    Route::put('/diary/{id}', [DiaryController::class, 'updateDiary']);
    Route::delete('/diary/{id}', [DiaryController::class, 'deleteDiary']);
});
