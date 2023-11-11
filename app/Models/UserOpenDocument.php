<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class UserOpenDocument extends Model
{
    use HasFactory;
    protected $fillable = [
        'document_id',
        'user_id',
        'is_open',
    ];

}
