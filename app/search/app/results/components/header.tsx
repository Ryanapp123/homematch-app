import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            HomeMatch
          </Link>
          <div className="flex space-x-4 items-center">
            <Link href="/search" className="text-gray-600 hover:text-gray-800">
              Search
            </Link>
            <Link href="/market-trends" className="text-gray-600 hover:text-gray-800">
              Market Trends
            </Link>
            {session ? (
              <>
                <Link href="/saved-searches" className="text-gray-600 hover:text-gray-800">
                  Saved Searches
                </Link>
                <Button onClick={() => signOut()} variant="outline">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
