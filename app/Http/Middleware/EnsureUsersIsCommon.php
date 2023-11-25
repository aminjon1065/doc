<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureUsersIsCommon
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check() || Auth::user()->role !== 'common') {
            // Если пользователь не авторизован или его роль не 'common', перенаправьте его
            return redirect('/'); // или куда-то ещё, куда вы хотите перенаправить неавторизованных пользователей
        }
        return $next($request);
    }
}
