export async function buscarTabelaNotas(idAluno) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`/api/notas/tabelaNotas/${idAluno}`, {
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

export async function cadastrarAluno(dados) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    try {
        const turma = Math.floor(Math.random() * 10) + 1

        const response = await fetch(`/api/aluno/cadastrarAluno`, {
            method: "POST",
            headers: {
                "accept": "*/*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...dados, status: "0", turma }),
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

export async function buscarAlunos() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`${BASE_URL}/aluno/selecionarTodos`, {
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

export async function buscarAluno(id) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`${BASE_URL}/aluno/${id}`, {
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

export async function buscarAlunosComStatus(idprofessor, idserie) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(`${BASE_URL}/aluno/listarAlunosComStatusDaMateria/${idprofessor}/${idserie}`, {
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