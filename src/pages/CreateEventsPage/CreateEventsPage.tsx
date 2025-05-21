import React, { use, useState, type FormEvent } from "react";
import Styles from "./CreateEventsPage.module.css"; // crie o CSS como preferir
import NavBarComponent from "../../components/NavBar/NavBarComponent";

export default function CreateEventsPage(){
   const [title, setTitle] = useState("");
   const [description, setDescripition] = useState("");
   const [location, setLocation] = useState("");
   const [price, setPrice] = useState<number>(0);
   const [bannerFile, setBannerFile] = useState<File | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState<boolean>(false);
   
   const handleSubimit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null)
    setSuccess(false);

    if(!bannerFile) {
        setError("Você precisa escolher um arquivo de banner.");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("descriptio", description);
    formData.append("location", location);
    formData.append("price", String(price));
    formData.append("banner", bannerFile);

    const token = localStorage.getItem("token");
    if (!token) {
        setError("Usuário não autenticado.");
        return;
    }

    try {
        const res = await fetch(
        'https://senac-eventos-cultural-backend-production.up.railway.app/auth/events',
        {
            method:"POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
        );

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || `Erro ${res.status}`);
        }
        
        setSuccess(true);
        setTitle("");
        setDescripition("");
        setLocation("");
        setPrice(0);
        setBannerFile(null);
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message: String(err);
        setError(msg);

    }
   };
   
    return (
        <>
            <NavBarComponent />
            <div>
                <h1>Criar Eventos</h1>
                {error && <div>{error}</div>}
                {success && (
                    <div>Evento criado com sucesso!</div>
                )}

                <form onSubmit={handleSubimit}>
                    
                </form>
            </div>
        </>
    )
}