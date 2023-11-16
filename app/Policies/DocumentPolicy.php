<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DocumentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'common';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Document $document): bool
    {
        // Если пользователь имеет роль 'common', разрешить доступ
        if ($user->role === 'common' || $user->role === 'management') {
            return true;
        }
        // Если пользователь имеет роль 'user', разрешить доступ только если он создатель документа
        // или находится в списке его получателей
        if ($user->role === 'user') {
            return $document->created_by_id == $user->id || $document->receivers->contains($user);
        }
        if ($user->role === 'management') {
            return $document->manager()->id == $user->id;
        }
        // Запретить доступ для всех остальных
        return false;
    }

    public function edit(User $user, Document $document): bool
    {
        if ($user->role === 'common') {
            return true;
        }
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Document $document): bool
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Document $document): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Document $document): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Document $document): bool
    {
        //
    }
}
