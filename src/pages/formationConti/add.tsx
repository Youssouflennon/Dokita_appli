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
import { Label } from "../../components/components/ui/label";
import { Textarea } from "../../components/components/ui/textarea";
import { Badge } from "../../components/components/ui/badge";
import { CircleAlert, PlusCircle, UploadCloud, X, XCircle } from "lucide-react";

type FormValues = {
  nom: string;
  prenom: string;
  sexe: string;
  email: string;
  telephone: string;
  adresse: string;
};

const AddFormation = () => {
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

  const [elements, setElements] = useState([
    {
      titre: "",
      description: "",
      categorie: "",
      fichier: null,
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null); // ✅ Typage ici
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const [competences, setCompetences] = useState([
    "Injection",
    "pansement",
    "Injection",
    "Injection",
  ]);
  const [nouvelleCompetence, setNouvelleCompetence] = useState("");

  const ajouterElement = () => {
    setElements([
      ...elements,
      { titre: "", description: "", categorie: "", fichier: null },
    ]);
  };

  const supprimerElement = (index: any) => {
    setElements(elements.filter((_, i) => i !== index));
  };

  const ajouterCompetence = (e: any) => {
    e.preventDefault();
    if (nouvelleCompetence.trim() !== "") {
      setCompetences([...competences, nouvelleCompetence]);
      setNouvelleCompetence("");
    }
  };

  return (
    <div className="h-screen p-4">
      <h1
        className="text-xl font-semibold mb-4 cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        ← Nouvelle formation
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm w-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold">Formation </h2>{" "}
            <CircleAlert className="w-5 h-5 text-gray-500" />
          </div>

          <div className="flex gap-3">
            <button className="bg-primary text-white px-4 py-2 rounded-full ">
              Enregistrer
            </button>
            <button className="border px-4 py-2 rounded-full bg-white border-gray-300 hover:bg-gray-50">
              Annuler
            </button>
          </div>
        </div>

        {/* Bouton ajouter */}
        <button
          onClick={ajouterElement}
          className="flex items-center gap-2 text-white bg-primary rounded-full px-3 py-1 text-sm"
        >
          <PlusCircle className="w-4 h-4" /> Ajouter un Élément
        </button>

        {/* Infos générales */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nom de la formation
            </label>
            <input
              type="text"
              defaultValue="Expert en traitement du paludisme"
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Catégorie</label>
            <input
              type="text"
              defaultValue="Nutrition"
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>

          {/* Compétences */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Compétences
            </label>
            <form onSubmit={ajouterCompetence} className="mb-2">
              <input
                type="text"
                value={nouvelleCompetence}
                onChange={(e) => setNouvelleCompetence(e.target.value)}
                placeholder="Ajouter une compétence"
                className="w-full border rounded px-3 py-2 bg-white"
              />
            </form>
            <div className="flex flex-wrap gap-2">
              {competences.map((comp, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Liste des éléments */}
        <div className="space-y-3">
          {elements.map((el, index) => (
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
                  onClick={() => supprimerElement(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium mb-1">Note</label>
          <textarea
            defaultValue="Vous devriez bien manger avant de prendre tout médicament que ce soit, Merci"
            className="w-full border rounded px-3 py-2 bg-white"
            rows={3}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddFormation;
