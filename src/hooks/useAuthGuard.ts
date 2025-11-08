import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"

interface UseAuthGuardOptions {
    redirectTo?: string
    redirectIfAuthenticated?: boolean
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const {
        redirectTo = "/auth/signin",
        redirectIfAuthenticated = false
    } = options;
    const isAuthenticated = useMemo(() => status === "authenticated" && !session.error, [session, status]);

    useEffect(() => {
        if (status === "loading") return // Still loading

        if (!isAuthenticated) {
            router.push(redirectTo)
            return
        }

        if (redirectIfAuthenticated) {
            router.push("/")
        }
    }, [session, status, router, redirectTo, redirectIfAuthenticated])

    return {
        session,
        status,
        isAuthenticated,
        isLoading: status === "loading"
    }
}
