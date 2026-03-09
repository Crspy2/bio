import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { encode } from "qss"
import {
    AnimatePresence,
    motion,
} from "framer-motion"
import { LuExternalLink } from "react-icons/lu"
import { cn } from "@/lib/utils"

type LinkPreviewProps = {
    children: ReactNode
    url: string
    className?: string
    width?: number
    height?: number
    quality?: number
    layout?: string
} & (
    | { isStatic: true, imageSrc: string }
    | { isStatic?: false, imageSrc?: never }
    )

export default function LinkPreview({
                                children,
                                url,
                                className,
                                width = 200,
                                height = 125,
                                isStatic = false,
                                imageSrc = "",
                            }: LinkPreviewProps) {
    let src
    if (!isStatic) {
        const params = encode({
            url,
            screenshot: true,
            meta: false,
            embed: "screenshot.url",
            colorScheme: "dark",
            "viewport.isMobile": true,
            "viewport.deviceScaleFactor": 1,
            "viewport.width": width * 5,
            "viewport.height": height * 5,
        })
        src = `https://api.microlink.io/?${params}`
    } else {
        src = imageSrc
    }

    const [isOpen, setOpen] = useState(false)

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <>
            {isMounted ? (
                <div className="hidden">
                    <img
                        src={src}
                        width={width}
                        height={height}
                        alt="hidden image"
                    />
                </div>
            ) : null}

            <HoverCardPrimitive.Root
                openDelay={50}
                closeDelay={100}
                onOpenChange={(open) => {
                    setOpen(open)
                }}
            >
                <HoverCardPrimitive.Trigger
                    className={cn("group inline-flex items-center gap-1 text-white hover:text-blue-500 font-bold underline decoration-1 hover:decoration-2 underline-offset-2 hover:underline-offset-4 transition-all decoration-white hover:decoration-blue-500", className)}
                    href={url}
                    target="_blank"
                >
                    {children}
                    <LuExternalLink className="inline size-3.5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-blue-500" />
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Content
                    className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
                    side="top"
                    align="center"
                    sideOffset={10}
                >
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                className="shadow-xl rounded-xl"
                            >
                                <a
                                    href={url}
                                    className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                                    style={{ fontSize: 0 }}
                                    target="_blank"
                                >
                                    <img
                                        src={isStatic ? imageSrc : src}
                                        width={width}
                                        height={height}
                                        className="rounded-lg"
                                        alt="preview image"
                                    />
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
        </>
    )
}
