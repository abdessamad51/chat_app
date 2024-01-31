<?php

use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;

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
       Route::get('/{id}/lastMessage',[MessageController::class, 'lastMessage']);
       
  
    });
    Route::Resource('conversations',ConversationController::class); 
    Route::apiResource('messages',MessageController::class);  
    Route::apiResource('notifications',NotificationController::class);  
    Route::get('getUsers/{name?}',[ConversationController::class,'getUsers']);
    Route::get('getChats/{name?}',[ConversationController::class,'getChats']);  
    Route::get('sendInvitation/{receiver_id}',[ConversationController::class,'sendInvitation']); 
    Route::get('acceptInvitation/{receiver_id}',[ConversationController::class,'acceptInvitation']); 
});

