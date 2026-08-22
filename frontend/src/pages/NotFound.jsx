import SEO from '../components/SEO.jsx'
import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for could not be found." />
      <section className="section-padding bg-ivory text-center">
        <div className="container-app max-w-md mx-auto">
          <p className="font-serif text-6xl text-gold mb-4">404</p>
          <h1 className="font-serif text-2xl text-textMain mb-4">Page Not Found</h1>
          <p className="text-textSecondary mb-8">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <Button to="/">BACK TO HOME</Button>
        </div>
      </section>
    </>
  )
}
