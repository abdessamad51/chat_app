<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class RegisterController extends Controller
{
    public function login(Request $request) {

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')->plainTextToken; 
            $success['user'] =  [
                'id' => $user->id,
                'full_name' => $user->full_name,
                'email' =>  $user->email,
                'image' => $user->image
            ];

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
   
        $rules = [
            'full_name' => ['required'],
            'password' => ['required', 'min:8'],
            'password_confirmation' => ['required', 'min:8'],
            'email' => ['required', 'email'],
            'phone' => ['required'],
            'image' => ['file']
        ];
        $validatedData = $this->validate($request, $rules);

        $validatedData['password'] = Hash::make($validatedData['password']);
        // return $request->image;
        if($request->hasFile('image')) {
            $image_path = $request->file('image')->store('images/profils', 'public');
            $validatedData['image'] = $image_path;
        }

        $user =  User::create($validatedData);
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $user = User::find($user->id);
        $success['user'] =  $user;
        // return $;
        return response()->json([
            "result" => true,
            "data" => $success
        ]);
    }



    
}
