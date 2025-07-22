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
import { CircleAlert, PlusCircle } from "lucide-react";

type FormValues = {
  nom: string;
  prenom: string;
  sexe: string;
  email: string;
  telephone: string;
  adresse: string;
};

const AddMessage = () => {
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

  const [fields, setFields] = useState([
    "Avez-vous des maux de tête ?",
    "Avez-vous des maux de tête ?",
    "Avez-vous des maux de tête ?",
    "Avez-vous des maux de tête ?",
    "Avez-vous des maux de tête ?",
    "Avez-vous des maux de tête ?",
  ]);

  const addField = () => {
    setFields([...fields, ""]);
  };

  const updateField = (index: any, value: any) => {
    const updated = [...fields];
    updated[index] = value;
    setFields(updated);
  };

  return (
    <div className="h-screen p-4">
      <h1
        className="text-xl font-semibold mb-4 cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        ← Nouveau message structuré
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm w-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-lg font-semibold">Messages structurés</h2>
            <CircleAlert className="w-5 h-5 text-gray-500" />
          </div>

          <div className="flex gap-3">
            <button className="bg-primary text-white px-4 py-2 rounded-full">
              Enregistrer
            </button>
            <button className="border px-4 py-2 rounded-full border-gray-300 bg-white hover:bg-gray-50">
              Annuler
            </button>
          </div>
        </div>

        {/* Ajouter un champ */}
        <button
          onClick={addField}
          className="flex items-center gap-2 text-white bg-primary rounded-full px-3 py-1 text-sm"
        >
          <PlusCircle className="w-4 h-4" /> Ajouter
        </button>

        {/* Nom du message structuré */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Nom du message structuré
          </label>
          <input
            type="text"
            defaultValue="Paludisme"
            className="w-full border rounded px-3 py-2 bg-white"
          />
        </div>

        {/* Champs dynamiques */}
        <div className="space-y-4">
          {fields.map((val, index) => (
            <div key={index}>
              <label className="block text-sm font-medium mb-1">
                Champ {index + 1}
              </label>
              <input
                type="text"
                value={val}
                onChange={(e) => updateField(index, e.target.value)}
                className="w-full border rounded px-3 py-2 bg-white"
                placeholder="Ex: Avez-vous des maux de tête ?"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMessage;
