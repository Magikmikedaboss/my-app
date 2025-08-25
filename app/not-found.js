export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">404 — Page Not Found</h1>
        <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
        <div className="mt-4">
          <a href="/" className="text-blue-700 underline">Go back home</a>
        </div>
      </div>
    </main>
  );
}
