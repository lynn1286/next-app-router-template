import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-geist-sans grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-geist-mono list-inside list-decimal text-center text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{' '}
            <code className="font-geist-mono rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-600 sm:h-12 sm:w-auto sm:px-5 sm:text-base"
            href="/flow"
          >
            流程图示例
          </Link>
          <Link
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-600 sm:h-12 sm:w-auto sm:px-5 sm:text-base"
            href="/https-examples"
          >
            HTTP请求封装示例
          </Link>

          <a
            className="bg-foreground text-background flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm font-medium transition-colors hover:bg-[#383838] sm:h-12 sm:w-auto sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="flex h-10 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:w-auto sm:px-5 sm:text-base md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>

        {/* Zustand 示例链接 */}
        <div className="mt-8 w-full">
          <h2 className="mb-6 text-center text-2xl font-bold">
            Zustand 状态管理示例 (按 Next.js 最佳实践)
          </h2>
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <Link
              href="/zustand"
              className="rounded-lg bg-blue-500 px-6 py-3 text-center text-white transition-colors hover:bg-blue-600"
            >
              基础 Zustand 示例
            </Link>
          </div>
          <p className="mt-4 text-center text-sm text-gray-500">
            这些示例展示了如何在 Next.js 中按照最佳实践集成 Zustand
            进行状态管理，避免全局状态共享问题
          </p>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
