<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function login(Request $request) {

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->plainTextToken; 
            $success['user'] =  $user;

            return response()->json([
                "result" => true,
                "data" => $success
            ],200);
        } else {
            return response()->json([
                "result" => false,
                "data" => "login or password incorrect"
            ],401);
        }
    }

    public function register(Request $request) {

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['user'] =  $user;
        return response()->json([
            "result" => true,
            "data" => $success
        ]);
    }
}
