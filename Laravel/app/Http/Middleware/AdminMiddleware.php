<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the authenticated user has the admin role
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        // If not, return a 403 Forbidden response
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
