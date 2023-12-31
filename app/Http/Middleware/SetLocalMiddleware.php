<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocalMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        {
            if ($request->session()->has('locale')) {
                app()->setLocale($request->session()->get('locale'));
            } else {
                app()->setLocale(config('app.locale'));
            }
            return $next($request);
        }
    }
}
