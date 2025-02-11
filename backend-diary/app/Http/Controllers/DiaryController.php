<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Diary;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Exception;

class DiaryController extends Controller
{
    public function getDiary(Request $request, $id = null)
    {
        try {
            if ($id) {
                $diary = Diary::findOrFail($id);
            } else {
                $diary = Diary::all();
            }

            return response()->json([
                'success' => true,
                'data' => $diary
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Diary not found!'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch diary!',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function createDiary(Request $request)
    {
        try {
            $user = Auth::user();

            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'date' => 'required|date',
                'detail' => 'required|string',
                'image' => 'nullable|string',
            ]);

            $diary = Diary::create([
                ...$validatedData
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Diary created successfully!',
                'data' => $diary
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Validation failed!',
                'messages' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to create diary!',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function updateDiary(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $diary = Diary::findOrFail($id);

            $validatedData = $request->validate([
                'title' => 'nullable|string|max:255',
                'date' => 'nullable|date',
                'detail' => 'nullable|string',
                'image' => 'nullable|string',
            ]);

            $diary->update($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'Diary updated successfully!',
                'data' => $diary
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to update diary!',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteDiary(Request $request, $id)
    {
        try {
            $diary = Diary::findOrFail($id);
            $diary->delete();

            return response()->json([
                'success' => true,
                'message' => 'Diary deleted successfully!'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to delete diary!',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
