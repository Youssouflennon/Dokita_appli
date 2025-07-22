import React, { useState } from "react";
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
import { CircleAlert, PlusCircle, XCircle } from "lucide-react";

type FormValues = {
  nom: string;
  prenom: string;
  sexe: string;
  email: string;
  telephone: string;
  adresse: string;
};

const AddOrdonnance = () => {
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
      nom: "",
      dosage: "",
      forme: "",
      posologie: "",
      duree: "",
      voie: "",
    },
  ]);

  const ajouterMedicament = () => {
    setMedicaments([
      ...medicaments,
      {
        nom: "",
        dosage: "",
        forme: "",
        posologie: "",
        duree: "",
        voie: "",
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
        ← Nouvelle Ordonnance
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm w-full space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold">Ordonnance</h2>
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
          <PlusCircle className="w-4 h-4" /> Ajouter un médicament
        </button>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nom de l'ordonnance
            </label>
            <input
              type="text"
              placeholder="nom_ordonnance"
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Durée du traitement
            </label>
            <input
              type="text"
              placeholder="duree_traitement"
              className="w-full border rounded px-3 py-2 bg-white"
            />
          </div>

          {/* Liste des médicaments */}
          <div className="space-y-3">
            {medicaments.map((med, index) => (
              <div
                key={index}
                className="grid grid-cols-7 gap-3 bg-blue-50 p-3 rounded items-center"
              >
                <input
                  type="text"
                  placeholder="Médicament"
                  value={med.nom}
                  onChange={(e) =>
                    setMedicaments(
                      medicaments.map((m, i) =>
                        i === index ? { ...m, nom: e.target.value } : m
                      )
                    )
                  }
                  className="col-span-1 border rounded px-2 py-1 bg-white"
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) =>
                    setMedicaments(
                      medicaments.map((m, i) =>
                        i === index ? { ...m, dosage: e.target.value } : m
                      )
                    )
                  }
                  className="col-span-1 border rounded px-2 py-1 bg-white"
                />
                <select
                  value={med.forme}
                  onChange={(e) =>
                    setMedicaments(
                      medicaments.map((m, i) =>
                        i === index ? { ...m, forme: e.target.value } : m
                      )
                    )
                  }
                  className="col-span-1 border rounded px-2 py-1 bg-white"
                >
                  <option>Comprimé</option>
                  <option>Sirop</option>
                  <option>Injection</option>
                </select>
                <input
                  type="text"
                  placeholder="Posologie"
                  value={med.posologie}
                  onChange={(e) =>
                    setMedicaments(
                      medicaments.map((m, i) =>
                        i === index ? { ...m, posologie: e.target.value } : m
                      )
                    )
                  }
                  className="col-span-1 border rounded px-2 py-1 bg-white"
                />
                <input
                  type="text"
                  placeholder="Durée"
                  value={med.duree}
                  onChange={(e) =>
                    setMedicaments(
                      medicaments.map((m, i) =>
                        i === index ? { ...m, duree: e.target.value } : m
                      )
                    )
                  }
                  className="col-span-1 border rounded px-2 py-1 bg-white"
                />
                <input
                  type="text"
                  placeholder="Voie"
                  value={med.voie}
                  onChange={(e) =>
                    setMedicaments(
                      medicaments.map((m, i) =>
                        i === index ? { ...m, voie: e.target.value } : m
                      )
                    )
                  }
                  className="col-span-1 border rounded px-2 py-1 bg-white"
                />

                <button
                  onClick={() => supprimerMedicament(index)}
                  className="text-red-500 hover:text-red-700 bg-white"
                >
                  <XCircle className="w-6 h-6" />
                </button>
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

export default AddOrdonnance;
