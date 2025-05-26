export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">About Zarspada</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg mb-6">
          Welcome to Zarspada, a blog dedicated to exploring technology, development, and creative thoughts.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          We aim to share knowledge, insights, and experiences in the world of technology and development.
          Our goal is to create a space where developers and tech enthusiasts can learn, grow, and connect.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">What We Write About</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Web Development</li>
          <li>Programming Languages</li>
          <li>Software Architecture</li>
          <li>Development Tools</li>
          <li>Best Practices</li>
          <li>Tech Industry Insights</li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Get in Touch</h2>
        <p>
          Have questions or want to collaborate? Feel free to reach out to us through our contact page
          or connect with us on social media.
        </p>
      </div>
    </div>
  );
} 