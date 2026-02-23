const BASE_URL = "https://api-ambiente-escolar-sql-1.onrender.com";

export async function cadastrarAluno(dados) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
        const response = await fetch(`${BASE_URL}/aluno/cadastrarAluno`, {
            method: "POST",
            headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, ...data };
        }

        return data;
    } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === "AbortError") {
            throw { status: 408, message: "Servidor demorou para responder. Tente novamente." };
        }
        throw err;
    }
}
