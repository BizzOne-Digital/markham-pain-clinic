import SEO from '../components/SEO.jsx'
import { CLINIC_INFO } from '../utils/placeholderData'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read how Markham Pain Clinic collects, uses, and protects your personal and health information."
        path="/privacy-policy"
      />
      <section className="section-padding bg-white">
        <div className="container-app max-w-3xl">
          <h1 className="section-heading mb-6">Privacy Policy</h1>
          <p className="text-textSecondary leading-relaxed mb-6">
            Last updated: September 2026
          </p>

          <p className="text-textSecondary leading-relaxed mb-6">
            Markham Pain Clinic (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to
            protecting the privacy and confidentiality of the personal and personal health information
            we collect. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our clinical services, in accordance with
            Ontario&apos;s Personal Health Information Protection Act (PHIPA) and applicable Canadian
            privacy laws.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Information We Collect</h2>
          <p className="text-textSecondary leading-relaxed mb-2">We may collect the following information:</p>
          <ul className="list-disc pl-5 text-textSecondary leading-relaxed mb-6 space-y-1">
            <li>Contact details such as your name, phone number, and email address submitted through our contact or appointment forms.</li>
            <li>Personal health information you provide during consultations, assessments, and treatment, including medical history and insurance details.</li>
            <li>Website usage information such as pages visited, collected automatically through standard analytics tools.</li>
          </ul>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">How We Use Your Information</h2>
          <ul className="list-disc pl-5 text-textSecondary leading-relaxed mb-6 space-y-1">
            <li>To respond to appointment requests and enquiries submitted through this website.</li>
            <li>To provide, coordinate, and follow up on your clinical care.</li>
            <li>To process insurance claims and direct billing where applicable.</li>
            <li>To communicate appointment reminders, clinic updates, or requested information.</li>
            <li>To meet legal, regulatory, and professional record-keeping obligations.</li>
          </ul>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">How We Protect Your Information</h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            We maintain reasonable administrative, technical, and physical safeguards to protect your
            personal and health information against unauthorized access, disclosure, alteration, or
            loss. Access to your health records is limited to authorized clinic staff and practitioners
            directly involved in your care.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Disclosure of Information</h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            We do not sell or rent your personal information. We may share information with your
            insurance provider for billing purposes, with other healthcare providers involved in your
            care with your consent, or where required by law.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Your Rights</h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            You have the right to access, request corrections to, or ask questions about the personal
            and health information we hold about you. To make a request, please contact us using the
            details below.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Contact Us</h2>
          <p className="text-textSecondary leading-relaxed">
            If you have questions about this Privacy Policy or how your information is handled, please
            contact us at {CLINIC_INFO.email} or {CLINIC_INFO.phone}.
          </p>
        </div>
      </section>
    </>
  )
}
