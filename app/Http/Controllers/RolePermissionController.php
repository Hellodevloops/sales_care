<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RolePermissionController extends Controller
{
    public function __construct()
    {
        // Apply middleware to all methods in this controller
        // $this->middleware('role_or_permission:manage roles,manage permissions');
    }

    public function index(): \Inertia\Response
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();

        return Inertia::render('RolesPermissions/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function storeRole(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'name' => 'required|unique:roles,name',
            'permissions' => 'array',
        ]);

        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->back()->with('success', 'Role created successfully');
    }

    public function updateRole(Request $request, Role $role): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'name' => 'required|unique:roles,name,' . $role->id,
            'permissions' => 'array',
        ]);

        $role->update(['name' => $request->name]);
        $role->syncPermissions($request->permissions);

        return redirect()->back()->with('success', 'Role updated successfully');
    }

    public function destroyRole(Role $role): \Illuminate\Http\RedirectResponse
    {
        $role->delete();
        return redirect()->back()->with('success', 'Role deleted successfully');
    }
}