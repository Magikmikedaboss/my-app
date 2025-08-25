// ❌ No "use client" here
import ContactForm from "../../components/ContactForm.js"; 
// If you don’t use the @ alias, use: import ContactForm from "../../components/ContactForm.jsx";

export const metadata = { title: "Contact — Mike’s PRO Handyman" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-center sm:py-12">
      <h1 className="text-3xl font-bold text-blue-800 sm:text-4xl">Contact</h1>
      <p className="mt-2 text-gray-700">Tell me about your project and your preferred time.</p>

      <div className="mx-auto mt-4 max-w-2xl text-left">
        <ContactForm /> {/* client component rendered inside server page */}
      </div>

      <p className="mt-6 text-sm text-gray-700">
        Prefer to call? <a href="tel:+1-702-555-1234" className="text-blue-700 underline">(702) 555-1234</a>
      </p>
    </main>
  );
}
