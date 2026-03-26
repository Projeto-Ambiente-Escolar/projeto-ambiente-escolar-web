const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function buscarRecados(id) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`${API_BASE_URL}/recado/listarPorAluno/${id}`, {
            method: "GET",
            headers: {
                "accept": "*/*",
            },
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

export async function criarRecado(dados) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`${API_BASE_URL}/recado/criarRecado`, {
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