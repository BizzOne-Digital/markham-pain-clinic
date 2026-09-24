import SEO from '../components/SEO.jsx'
import { CLINIC_INFO } from '../utils/placeholderData'

export default function TermsConditions() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Read the terms and conditions for using the Markham Pain Clinic website and booking appointments."
        path="/terms-conditions"
      />
      <section className="section-padding bg-white">
        <div className="container-app max-w-3xl">
          <h1 className="section-heading mb-6">Terms &amp; Conditions</h1>
          <p className="text-textSecondary leading-relaxed mb-6">
            Last updated: September 2026
          </p>

          <p className="text-textSecondary leading-relaxed mb-6">
            These Terms and Conditions (&quot;Terms&quot;) govern your use of the Markham Pain Clinic
            website and the booking of appointments through it. By using this website, you agree to
            these Terms.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Use of This Website</h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            This website is provided for general information about our services and to allow you to
            request appointments or contact our clinic. Content on this site is for informational
            purposes only and does not constitute medical advice. It is not a substitute for a
            professional assessment by a qualified practitioner.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Appointments &amp; Cancellations</h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            Appointment requests submitted through this website are not confirmed until acknowledged by
            our clinic staff. We ask that you provide as much notice as possible if you need to
            reschedule or cancel an appointment. Repeated late cancellations or missed appointments may
            be subject to our clinic&apos;s cancellation policy, which will be communicated to you
            directly.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Accuracy of Information</h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            We make reasonable efforts to keep the information on this website accurate and up to date,
            including our services, contact details, and team information. However, we do not guarantee
            that all content is error-free or current at all times.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Intellectual Property</h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            All content on this website, including text, images, and logos, is the property of Markham
            Pain Clinic unless otherwise stated, and may not be copied or reproduced without
            permission.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Limitation of Liability</h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            Markham Pain Clinic is not liable for any damages arising from the use of, or inability to
            use, this website, to the fullest extent permitted by law.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Changes to These Terms</h2>
          <p className="text-textSecondary leading-relaxed mb-6">
            We may update these Terms from time to time. Continued use of this website after changes
            are posted constitutes acceptance of the updated Terms.
          </p>

          <h2 className="font-heading font-bold text-xl text-textMain mb-3">Contact Us</h2>
          <p className="text-textSecondary leading-relaxed">
            For questions about these Terms, please contact us at {CLINIC_INFO.email} or{' '}
            {CLINIC_INFO.phone}.
          </p>
        </div>
      </section>
    </>
  )
}
