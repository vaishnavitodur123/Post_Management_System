<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function AddPost(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string',
            'author' => 'required|string',
            'category' => 'required|string',
            'status' => 'required|string',
            'content' => 'required|string',
        ]);


        $post = Post::create($validated);

        return response()->json([
            'success' => true,
            'data' => $post
        ], 201);
    }


    public function getAllPost()
    {
        $post = Post::paginate(7);
        return response()->json([
            'current_page' => $post->currentPage(),
            'per_page' => $post->perPage(),
            'total' => $post->total(),
            'last_page' => $post->lastPage(),
            'next_page_url' => $post->nextPageUrl(),
            'prev_page_url' => $post->previousPageUrl(),
            'data' => $post->items(),
        ], 200);
    }

    public function deletePost($id)
    {
        $post = Post::find($id);
        $post->delete();
        return response()->json([
            'success' => true,
            'data' => $post
        ], 200);
    }

    public function GetPost(Request $request, $id)
    {
        $post = Post::find($id);
        return response()->json([
            'success' => true,
            'data' => $post
        ], 200);
    }

    public function EditPost(Request $request, $id)
    {
        $post = Post::find($id);
        $post->update($request->all());
        return response()->json([
            'success' => true,
            'data' => $post
        ], 200);
    }
}
