import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token'); 
  const { pathname } = request.nextUrl; 

  // Define public routes that do not require authentication
  const publicRoutes = [
    '/',
    '/frontend/displayJobs',
    '/auth/login',
    '/auth/register'
  ];

  // Define role-based access rules
  const roleBasedRoutes = {
    Admin: ['*'], // Admin can access any route

    Applicant: [
        '/frontend/profile/*', 
        '/frontend/dashboard', 
        '/frontend/createProfile',
        '/frontend/createSkill',
        '/frontend/editSkill/*',
        '/frontend/createEducation',
        '/frontend/editEducation/*',
        '/frontend/createExperience',
        '/frontend/editExperience/*', 
        '/frontend/createResume', 
        '/frontend/editResume/*', 
        '/frontend/applyJob', 
        '/frontend/appliedJobs',
        '/frontend/displayJobs',
        '/frontend/jobDetails/*',
        '/frontend/editProfile',
        '/frontend/myJobs/*',
        '/frontend/myJobs',
    ],

    Employer: [
        '/frontend/profile/*',
        '/frontend/postAJob', 
        '/frontend/postedJob', 
        '/frontend/dashboard', 
        '/frontend/displayJobs',
        '/frontend/createProfile',
        '/frontend/editProfile',
        '/frontend/jobDetails/*',
        '/frontend/myJobs/*',
        '/frontend/myJobs',,
        '/frontend/editJobDetails/*',
        '/frontend/viewApplications/*'
    ],
  };

  // Check if the current route is a public route
  const isPublicRoute = publicRoutes.includes(pathname);

  // If the user is not authenticated and is trying to access a protected route
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirected', 'true');
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated, check their role
  if (token) {
    // Decode the token and get the user role
    let userRole;
    try {
        const base64Url = token.value.split('.')[1]; // Get the payload part of the JWT
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedToken = JSON.parse(jsonPayload);
        userRole = decodedToken.role;
    } catch (error) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Function to check if a path matches a pattern with wildcard
    function matchRoute(pattern, path) {
        const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
        return regex.test(path);
    }

    // Check if the user has access to the requested path
    const allowedRoutes = roleBasedRoutes[userRole] || [];
    console.log(`Allowed routes for role ${userRole}:`, allowedRoutes);
    const hasAccess = allowedRoutes.some(route => matchRoute(route, pathname));
    console.log(`User with role ${userRole} trying to access ${pathname}:`, hasAccess);

    if (!hasAccess) {
        console.log(`No user with role ${userRole} is allowed to access ${pathname}. Redirecting to home page.`);
        return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ['/frontend/:path*', '/dashboard/:path*', '/profile/:path*', '/admin/:path*'], // Apply middleware to all routes under /frontend, /dashboard, /profile, and /admin
};