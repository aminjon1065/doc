<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by_id', 'toBoss', 'category', 'title', 'description', 'status', 'type', 'code', 'is_controlled', 'date_done', 'is_read'
    ];

    protected $casts = [
        'date_done' => 'datetime',
        'toBoss' => 'boolean',
        'is_controlled' => 'boolean',
        'is_read' => 'boolean',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_id');
    }

//    public function manager(): BelongsTo
//    {
//        return $this->belongsTo(User::class, 'manager_id');
//    }

//    public function boss(): BelongsTo
//    {
//        return $this->belongsTo(User::class, 'toBoss');
//    }

    public function files(): HasMany
    {
        return $this->hasMany(DocumentFile::class);
    }

    public function receivers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'document_user', 'document_id', 'receiver_id');
    }

    public function deputy(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'document_deputy', 'document_id', 'deputy_id');
    }

    public function responses(): HasMany
    {
        return $this->hasMany(DocumentResponse::class)->with(['user', 'files']);
    }

    public function typesDocument(): BelongsTo
    {
        return $this->belongsTo(TypesDocument::class, 'code', 'code');
    }

// ...

    /**
     * Локальный запрос для выбора документов, где авторизованный пользователь является менеджером.
     */
    public function scopeWhereBoss($query)
    {
        if (Auth::check() && Auth::user()->role === 'boss') {
            // Фильтрация документов, где toBoss установлено в true
            return $query->where('toBoss', true);
        }

        return $query;
    }

//    public function scopeWhereManager($query)
//    {
//        return $query->where('manager_id', Auth::id());
//    }


    /**
     * Локальный запрос для выбора документов, где авторизованный пользователь является получателем.
     */
    public function scopeWhereDeputy($query)
    {
        if (Auth::check() && Auth::user()->role === 'deputy') {
            $userId = Auth::id();
            return $query->whereHas('deputy', function ($query) use ($userId) {
                $query->where('deputy_id', $userId); // Проверяет, присутствует ли пользователь в списке заместителей для документа
            });
        }

        return $query;
    }

    public function scopeWhereBossOrDeputy($query)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $userId = $user->id;
            $userRole = $user->role;

            if ($userRole === 'boss') {
                // Если пользователь - босс, то выбираем документы для босса
                $query->where('toBoss', true);
            }

            if ($userRole === 'deputy') {
                // Если пользователь - заместитель, то выбираем документы для заместителей
                $query->orWhereHas('deputy', function ($query) use ($userId) {
                    $query->where('deputy_id', $userId);
                });
            }
        }

        return $query;
    }


    /**
     * Получить документы для конкретного получателя с дополнительными отношениями.
     *
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function forReceiver(int $userId): \Illuminate\Database\Eloquent\Builder
    {
        return static::whereHas('receivers', function ($query) use ($userId) {
            $query->where('users.id', $userId);
        })->with(['creator', 'files', 'receivers']);
    }

/**
     * Получить документы для конкретного заместителя с дополнительными отношениями.
     *
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function userOpenDocument(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_open_document', 'document_id', 'user_id')->withPivot('is_open')->withTimestamps();
    }

    /**
     * Область запроса для поиска документов по названию и описанию.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $searchTerm
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $searchTerm)
    {
        if ($searchTerm) {
            return $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', '%' . $searchTerm . '%')
                    ->orWhere('description', 'like', '%' . $searchTerm . '%')
                    ->orWhereHas('creator', function ($q) use ($searchTerm) {
                        $q->where('name', 'like', '%' . $searchTerm . '%');
                    });
            });
        }
        return $query;
    }

    /**
     * Область запроса для фильтрации документов по статусу.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeStatus($query, $status)
    {
        if ($status) {
            return $query->where('status', $status);
        }
        return $query;
    }

    /**
     * Область запроса для фильтрации документов с пустой категорией.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithEmptyCategory($query): \Illuminate\Database\Eloquent\Builder
    {
        return $query->where(function ($q) {
            $q->whereNull('category')->orWhere('category', '');
        });
    }

    /**
     * Область запроса для фильтрации документов по дате выполнения.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $dateDone
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeDateDone($query, $dateDone)
    {
        if ($dateDone) {
            return $query->where('date_done', $dateDone);
        }

        return $query;
    }

    /**
     * Область запроса для фильтрации документов по диапазону дат создания.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $startDate
     * @param string|null $endDate
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCreatedAtBetween($query, $startDate, $endDate)
    {
        if ($startDate && $endDate) {
            $endDate = $endDate ? Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay() : null;
            return $query->whereBetween('created_at', [$startDate, $endDate]);
        } elseif ($startDate) {
            return $query->where('created_at', '>=', $startDate);
        } elseif ($endDate) {
            return $query->where('created_at', '<=', $endDate);
        }

        return $query;
    }


    /**
     * Область запроса, которая фильтрует документы на основе значения 'is_controlled'.
     * Если 'is_controlled' истинно, возвращает только контролируемые документы.
     * Если 'is_controlled' ложно, возвращает все документы.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param bool|null $isControlled
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeIsControlled($query, $isControlled = null)
    {
        // Если 'is_controlled' явно установлено в false, возвращаем все записи.
        if ($isControlled === false) {
            return $query;
        }
        // В противном случае, фильтруем по 'is_controlled', если оно true, или если не задано.
        return $query->where('is_controlled', true);
    }

    public function scopeCode($query, $code)
    {
        if ($code) {
            return $query->where('code', $code);
        }
        return $query;
    }

}
