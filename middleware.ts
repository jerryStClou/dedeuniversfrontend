// /middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken'; // Alternative si l'import par défaut ne fonctionne pas

import cookie from 'cookie';

export function middleware(request: NextRequest) {
   
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('JWT')?.value;  // Récupère la valeur du cookie 'jwtToken'

    // Si le token existe et est valide, autorisez l'accès
    if (token) {
        try {
            // Décodez et vérifiez le token ici
            jwt.verify(token, '608f36e92dc66d97d5933f0e6371493cb4fc05b1aa8f8de64014732472303a7c'); // Utilisez votre clé secrète pour valider le JWT
            
            // Si le token est valide, autorisez la requête
            console.log("le token est celui la "+token);
            return NextResponse.next();
        } catch (error) {
            console.log('Token invalide ou expiré', error);
        }
    }

    // Si le token est absent ou invalide, rediriger vers la page de connexion
    return NextResponse.redirect(new URL('/auth/login', request.url));
}

// Appliquez ce middleware uniquement sur les routes à protéger
export const config = {
    matcher: '/user/dashboard/dashboardUser/dashboardUser', // Route à protéger
};
