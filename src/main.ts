import { perguntarIA } from "./services/aiRouter"

;(window as any).testeIA = async () => {

    const pergunta = prompt("Pergunte algo")

    if (!pergunta) return

    const resposta = await perguntarIA(pergunta)

    alert(resposta)

}
