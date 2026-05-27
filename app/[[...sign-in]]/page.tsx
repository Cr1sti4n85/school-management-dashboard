"use client";
import { useSignIn, useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function SignInPage() {
  const clerk = useClerk();
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const role = user?.publicMetadata.role;
      if (role) {
        router.push(`/${role}`);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [globalError, setGlobalError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const identifierRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    identifierRef.current?.focus();
    return () => cancelAnimationFrame(frame);
  }, []);

  const clearErrors = () => {
    setIdentifierError("");
    setPasswordError("");
    setGlobalError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    clearErrors();

    let hasError = false;
    if (!identifier.trim()) {
      setIdentifierError("El usuario o correo es obligatorio.");
      hasError = true;
    }
    if (!password) {
      setPasswordError("La contraseña es obligatoria.");
      hasError = true;
    }
    if (hasError) return;

    setIsSubmitting(true);

    try {
      const { error } = await signIn.create({
        identifier: identifier.trim(),
        password,
      });

      if (!error) {
        clerk.setActive({ session: signIn.createdSessionId });
      } else {
        // error is a ClerkError instance
        const code = error.code ?? "";
        if (code === "form_identifier_not_found") {
          setIdentifierError("Usuario o correo no encontrado.");
        } else if (code === "form_password_incorrect") {
          setPasswordError("Contraseña incorrecta.");
        } else if (code === "too_many_requests") {
          setGlobalError(
            "Demasiados intentos. Espera un momento e intenta de nuevo.",
          );
        } else {
          setGlobalError(error.message || "Ocurrió un error inesperado.");
        }
      }
    } catch {
      setGlobalError("Ocurrió un error de red. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div
        className={`w-full max-w-sm transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Card */}
        <div className="border border-gray-200 rounded-2xl px-8 py-10">
          {/* Logo / Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10  rounded-lg mb-2">
              <Image src="/logo.png" alt="logo icon" width={32} height={32} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-black">
              Iniciar sesión
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Accede a tu cuenta de administrador
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Global error */}
            {globalError && (
              <div
                role="alert"
                className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-red-50 border border-red-200"
              >
                <svg
                  className="w-4 h-4 text-red-500 mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm text-red-600 leading-snug">
                  {globalError}
                </p>
              </div>
            )}

            {/* Identifier field */}
            <div className="space-y-1.5">
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-black"
              >
                Usuario o correo
              </label>
              <input
                ref={identifierRef}
                id="identifier"
                type="text"
                autoComplete="username"
                spellCheck={false}
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (identifierError) setIdentifierError("");
                }}
                placeholder="tu@correo.com"
                aria-invalid={!!identifierError}
                aria-describedby={
                  identifierError ? "identifier-error" : undefined
                }
                className={`w-full px-3.5 py-2.5 text-sm text-black bg-white border rounded-lg outline-none
                placeholder:text-gray-400
                transition-colors duration-150
                focus:border-black focus:ring-1 focus:ring-black
                disabled:bg-gray-50 disabled:text-gray-400
                ${
                  identifierError
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                disabled={isSubmitting}
              />
              {identifierError && (
                <p
                  id="identifier-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-red-600 mt-1"
                >
                  <svg
                    className="w-3 h-3 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {identifierError}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  placeholder="••••••••"
                  aria-invalid={!!passwordError}
                  aria-describedby={
                    passwordError ? "password-error" : undefined
                  }
                  className={`w-full px-3.5 py-2.5 pr-10 text-sm text-black bg-white border rounded-lg outline-none
                  placeholder:text-gray-400
                  transition-colors duration-150
                  focus:border-black focus:ring-1 focus:ring-black
                  disabled:bg-gray-50 disabled:text-gray-400
                  ${
                    passwordError
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError && (
                <p
                  id="password-error"
                  role="alert"
                  className="flex items-center gap-1.5 text-xs text-red-600 mt-1"
                >
                  <svg
                    className="w-3 h-3 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  {passwordError}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || fetchStatus === "fetching"}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 mt-2
              text-sm font-medium text-white bg-black rounded-lg
              transition-all duration-150
              hover:bg-gray-800 active:scale-[0.99]
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
              disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                      strokeLinecap="round"
                    />
                  </svg>
                  Verificando…
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-gray-400">
            Acceso restringido a personal autorizado
          </p>
        </div>
        {/* end card */}
      </div>
    </main>
  );
}
