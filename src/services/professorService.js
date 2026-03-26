const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function buscarProfessor(id) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`${API_BASE_URL}/professor/${id}`, {
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

export async function cadastrarProfessor(dados) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); 

    try {
        const response = await fetch(`${BASE_URL}/professor/criar`, {
            method: "POST",
            headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dados}),
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

export async function listarProfessores(){
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`${BASE_URL}/professor/listar`, {
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

export async function atualizarProfessor(){}
export async function deletarProfessor(){}
