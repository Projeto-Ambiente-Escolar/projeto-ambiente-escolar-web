const CLOUD_NAME = "dqhcuoc8b"
const UPLOAD_PRESET = "fotos_aluno"

export async function uploadFotoCloudinary(base64) {
    if (!base64) return null

    // Monta o FormData com o Base64
    const formData = new FormData()
    formData.append("file", `data:image/jpeg;base64,${base64}`)
    formData.append("upload_preset", UPLOAD_PRESET)

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    )

    if (!response.ok) {
        throw new Error("Erro ao fazer upload da foto.")
    }

    const data = await response.json()
    return data.secure_url // retorna a URL pública da imagem
}
