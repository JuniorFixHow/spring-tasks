import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"

const Header = () => {
  return (
    <header className="w-full px-4 py-3 border-b shadow bg-white flex justify-end" >
        {/* <img className="w-8 h-8 rounded-full cursor-pointer"  src="/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" alt="" /> */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
      <SignedIn>
        <UserButton showName />
      </SignedIn>
    </header>
  )
}

export default Header