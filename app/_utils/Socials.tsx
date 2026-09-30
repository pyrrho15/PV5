import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Github01Icon,
  Linkedin02Icon,
  MailAtSign01Icon,
  GoogleDocIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export default function Socials() {
  return (
    <section className="flex items-center gap-3 mt-0 text-neutral-600/90 *:hover:text-neutral-900 *:cursor-pointer transition-transform duration-300 ease-in-out flex-wrap *:hover:scale-110">
      <Tooltip>
        <TooltipTrigger>
            <a href="https://github.com/pyrrho15" target="_blank">
          <HugeiconsIcon icon={Github01Icon} color="currentColor" size={20} />
            </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>GitHub</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
            <a href="https://www.linkedin.com/in/mkg15/" target="_blank">
          <HugeiconsIcon icon={Linkedin02Icon} color="currentColor" size={22} />
            </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>LinkedIn</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <a href="mailto:maheshkumarg1508@gmail.com" target="_blank">
            <HugeiconsIcon icon={MailAtSign01Icon} color="currentColor" size={22} />
          </a>
        </TooltipTrigger>
        <TooltipContent>
          <p>Email</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <HugeiconsIcon icon={GoogleDocIcon} color="currentColor" size={22} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Resume</p>
        </TooltipContent>
      </Tooltip>
    </section>
  )
}