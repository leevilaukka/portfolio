import { NextRequest, NextResponse, userAgent } from "next/server";
import { match } from "@formatjs/intl-localematcher"
import  Negotiator from "negotiator"

const locales = ['en-US', "fi-FI"]

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
    const languages = new Negotiator({ headers: Object.fromEntries(request.headers) }).languages()
    const defaultLocale = 'en-US'

    return match(languages, locales, defaultLocale) // -> 'en-US'
}

export function middleware(request: NextRequest) {
    if (userAgent(request).isBot) {
        // Check if bot is already targeting a locale
        // If the bot is already targeting a locale, do not redirect
        if (request.nextUrl.pathname.startsWith('/en-US') || request.nextUrl.pathname.startsWith("/fi-FI")) return

        // Redirect bot to the default locale
        const botLocale = 'en-US'
        const { pathname } = request.nextUrl
        const botUrl = new URL(`/${botLocale}${pathname}`, request.url)
        return NextResponse.redirect(botUrl)
    }

    // Check if trying to access a file in the public folder
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        '/'
    ],
}