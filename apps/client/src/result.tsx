import { motion } from "framer-motion"
import { RiArrowGoBackFill } from "@remixicon/react"

export default function Result({ tags, onBackNav }: { tags: string[], onBackNav?: () => void }) {
    return (
        <motion.div
            className="flex flex-col gap-3 w-full"
            initial={{ filter: "blur(5px)" }}
            animate={{ filter: "blur(0)" }}
        >
            <span className="font-bold uppercase text-sm text-neutral-600">Определённые теги:</span>
            <motion.div className="flex gap-2 flex-wrap justify-start">
                {tags.map((tag, i) => (
                    <motion.div
                        key={i}
                        className="rounded-lg border bg-neutral-50 py-2 px-6 uppercase font-semibold text-neutral-800 text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                        whileHover={{ scale: 1.03 }}
                    >
                        {tag}
                    </motion.div>
                ))}
            </motion.div>
            <motion.button
                className="font-medium uppercase text-sm text-neutral-400 mt-4 w-fit"
                whileHover={{ y: -3 }}
                whileTap={{ y: 3 }}
                onClick={onBackNav}
            >
                <RiArrowGoBackFill className="inline-block h-4 align-text-bottom" />
                Вернуться назад
            </motion.button>
        </motion.div>
    )
}