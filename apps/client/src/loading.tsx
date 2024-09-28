import { motion } from "framer-motion"
import { RiSearchLine } from "@remixicon/react"

export default function Loading() {
    return (
        <motion.div
            className="w-full flex flex-col gap-12 items-center text-center"
            initial={{ filter: "blur(5px)" }}
            animate={{ filter: "blur(0)" }}
        >
            <span className="font-bold text-xs uppercase text-neutral-600">
                <RiSearchLine className="inline-block h-4 align-text-bottom mr-1" />
                Поиск тегов...
            </span>
            <motion.div
                className="border-2 rounded-lg w-full aspect-video relative bg-neutral-50 border-neutral-200"
            >
                <motion.div
                    className="w-0.5 left-1/2 bg-neutral-300 -inset-y-6 ring-2 ring-white absolute rounded-full z-50"
                    animate={{ left: ["10%", "90%", "10%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                />
                <div
                    className="absolute inset-x-0 top-2 flex flex-col gap-2 overflow-hidden w-full items-center py-2 bg-neutral-200">
                    <div className="flex gap-2 items-center">
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="size-2 bg-neutral-50 shrink-0"
                                animate={{ x: [0, 16] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >

                            </motion.div>
                        ))}
                    </div>
                    <div className="flex gap-2 items-center">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="h-16 aspect-video bg-neutral-50 shrink-0"
                                animate={{ x: [0, 120] }}
                                transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                            >

                            </motion.div>
                        ))}
                    </div>
                    <div className="flex gap-2 items-center">
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="size-2 bg-neutral-50 shrink-0"
                                animate={{ x: [0, 16] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            >

                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex gap-1 overflow-hidden w-full items-center h-16 bg-neutral-50">
                    {[...Array(80)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-neutral-200 shrink-0"
                            animate={{ height: [5, 50, 20, 50, 10, 30, 5] }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear", delay: i * 0.1 }}
                        >

                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <div className="flex gap-2 flex-wrap">
                {[8, 6, 4, 6, 7, 5, 8, 9, 6, 4, 10, 7, 8, 7, 7, 8, 9, 5, 6].map((i, j) => (
                    <div
                        key={j}
                        className="rounded bg-neutral-200 animate-pulse h-6 w-16"
                        style={{
                            animationDelay: `${j}00ms`,
                            width: `${i * 10}px`,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    )
}