import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-dark sm:text-6xl">
            ✌🏽aloha, I&apos;m sam jeet <span className="text-sm align-text-center font-normal">she/her</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Slinging code by day. Internet gremlin by night. Former full-time stay at home daughter. Very gay.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/blog"
              className="rounded-md bg-primary text-dark px-4 py-2"
            >
              Read My Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
