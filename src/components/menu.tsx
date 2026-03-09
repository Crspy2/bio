import { memo, useState } from "react"
import type { Dispatch, ReactNode, SetStateAction } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { SiDiscord, SiGithub, SiTelegram } from "react-icons/si"
import { FiArrowRight } from "react-icons/fi"
import { cn } from "@/lib/utils"

export default function Menu() {
  const [active, setActive] = useState(false)

  return (
    <>
      <HamburgerButton active={active} setActive={setActive} />
      <AnimatePresence>{active && <LinksOverlay setActive={setActive} />}</AnimatePresence>
    </>
  )
}

const LinksOverlay = memo(({
   setActive
 }: {
  setActive: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <nav className="fixed right-4 top-4 z-40 h-[calc(100dvh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden">
      <LinksContainer setActive={setActive} />
      <FooterCTAs />
    </nav>
  )
})

const LinksContainer = memo(({
   setActive
  }: {
  setActive: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <motion.div className="space-y-4 p-12 pl-4 md:pl-20">
      {LINKS.map((l, idx) => {
        return (
          <NavLink key={l.title} href={l.href} idx={idx} onClick={() => setActive(false)}>
            {l.title}
          </NavLink>
        )
      })}
    </motion.div>
  )
})

const NavLink = memo(({
  children,
  href,
  idx,
  onClick,
}: {
  children: ReactNode
  href: string
  idx: number
  onClick?: () => void
}) => {
  return (
    <motion.a
      initial={{ opacity: 0, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.75 + idx * 0.125,
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      exit={{ opacity: 0, y: -8 }}
      href={href}
      onClick={onClick}
      className="block text-5xl font-semibold text-blue-400 transition-colors hover:text-blue-50 md:text-7xl"
    >
      {children}.
    </motion.a>
  )
})

const HamburgerButton = memo(({
  active,
  setActive,
}: {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <>
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        variants={UNDERLAY_VARIANTS}
        style={{ top: 16, right: 16 }}
        className="fixed z-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-lg shadow-blue-800/20"
      />

      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className={cn("group fixed right-4 top-4 z-50 h-20 w-20 bg-white/0 transition-all hover:bg-white/20",
          active ? "rounded-bl-xl rounded-tr-xl" : "rounded-xl"
        )}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block h-1 w-10 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block h-1 w-10 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block h-1 w-5 bg-white"
          style={{ x: "-50%", y: "50%" }}
        />
      </motion.button>
    </>
  )
})

const FooterCTAs = () => {
  return (
    <>
      <div className="absolute bottom-6 left-6 flex gap-4 md:flex-col">
        {SOCIAL_CTAS.map((l, idx) => {
          return (
            <motion.a
              key={idx}
              target="_blank"
              href={l.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1 + idx * 0.125,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              exit={{ opacity: 0, y: -8 }}
            >
              <l.Component className="text-xl 2xl:text-3xl text-white transition-colors hover:text-blue-300" />
            </motion.a>
          )
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.125,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, y: 8 }}
        className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-blue-700 px-3 py-3 text-4xl uppercase text-blue-200 transition-colors hover:bg-white hover:text-blue-600 md:bottom-4 md:right-4 md:px-6 md:text-2xl"
      >
        <a href="mailto:crspy8687@gmail.com" className="hidden md:block">contact me</a> <FiArrowRight />
      </motion.button>
    </>
  )
}

const LINKS = [
  {
    title: "alterasms",
    href: "https://alterasms.io"
  },
]

const SOCIAL_CTAS = [
  {
    Component: SiDiscord,
    href: "https://discord.com/users/1323519785694265356",
  },
  {
    Component: SiGithub,
    href: "https://github.com/crspy2",
  },
  {
    Component: SiTelegram,
    href: "https://t.me/crs_py",
  },
]

const UNDERLAY_VARIANTS = {
  open: {
    width: "calc(100% - 32px)",
    height: "calc(100dvh - 32px)",
    transition: { type: "spring", mass: 3, stiffness: 400, damping: 50 },
  },
  closed: {
    width: "80px",
    height: "80px",
    transition: {
      delay: 0.75,
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  },
} as const

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
}
