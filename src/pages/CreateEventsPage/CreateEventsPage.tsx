import React, { useState, type FormEvent} from "react";
import styles from "./CreateEventsPage.module.css";// crie o css como preferir
import NavBarComponent from "../../components/NavBar/NavBarComponent";

export default function CreateEventsPage() {
    const [ title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [Location, setLocation] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [sucess, setSucess] = useState<boolean>(false);

    const hanLeSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSucess(false);

        if (!bannerFile) {
        setError("Você precisa escolher um arquivo de banner.");
        return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location",Location);
        formData.append("price", String(price));
        formData.append("banner", bannerFile);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Usuario nao autenticado.");
            return;
        }

        try {
            
        }
        
    
    
    };


    return {
        <>
        | 
        </>
    };
}