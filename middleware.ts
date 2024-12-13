import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { decode as decodeBase64 } from "base64-arraybuffer"; // Pour décoder la clé Base64

// Clé secrète encodée en Base64
const secretKeyBase64 = '908f36e92dc66d97d5933f0e6371493cb4fc05b1aa8f8de64014732472303a7a';

// Décoder la clé en Base64
const secretKey = new Uint8Array(decodeBase64(secretKeyBase64));

// Middleware pour vérifier les JWT
export async function middleware(request: NextRequest) {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('JWT')?.value;

    if (token) {
        try {
            // Vérifiez et décodez le JWT avec l'algorithme explicite
            const { payload } = await jwtVerify(token, secretKey, { algorithms: ['HS256'] });

            // Extraire le rôle
            const role = payload.role as string; // Assurez-vous que "role" est une chaîne
            console.log("Rôle de l'utilisateur :", role);

            // Vérifiez les règles d'accès
            if (request.nextUrl.pathname.startsWith('/admin') && role !== 'ROLE_ADMIN') {
                return NextResponse.redirect(new URL('/auth/login', request.url)); // Redirection si accès interdit
            }

            if (request.nextUrl.pathname.startsWith('/user') && role !== 'ROLE_CLIENT') {
                return NextResponse.redirect(new URL('/auth/login', request.url)); // Redirection si accès interdit
            }

            // Si tout est correct, autorisez l'accès
            return NextResponse.next();
        } catch (error) {
            console.error("Erreur lors de la vérification du token :", error);
        }
    }

    // Si le token est absent ou invalide, rediriger vers la page de connexion
    return NextResponse.redirect(new URL('/auth/login', request.url));
}

// Configuration du middleware
export const config = {
    matcher: [
        '/admin/dashboard/dashboardSubCategory/subCategory',
        '/admin/dashboard/dashboardCategory/DashboardCategory',
        '/admin/dashboard/DashBoardCategorySubCategory/DashboardCategorySubCategory',
        '/admin/dashboard/dashboardProduct/[id]',
        '/admin/dashboard/dashboardProductImages/[id]',
        '/admin/dashboard/dashboardColor/[id]',
        '/admin/dashboard/dashboardMaterial/[id]',
        '/admin/dashboard/dashboardSize/[id]',
        '/admin/dashboard/promotion/[id]',
        '/admin/dashboard/promotion/promotion',
        '/admin/dashboard/productPromotion/productPromotion',
        '/user/dashboard/dashboardClient/dashboardClient',
    ],
};
