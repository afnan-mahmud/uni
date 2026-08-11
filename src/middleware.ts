import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// Define the role matrix
const RBAC: Record<string, { GET?: string[], POST?: string[], PUT?: string[], DELETE?: string[] }> = {
  '/api/students': {
    GET: ['super_admin', 'admin', 'registrar', 'dean', 'hod', 'admission_officer', 'finance_officer', 'hostel_manager', 'transport_manager', 'it_admin'],
    POST: ['super_admin', 'admin', 'admission_officer'],
  },
  '/api/courses': {
    GET: ['super_admin', 'admin', 'registrar', 'dean', 'hod', 'faculty', 'student', 'it_admin'],
    POST: ['super_admin', 'admin', 'dean', 'hod'],
  },
  '/api/departments': {
    GET: ['super_admin', 'admin', 'registrar', 'dean', 'hod', 'faculty', 'student', 'admission_officer', 'it_admin'],
    POST: ['super_admin', 'admin'],
  },
  '/api/programs': {
    GET: ['super_admin', 'admin', 'registrar', 'dean', 'hod', 'faculty', 'student', 'admission_officer', 'it_admin'],
    POST: ['super_admin', 'admin'],
  },
  '/api/exams': {
    GET: ['super_admin', 'admin', 'registrar', 'dean', 'hod', 'faculty', 'student', 'examination_officer'],
    POST: ['super_admin', 'admin', 'dean', 'hod', 'examination_officer', 'faculty'],
  },
  '/api/results': {
    GET: ['super_admin', 'admin', 'registrar', 'dean', 'hod', 'faculty', 'student', 'guardian', 'examination_officer'],
    POST: ['super_admin', 'admin', 'faculty', 'examination_officer'],
  },
  '/api/attendance': {
    GET: ['super_admin', 'admin', 'dean', 'hod', 'faculty', 'student', 'guardian'],
    POST: ['super_admin', 'admin', 'faculty'],
  },
  '/api/payments': {
    GET: ['super_admin', 'admin', 'student', 'guardian', 'finance_officer', 'accountant'],
    POST: ['super_admin', 'admin', 'finance_officer', 'accountant'],
  },
  '/api/registrations': {
    GET: ['super_admin', 'admin', 'registrar', 'dean', 'hod', 'student'],
    POST: ['student', 'admin', 'registrar'],
  },
  '/api/semesters': {
    GET: ['super_admin', 'admin', 'registrar', 'dean', 'hod', 'student', 'faculty', 'it_admin'],
    POST: ['super_admin', 'admin'],
  },
  '/api/notifications': {
    GET: [], // Allow all authenticated if empty
    POST: ['super_admin', 'admin', 'hr_officer', 'registrar', 'dean'],
  }
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  if (!pathname.startsWith('/api/') || pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || '0GQeMD05fxFKl6FqqMjn3+NQ2BGUGh97kyGQf5vyXIRtjn+e7aiIaoYQpFog2T4Py3cJjk+DJpWAuz8p1GzUGg==');
  
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    const role = payload.role as string;

    // Check RBAC
    const matchedPath = Object.keys(RBAC).find(path => pathname.startsWith(path));
    if (matchedPath) {
      const allowedRoles = RBAC[matchedPath][req.method as keyof typeof RBAC[string]];
      if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
         return NextResponse.json({ success: false, message: 'Forbidden: Insufficient permissions' }, { status: 403 });
      }
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', payload.userId as string);
    requestHeaders.set('x-user-role', role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
  }
}

export const config = {
  matcher: '/api/:path*',
};
