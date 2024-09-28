import {
	RiLoopLeftLine,
	RiSparklingFill,
	RiUpload2Line,
} from "@remixicon/react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Form({
	onSubmit,
}: { onSubmit: (data: FormData) => void }) {
	const [file, setFile] = useState<File | null>();

	return (
		<motion.form
			className="flex flex-col items-center gap-6 w-full"
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(new FormData(e.currentTarget));
			}}
			initial={{ filter: "blur(5px)" }}
			animate={{ filter: "blur(0)", transition: { delay: 0.55 } }}
		>
			<motion.div
				className="w-full"
				initial={{ opacity: 0, scale: 0.8, y: 100 }}
				animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: 0.5 } }}
			>
				<motion.label
					className="p-4 border-2 border-neutral-300 border-dashed rounded-lg cursor-pointer
                    aspect-video w-full flex flex-col gap-2 items-center justify-center"
					whileHover={{ y: -2 }}
					whileTap={{ y: 2 }}
					variants={{
						empty: { borderColor: "" },
					}}
				>
					<input
						type="file"
						name="file"
						className="sr-only"
						onChange={(e) => {
							const newFile = e.target.files?.item(0);
							if (!newFile) return;
							setFile(newFile);
						}}
						accept="video/*"
					/>
					<span className="font-bold text-xs uppercase text-neutral-600">
						{file ? (
							<>
								{file.name}{" "}
								<RiLoopLeftLine className="inline-block h-4 align-text-bottom ml-3" />{" "}
								Заменить
							</>
						) : (
							<>
								<RiUpload2Line className="inline-block h-4 align-text-bottom" />{" "}
								Загрузить видео
							</>
						)}
					</span>
				</motion.label>
			</motion.div>
			<motion.label
				className="flex flex-col gap-1 w-full"
				initial={{ opacity: 0, scale: 0.8, y: -100 }}
				animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: 0.5 } }}
			>
				<span className="font-bold text-xs uppercase text-neutral-600">
					Заголовок видео
				</span>
				<motion.input
					name="title"
					className="outline-none px-4 py-2 border border-neutral-300 rounded-lg focus:ring-4 ring-neutral-100 placeholder-neutral-300"
					whileFocus={{ y: -2 }}
					placeholder="Милые котики рутуб"
				/>
			</motion.label>
			<motion.label
				className="flex flex-col gap-1 w-full"
				initial={{ opacity: 0, scale: 0.8, y: -100 }}
				animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: 0.5 } }}
			>
				<span className="font-bold text-xs uppercase text-neutral-600">
					Описание видео
				</span>
				<motion.textarea
					name="description"
					className="outline-none px-4 py-2 border border-neutral-300 rounded-lg focus:ring-4 ring-neutral-100 placeholder-neutral-300 resize-none h-32"
					whileFocus={{ y: -2 }}
					placeholder={
						"Милые котики только в нашем видео! Тут вы вдоволь насмотритесь на милого кота Бориса, который только..."
					}
				/>
			</motion.label>
			<motion.div
				className="w-full"
				initial={{ opacity: 0, scale: 0.8, y: -250 }}
				animate={{ opacity: 1, scale: 1, y: 0, transition: { delay: 0.5 } }}
			>
				<motion.button
					className="px-6 py-3 bg-neutral-100 border border-neutral-300 outline-none flex gap-1 items-center
                    focus:ring-4 ring-neutral-100 rounded-lg w-full font-medium text-neutral-700 justify-center
                    disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
					whileHover={file ? { y: -2, scale: 1.01 } : undefined}
					whileTap={file ? { y: 2, scale: 0.99 } : undefined}
					disabled={!file}
				>
					<RiSparklingFill size={16} />
					Обработать
				</motion.button>
			</motion.div>
		</motion.form>
	);
}
