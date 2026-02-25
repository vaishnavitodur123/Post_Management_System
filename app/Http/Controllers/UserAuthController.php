<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    function login(Request $request)
    {

        $user = User::where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(["result" => "User not found", "success" => false], 401);
        }
        $token = $user->createToken('myApp')->plainTextToken;
        return response()->json([
            "success" => true,
            "token" => $token,
            "user" => $user,
            "msg" => "Login successful"
        ], 200);
    }


    //register page
    function Signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => "required|string|min:3|max:60",
            "email" => "required|email",
            "password" => "required|string|min:8|confirmed"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $input = $validator->validated();

        $user = User::create($input);
        $token = $user->createToken('myApp')->plainTextToken;

        return response()->json([
            'success' => true,
            'token' => $token,
            'msg' => 'Successfully registered'
        ], 201);
    }

    public function logout(Request $request)
    {
        // delete current access token
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
