import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { EntryPreview } from "@/lib/content"
import { withBase } from "@/lib/paths"
import { cn } from "@/lib/utils"

type ActiveView = "home" | "library" | "inbox" | "system"

type Props = {
  entries: EntryPreview[]
  selectedHref?: string
  active?: ActiveView
}

const groups = [
  {
    label: "Bibliothek",
    href: withBase("/library/"),
    bucket: "library",
  },
  {
    label: "Inbox",
    href: withBase("/inbox/"),
    bucket: "inbox",
  },
] as const

export default function EntryExplorer({
  entries,
  selectedHref,
  active = "home",
}: Props) {
  return (
    <aside className="flex min-h-0 flex-col gap-5 border-b pb-4 pt-1 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:border-b-0 lg:pb-0 lg:pt-2">
      <div className="flex flex-col gap-1.5">
        <a
          href={withBase("/")}
          className="text-[15px] font-medium tracking-tight text-foreground"
        >
          Diary
        </a>
        <p className="max-w-[15rem] text-xs leading-5 text-muted-foreground">
          Markdown, leise lesbar gemacht.
        </p>
      </div>

      <Separator />

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-5">
          {groups.map((group) => {
            const items = entries.filter((entry) => entry.bucket === group.bucket)

            return (
              <section key={group.label} className="flex flex-col gap-2">
                <a
                  href={group.href}
                  className="text-sm font-semibold text-muted-foreground transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-foreground"
                >
                  {group.label}
                </a>

                <div className="flex flex-col gap-1">
                  {items.map((entry) => {
                    const isSelected = entry.href === selectedHref

                    return (
                      <a
                        key={entry.href}
                        href={entry.href}
                        aria-current={isSelected ? "page" : undefined}
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                            size: "sm",
                          }),
                          "h-auto w-full justify-start whitespace-normal rounded-md px-2.5 py-2 text-left text-[13px] leading-5 transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isSelected &&
                            "border-border bg-muted text-foreground shadow-none",
                          !isSelected &&
                            "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <span className="block text-balance">{entry.title}</span>
                      </a>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>

      <div className="space-y-3">
        <Separator />

        <a
          href={withBase("/system/")}
          aria-current={active === "system" ? "page" : undefined}
          className={cn(
            buttonVariants({
              variant: active === "system" ? "secondary" : "ghost",
              size: "sm",
            }),
            "w-full justify-start rounded-md px-2.5 text-xs transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            active === "system"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          System
        </a>
      </div>
    </aside>
  )
}
