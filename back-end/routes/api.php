<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [RegisterController::class, 'login']);
Route::post('register', [RegisterController::class, 'register']);
 

Route::middleware('auth:sanctum')->group( function () {
    Route::prefix('conversations')->group(function () {
       Route::get('/friends',[ConversationController::class, 'friends']);
  
    });
    Route::Resource('conversations',ConversationController::class); 
    Route::apiResource('messages',MessageController::class);    
});

