<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocumentFileResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_responses_id',
        'file_path',
        'file_name',
        'file_type',
        'file_size'
    ];


    public function response(): BelongsTo
    {
        return $this->belongsTo(DocumentResponse::class);
    }
}
