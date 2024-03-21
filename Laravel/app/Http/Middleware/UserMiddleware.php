<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the authenticated user has the user role
        if ($request->user() && $request->user()->role === 'user') {
            return $next($request);
        }

        // If not, return a 403 Forbidden response
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
