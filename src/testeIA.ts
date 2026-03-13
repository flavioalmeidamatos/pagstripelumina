import { perguntarIA } from "./services/aiRouter"

async function testar() {

    const resposta = await perguntarIA("Explique o que é PIX")

    console.log(resposta)

}

testar()
