import { SignupForm } from "./components/auth/SignupForm";

function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-blue-50 to-white">
      <div className="container relative flex min-h-screen items-center justify-center px-4 py-8">
        <div className="absolute inset-0 z-0 bg-grid-black/[0.02] mask-gradient" />
        <div className="w-full max-w-lg rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-2xl shadow-blue-900/5 backdrop-blur-sm transition-all duration-300 sm:p-10">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}

export default App;