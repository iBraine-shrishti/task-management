import Logo from "../../components/brand/Logo";
export default function Login() {
  return (
    <div className="grid min-h-screen place-items-center bg-gray-50 p-6">
      <div className="card w-full max-w-md p-8">
        <Logo />
        <h1 className="mt-10 text-2xl font-extrabold">Welcome back</h1>
        <p className="mt-1 text-sm text-gray-500">
          Sign in to your iBraine workspace.
        </p>
        <div className="mt-6 space-y-4">
          <input className="input" placeholder="Email address" />
          <input className="input" placeholder="Password" type="password" />
          <button className="btn btn-primary w-full">Sign in</button>
        </div>
      </div>
    </div>
  );
}
