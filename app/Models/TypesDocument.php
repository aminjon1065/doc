<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TypesDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'type_tj',
        'type_ru',
    ];
    public function documents(): HasMany
    {
        return $this->hasMany(Document::class, 'code', 'code');
    }
}
