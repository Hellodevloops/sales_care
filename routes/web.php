<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PipelineController;
use App\Http\Controllers\StageController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('leads', function () {
        return Inertia::render('leads');
    })->name('leads');
    Route::get('demo', function () {
        return Inertia::render('demo');
    })->name('demo');
    Route::get('calendar', function () {
        return Inertia::render('calendar');
    })->name('calendar');
    Route::get('leads/detail', function () {
        return Inertia::render('leads/detail');
    })->name('leads.detail');
    Route::get('onboarding', function () {
        return Inertia::render('onboarding/page');
    })->name('onboarding');


    //contacts

    // Route::get('contacts', function () {
    //     return Inertia::render('contacts/list');
    // })->name('lead.contacts');

    Route::get('/contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::post('/contacts', [ContactController::class, 'store'])->name('contacts.store');
    Route::put('/contacts/{contact}', [ContactController::class, 'update'])->name('contacts.update');
    Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
    Route::get('/contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');

    Route::get('/pipelines', [PipelineController::class, 'index'])->name('pipelines.index');
    Route::get('/pipelines/{pipeline}', [PipelineController::class, 'show'])->name('pipelines.show');
    Route::post('/pipelines', [PipelineController::class, 'store'])->name('pipelines.store');
    Route::put('/pipelines/{pipeline}', [PipelineController::class, 'update'])->name('pipelines.update');
    Route::delete('/pipelines/{pipeline}', [PipelineController::class, 'destroy'])->name('pipelines.destroy');

    // Route::get('/stages', [StageController::class, 'index'])->name('stages.index');
    Route::get('/stages', [StageController::class, 'index'])->name('stages.index');
    Route::get('/stages/{stage}', [StageController::class, 'show'])->name('stages.show');
    Route::post('/pipelines/{pipeline}/stages', [StageController::class, 'store'])->name('stages.store');
    Route::put('/stages/{stage}', [StageController::class, 'update'])->name('stages.update');
    Route::delete('/stages/{stage}', [StageController::class, 'destroy'])->name('stages.destroy');

});

    Route::get('/roles-permissions', [RolePermissionController::class, 'index'])
    ->middleware('role_or_permission:admin')
    ->name('roles-permissions.index');
    Route::post('/roles', [RolePermissionController::class, 'storeRole'])->name('roles.store');
    Route::put('/roles/{role}', [RolePermissionController::class, 'updateRole'])->name('roles.update');
    Route::delete('/roles/{role}', [RolePermissionController::class, 'destroyRole'])->name('roles.destroy');

    // User Management Routes
    Route::get('/users', [UserManagementController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserManagementController::class, 'create'])->name('users.create');
    Route::post('/users', [UserManagementController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserManagementController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('users.destroy');

    // Leads routes
    Route::get('/leads', fn() => inertia('Leads'))->middleware('role_or_permission:view leads')->name('leads.index');
    Route::get('/leads/{id}', fn($id) => inertia('LeadDetail'))->middleware('role_or_permission:view leads')->name('leads.show');
// });

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
