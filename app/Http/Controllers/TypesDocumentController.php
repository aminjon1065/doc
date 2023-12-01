<?php

namespace App\Http\Controllers;

use App\Models\TypesDocument;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TypesDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->role === 'common' || Auth::user()->role === 'admin') {
            $typesDocuments = TypesDocument::all();
            return Inertia::render('AdminPages/AddTypeDocument', [
                'typesDocuments' => $typesDocuments
            ]);
        }
        return redirect()->back();
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
        $request->validate([
            'code' => 'required|unique:types_documents,code',
            'type_tj' => 'required|unique:types_documents,type_tj',
            'type_ru' => 'required|unique:types_documents,type_ru',
        ]);
        TypesDocument::create([
            'code' => $request->code,
            'type_tj' => $request->type_tj,
            'type_ru' => $request->type_ru,
        ]);

        return redirect()->back()->with('success', 'Тип документа успешно добавлен');
    }

    /**
     * Display the specified resource.
     */
    public function show(TypesDocument $typesDocument)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TypesDocument $typesDocument)
    {
        return Inertia::render('AdminPages/EditTypes', [
            'typesDocuments' => $typesDocument
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TypesDocument $typesDocument)
    {
        $request->validate([
            'code' => 'required|unique:types_documents,code,' . $typesDocument->id,
            'type_tj' => 'required|unique:types_documents,type_tj,' . $typesDocument->id,
            'type_ru' => 'required|unique:types_documents,type_ru,' . $typesDocument->id,
        ]);
        $typesDocument->update([
            'code' => $request->code,
            'type_tj' => $request->type_tj,
            'type_ru' => $request->type_ru,
        ]);
        return redirect()->back()->with('success', 'Тип документа успешно обновлен');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TypesDocument $typesDocument)
    {
        //
    }
}
