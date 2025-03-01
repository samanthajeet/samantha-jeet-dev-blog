import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-center text-dark inline-block relative">
            <span className="relative z-10">✌🏽aloha, I&apos;m <span className="font-permanent-marker text-5xl">sam jeet</span> <span className="text-sm font-normal">she/her</span></span>
            <span
              className={`absolute -inset-x-8 inset-y-0 block skew-y-1 -z-10 ${['bg-primary/20', 'bg-secondary/20', 'bg-tertiary/20', 'bg-retroBlue/20'][Math.floor(Math.random() * 4)]
                }`}
              aria-hidden="true"
            ></span>
          </h1>
          <div className="text-sm mt-2 leading-8 text-dark" >
            <p>
              👩🏽‍💻 Crafting React & Rails magic by day.
            </p>
            <p>
              🌙 Internet gremlin by night.
            </p>
            <p>
              🌟 Championing diversity in tech with purpose and humor.
            </p>
            <p>
              ✈️ Collecting travel stories worth blogging about.
            </p>
            <p>
              🏠 Former full-time stay at home daughter.
            </p>
            <p>
              🌈 Very gay, very intentional.
            </p>
          </div>
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
