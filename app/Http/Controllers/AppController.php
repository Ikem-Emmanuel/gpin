<?php

namespace App\Http\Controllers;

use App\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Console\Input\Input;

class AppController extends Controller
{
    public function init(){
         $user = Auth::user();
         return response()->json(['user'=>$user], 200);
    }

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['username', 'password']);
        dd($credentials);
//        if ($token = auth()->attempt($credentials)) {
//            return response()->json(['success' => 'Login successful', $this->respondWithToken($token)], 200);
//        }else{
//                return response()->json(['error' => 'Could not log you in.'], 401);
//        }

//        return $this->respondWithToken($token);
    }

    public function studentDetails(Request $request){
//        dd('got here');
        $v = Validator::make($request->all(), [
            'examNo' => 'required|digits:10',
        ]);
        if ($v->fails())
        {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 401);
        }
        $search_text = $request->examNo;
        if ($search_text){
            $student = DB::table('students')->where('exam_no', $search_text)->first(['exam_no', 'surname', 'first_name', 'other_names', 'serial', 'pin']);
            if (is_null($student)){
                return response()->json(['error' => 'Student data can not be found'], 401);
            }else{
                return response()->json($student, 200);
            }
        }else{
            return response()->json(['error' => 'Student details can not be found'], 401);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        dd('me');
//        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
