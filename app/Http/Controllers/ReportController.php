<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\TypesDocument;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;

class ReportController extends Controller
{
    public function index()
    {
        $typesDocuments = TypesDocument::all();
        return Inertia::render('Reports/index', [
            'typesDocuments' => $typesDocuments,
            "currentLocale" => app()->getLocale(),
        ]);
    }

    public function generatePDF(Request $request)
    {
        $lang = app()->getLocale();
        $start = Carbon::createFromFormat('Y-m-d', $request->input("start"));
        $end = Carbon::createFromFormat('Y-m-d', $request->input("end"));
        $filed = $request->input("filled");
        $documents = Document::where('category', $filed)
            ->whereBetween('created_at', [$start, $end])
            ->with('creator', 'typesDocument')
            ->orderBy('created_at', 'desc')
            ->get();
        $startDate = $start->format('d.m.Y');
        $endDate = $end->format('d.m.Y');
        // Count documents by type
        $documentCountsByType = $documents->groupBy('typesDocument.type_' . $lang)->map->count();
        $imgsrc = public_path('logo256.webp');
        $filedToBlade = ''; // Объявление переменной
        if ($lang === 'ru' && $filed === 'sent') {
            $filedToBlade = 'Исходящие';
        } elseif ($lang === 'ru' && $filed === 'inbox') {
            $filedToBlade = 'Входящие';
        } elseif ($lang === 'tj' && $filed === 'sent') {
            $filedToBlade = 'Содиротӣ';
        } elseif ($lang === 'tj' && $filed === 'inbox') {
            $filedToBlade = 'Воридотӣ';
        }
        try {
            $pdf = PDF::loadView('pdf.invoice', compact('lang', 'documentCountsByType', 'startDate', 'endDate', 'filedToBlade', 'imgsrc'));
//            $pdf->setPaper('A4', 'landscape');
//            $pdf->render();
//            // Force download the PDF
//             $pdf->stream('report.pdf');
            return $pdf->download('report.pdf');
//             exit();
        } catch (\Exception $e) {
            \Log::error('PDF generation error: ' . $e->getMessage());
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }


}
