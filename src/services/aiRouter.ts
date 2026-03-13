const API = "http://localhost:3333/ask"

export async function perguntarIA(prompt: string) {

    try {

        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        })

        const data = await response.json()

        return data.resposta

    } catch (erro) {

        console.error("Erro ao acessar IA local:", erro)

        return "Erro ao acessar IA"

    }

}
