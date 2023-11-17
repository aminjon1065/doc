<?php

namespace App\Http\Controllers;

use App\Models\TypesDocument;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypesDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('AdminPages/AddTypeDocument');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TypesDocument $typesDocument)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypesDocument $typesDocument)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypesDocument $typesDocument)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypesDocument $typesDocument)
    {
        //
    }
}
