import { useState } from "react"
import Form from "./form.tsx"
import Loading from "./loading.tsx"
import Result from "./result.tsx"

function App() {
    const [processing, setProcessing] = useState(false)
    const [results, setResults] = useState<string[] | null>(null)

    return (
        <main className="flex flex-col items-center justify-center w-screen min-h-screen p-4 max-w-2xl mx-auto selection:bg-neutral-100">
            {results
                ? <Result tags={results} onBackNav={() => setResults(null)} />
                : processing
                    ? <Loading />
                    : (
                        <Form onSubmit={async (data) => {
                            setProcessing(true)
                            const res = await fetch(import.meta.env.VITE_ENDPOINT, {
                                method: "POST",
                                body: data,
                                redirect: "follow",
                            }).catch(() => null)
                            if (res?.ok) {
                                setResults(await res.json())
                            } else {
                                alert("Не удалось обработать видео.")
                            }
                            setProcessing(false)
                        }} />
                    )
            }
        </main>
    )
}

export default App
