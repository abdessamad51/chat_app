<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function login(Request $request) 
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) { 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->plainTextToken; 
            $success['user'] =  [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'email' =>  $user->email,
            ];

            return response()->json(["result" => true, "data" => $success]);
        } 

        return response()->json(["result" => false, "data" => "Email or password incorrect"], 401);
    }

    public function register(RegisterUserRequest $request) 
    {
        $input = $request->validated();
        $input['password'] = Hash::make($input['password']);
        $user = User::create($input);

        $data['token'] = $user->createToken('MyApp')->plainTextToken;
        $data['user'] = $user;
        
        return response()->json(["result" => true, "data" => $data]);
    }
}
