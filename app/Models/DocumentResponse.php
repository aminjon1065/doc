<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocumentResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'user_id',
        "description"
    ];




    public function document(): BelongsTo
    {
        return $this->belongsTo(Document::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function files(): BelongsTo
    {
        return $this->belongsTo(DocumentFileResponse::class);
    }
}
