<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypesDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'type_tj',
        'type_ru',
    ];
}
