import { Head, Link } from '@inertiajs/react';

const starter = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My first webpage</title>
  </head>
  <body>
    <main>
      <h1>Hello, I'm Maya</h1>
      <p>I'm learning how to build for the web.</p>
      <a href="https://developer.mozilla.org/">Visit the MDN Web Docs</a>
    </main>
  </body>
</html>`;

export default function FirstWebPage() {
    return (
        <>
            <Head title="Lesson 1: Your first webpage" />
            <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
                <article className="mx-auto max-w-3xl space-y-8">
                    <Link href="/" className="text-sm font-medium text-blue-700 underline">
                        ← Back to Belajar
                    </Link>

                    <header className="space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Free lesson preview · 1 of 4</p>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Build your first webpage</h1>
                        <p className="text-lg text-slate-700">
                            Learn how a small set of HTML elements gives a page its title, main heading, introduction, and link.
                        </p>
                    </header>

                    <section aria-labelledby="goal" className="rounded-xl border bg-white p-6">
                        <h2 id="goal" className="text-xl font-semibold">By the end, you can</h2>
                        <p className="mt-2 text-slate-700">Create an HTML file, open it in a browser, and identify its title, heading, paragraph, and link.</p>
                    </section>

                    <section aria-labelledby="steps" className="space-y-3">
                        <h2 id="steps" className="text-xl font-semibold">Try it</h2>
                        <ol className="list-decimal space-y-2 pl-6 text-slate-700">
                            <li>Open a code editor and create a file named <code className="rounded bg-slate-200 px-1">index.html</code>.</li>
                            <li>Copy the example below into the file and save it.</li>
                            <li>Open the file in a browser. Change the name and introduction, save, then refresh the page.</li>
                        </ol>
                        <pre className="overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-slate-100"><code>{starter}</code></pre>
                    </section>

                    <section aria-labelledby="check" className="rounded-xl border bg-white p-6">
                        <h2 id="check" className="text-xl font-semibold">Quick self-check</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700">
                            <li>The browser tab says “My first webpage”.</li>
                            <li>The page shows one main heading and a paragraph.</li>
                            <li>The link opens the MDN Web Docs when selected.</li>
                        </ul>
                    </section>

                    <p className="border-l-4 border-blue-500 bg-blue-50 p-4 text-sm text-slate-700">
                        This is the first lesson preview. The remaining lessons, labs, and full course path are still being prepared.
                    </p>
                </article>
            </main>
        </>
    );
}
