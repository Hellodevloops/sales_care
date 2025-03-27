<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function index()
    {
        // $contacts = Contact::with(['owner', 'deal'])
        $contacts = Contact::with(['owner'])
            ->where('owner_id', Auth::id())
            ->latest()
            ->paginate(10);

            // dd($contacts);

        return Inertia::render('contacts/Index', [
            'contacts' => $contacts,
        ]);
    }
    public function show(Contact $contact)
{
    // $this->authorize('view', $contact);
    
    return Inertia::render('contacts/Show', [
        'contact' => $contact->load(['owner']),
    ]);
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'company_name' => 'nullable|string|max:255',
            'deal_id' => 'nullable|exists:deals,id',
        ]);

        $contact = Contact::create([
            ...$validated,
            'owner_id' => Auth::id(),
        ]);

        return redirect()->route('contacts.index')->with('success', 'Contact created successfully');
    }

    public function update(Request $request, Contact $contact)
    {
        // $this->authorize('update', $contact);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'company_name' => 'nullable|string|max:255',
            'deal_id' => 'nullable|exists:deals,id',
        ]);

        $contact->update($validated);

        return redirect()->route('contacts.index')->with('success', 'Contact updated successfully');
    }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);
        
        $contact->delete();

        return redirect()->route('contacts.index')->with('success', 'Contact deleted successfully');
    }
}