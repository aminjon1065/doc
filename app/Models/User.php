<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'position',
        'department',
        'region',
        'rank',
        'avatar',
        'role'
    ];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function createDocument(): HasMany
    {
        return $this->hasMany(Document::class, 'created_by_id');
    }

    /**
     * Проверяет, принадлежит ли пользователь к Общему отделу.
     *
     * @return bool
     */
    public function isCommonDepartment()
    {
        return $this->role === 'common';
    }

    public function isManagementDepartment()
    {
        return $this->role === 'management';
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}
