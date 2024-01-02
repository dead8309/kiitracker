import Link from "next/link"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import remarkGithub from "remark-github"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DownloadCardProps {
  latest: boolean
  url: string
  version: string
  published_at: string | null
  body: string | null | undefined
  download_url: string
  size: string
}

export const DownloadCard = ({
  body,
  download_url,
  latest,
  published_at,
  size,
  version,
  url,
}: DownloadCardProps) => {
  if (!published_at) return null
  if (!body) return null
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            <Link className="text-primary" href={url}>
              {version}
            </Link>
          </CardTitle>
          {latest && <Badge>Latest</Badge>}
        </div>
        <CardDescription>
          Published: {format(published_at, "MMM dd, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <MD source={body} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Link
          href={download_url}
          className={cn(
            buttonVariants({
              className: "w-full",
            }),
            "font-semibold"
          )}
        >
          Download ({size} mb)
        </Link>
      </CardFooter>
    </Card>
  )
}

interface MDProps {
  source: string
}

const MD = ({ source }: MDProps) => {
  const formatted = source.replace(
    /https:\/\/github\.com\/dead8309\/kiitracker-app\/compare\/([v\d\.]+)/g,
    (result: string, p1: string) => {
      const formatted = p1.replace("...", " ... ")
      return `[${formatted}](https://github.com/dead8309/kiitracker-app/compare/${p1})`
    }
  )
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          [remarkGithub, { repository: "dead8309/kiitracker-app" }],
          remarkBreaks,
        ]}
        components={{
          a: ({ node, ...props }) => (
            <Link
              href={props.href ?? ""}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "px-0"
              )}
            >
              {(props.children as string) ?? ""}
            </Link>
          ),
          h1: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h1
              className={cn(
                "font-heading mt-2 scroll-m-20 text-4xl font-bold",
                className
              )}
              {...props}
            />
          ),
          h2: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h2
              className={cn(
                "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
                className
              )}
              {...props}
            />
          ),
          h3: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h3
              className={cn(
                "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
                className
              )}
              {...props}
            />
          ),
          h4: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h4
              className={cn(
                "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className
              )}
              {...props}
            />
          ),
          h5: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h5
              className={cn(
                "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
                className
              )}
              {...props}
            />
          ),
          h6: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h6
              className={cn(
                "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
                className
              )}
              {...props}
            />
          ),

          p: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLParagraphElement>) => (
            <p
              className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
              {...props}
            />
          ),
          ul: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLUListElement>) => (
            <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
          ),
          ol: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLOListElement>) => (
            <ol
              className={cn("my-6 ml-6 list-decimal", className)}
              {...props}
            />
          ),
          li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
            <li className={cn("mt-2", className)} {...props} />
          ),
          blockquote: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLElement>) => (
            <blockquote
              className={cn("mt-6 border-l-2 pl-6 italic", className)}
              {...props}
            />
          ),
          img: ({
            className,
            alt,
            ...props
          }: React.ImgHTMLAttributes<HTMLImageElement>) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={cn("rounded-md", className)} alt={alt} {...props} />
          ),
          hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
            <hr className="my-4 md:my-8" {...props} />
          ),
          table: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLTableElement>) => (
            <div className="my-6 w-full overflow-y-auto">
              <table className={cn("w-full", className)} {...props} />
            </div>
          ),
          tr: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLTableRowElement>) => (
            <tr
              className={cn("m-0 border-t p-0 even:bg-muted", className)}
              {...props}
            />
          ),
          th: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLTableCellElement>) => (
            <th
              className={cn(
                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                className
              )}
              {...props}
            />
          ),
          td: ({
            className,
            ...props
          }: React.HTMLAttributes<HTMLTableCellElement>) => (
            <td
              className={cn(
                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                className
              )}
              {...props}
            />
          ),
        }}
      >
        {formatted}
      </ReactMarkdown>
    </>
  )
}
