<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use App\Models\Pipeline;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StageController extends Controller
{
    public function index()
    {
        $stages = Stage::with('pipeline')->latest()->paginate(10);
        $pipelines = Pipeline::all();

        return Inertia::render('Stages/Index', [
            'stages' => $stages,
            'pipelines' => $pipelines,
        ]);
    }

    public function store(Request $request, Pipeline $pipeline)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $pipeline->stages()->create($validated);

        return redirect()->route('pipelines.show', $pipeline)->with('success', 'Stage added successfully');
    }

    public function update(Request $request, Stage $stage)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $stage->update($validated);

        return redirect()->route('pipelines.show', $stage->pipeline)->with('success', 'Stage updated successfully');
    }

    public function destroy(Stage $stage)
    {
        $pipeline = $stage->pipeline;
        $stage->delete();

        return redirect()->route('pipelines.show', $pipeline)->with('success', 'Stage deleted successfully');
    }
}