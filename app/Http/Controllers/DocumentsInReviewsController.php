<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\TypesDocument;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DocumentsInReviewsController extends Controller
{
    public function index(Request $request)
    {

        $typesDocuments = TypesDocument::all();
        $searchTerm = $request->input('search');
        $status = $request->input('status');
        $dateDone = $request->input('date_done');
        $startDate = $request->input('start_date'); // Предполагается формат 'Y-m-d'
        $endDate = $request->input('end_date');     // Предполагается формат 'Y-m-d'
        $isControlled = filter_var($request->input('is_controlled'), FILTER_VALIDATE_BOOLEAN);
        $perPage = 10; // Количество элементов на странице
        $documents = Document::where('status', '!=', 'reviewed')
            ->with(['files', 'creator', 'receivers'])
            ->search($searchTerm)
            ->isControlled($isControlled)
            ->status($status)
            ->whereBoss()
            ->whereDeputy()
//            ->whereBossOrDeputy()
            ->createdAtBetween($startDate, $endDate)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
        return Inertia::render('DocumentsInReviews/index', [
            'documents' => $documents,
            'searchTerm' => $searchTerm,
            'status' => $status,
            'dateDone' => $dateDone,
            'startDate' => $startDate,
            'endDate' => $endDate,
            'is_controlled' => $isControlled,
            'typesDocuments' => $typesDocuments
        ]);
    }
}
