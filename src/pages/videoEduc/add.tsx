import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../../components/components/ui/form";
import { FaEllipsisV, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { Input } from "../../components/components/ui/input";
import { Button } from "../../components/components/ui/button";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { CircleAlert, PlusCircle, UploadCloud, XCircle } from "lucide-react";

type FormValues = {
  nom: string;
  prenom: string;
  sexe: string;
  email: string;
  telephone: string;
  adresse: string;
};

const AddVideo = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      nom: "Nana Momo",
      prenom: "Nana",
      sexe: "Masculin",
      email: "user-camer@gmail.com",
      telephone: "+237 690 00 00 00",
      adresse: "Yaoundé, Cameroun",
    },
  });

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [medicaments, setMedicaments] = useState([
    {
      titre: "",
      description: "",
      categorie: "",
      fichier: null,
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null); // ✅ Typage ici
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const ajouterMedicament = () => {
    setMedicaments([
      ...medicaments,
      {
        titre: "",
        description: "",
        categorie: "",
        fichier: null,
      },
    ]);
  };

  const supprimerMedicament = (index: any) => {
    setMedicaments(medicaments.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen p-4">
      <h1
        className="text-xl font-semibold mb-4 cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        ← Nouvelle vidéo
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm w-full space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold">Vidéo educative</h2>
            <CircleAlert className="w-5 h-5 text-gray-500" />
          </div>
          <div className="flex gap-3">
            <button className="bg-primary rounded-full text-white px-4 py-2  hover:bg-blue-900">
              Enregistrer
            </button>
            <button className="border px-4 py-2 bg-gray-200 rounded-full  hover:bg-gray-50">
              Annuler
            </button>
          </div>
        </div>

        <button
          onClick={ajouterMedicament}
          className="flex items-center gap-2  text-white bg-primary rounded-full border  px-3 py-1  "
        >
          <PlusCircle className="w-4 h-4" /> Ajouter une vidéo educative
        </button>

        <div className="space-y-4">
          {/* Liste des médicaments */}
          <div className="space-y-3">
            {medicaments.map((el, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 items-center bg-blue-50 p-4 rounded"
              >
                <input
                  type="text"
                  value={el.titre}
                  placeholder="Titre"
                  className="col-span-1 border rounded px-2 py-1 bg-white"
                />
                <input
                  type="text"
                  value={el.description}
                  placeholder="Description"
                  className="col-span-1 border rounded px-2 py-1 bg-white"
                />
                <input
                  type="text"
                  value={el.categorie}
                  placeholder="Catégorie"
                  className="col-span-1 border rounded px-2 py-1 bg-white"
                />
                <div className="col-span-1 flex items-center justify-between gap-2">
                  <div>
                    {/* Upload container */}
                    <div
                      onClick={() => inputRef.current?.click()}
                      className="flex items-center justify-center border rounded h-10 w-32 bg-white cursor-pointer hover:bg-gray-100 transition"
                    >
                      <UploadCloud className="w-6 h-6 text-gray-500" />
                    </div>

                    {/* Hidden input */}
                    <input
                      type="file"
                      ref={inputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {/* Display file name */}
                    {fileName && (
                      <p className="mt-2 text-sm text-gray-600">
                        Fichier sélectionné: <strong>{fileName}</strong>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => supprimerMedicament(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Commentaire */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Commentaire
            </label>
            <textarea
              defaultValue="Vous devriez bien manger avant de prendre tout médicament que ce soit, Merci"
              className="w-full border rounded px-3 py-2 bg-white"
              rows={3}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
