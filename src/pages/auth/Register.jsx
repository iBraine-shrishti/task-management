import Logo from "../../components/brand/Logo";
export default function Register() {
  return (
    <div className="grid min-h-screen place-items-center bg-gray-50 p-6">
      <div className="card w-full max-w-md p-8">
        <Logo />
        <h1 className="mt-10 text-2xl font-extrabold">Create client account</h1>
        <p className="mt-1 text-sm text-gray-500">
          Start your onboarding request.
        </p>
        <div className="mt-6 space-y-4">
          <input className="input" placeholder="Company name" />
          <input className="input" placeholder="Work email" />
          <button className="btn btn-primary w-full">Continue to survey</button>
        </div>
      </div>
    </div>
  );
}
