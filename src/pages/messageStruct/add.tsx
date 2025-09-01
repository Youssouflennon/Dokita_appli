import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Button } from "../../components/components/ui/button";
import { Input } from "../../components/components/ui/input";
import { Label } from "../../components/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";

type Symptom = {
  nom: string;
  mode: string;
  duree: string;
  intensite: string;
  siege: string;
  type: string;
  irradiation: string;
  rythme: string;
  aggravants: string;
  calmants: string;
  signes: string;
};

const AddMessage = () => {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      nom: "Douleur abdominale",
      mode: "",
      duree: "",
      intensite: "",
      siege: "",
      type: "",
      irradiation: "",
      rythme: "",
      aggravants: "",
      calmants: "",
      signes: "",
    },
  ]);

  // Ajouter un nouveau symptôme
  const addSymptom = () => {
    setSymptoms([
      ...symptoms,
      {
        nom: "",
        mode: "",
        duree: "",
        intensite: "",
        siege: "",
        type: "",
        irradiation: "",
        rythme: "",
        aggravants: "",
        calmants: "",
        signes: "",
      },
    ]);
  };

  // Mettre à jour un champ
  const updateSymptom = (
    index: number,
    field: keyof Symptom,
    value: string
  ) => {
    const updated = [...symptoms];
    updated[index][field] = value;
    setSymptoms(updated);
  };

  // Générer le résumé structuré
  const generateSummary = (): string => {
    if (symptoms.length === 0) return "";

    const main = symptoms[0];
    let summary = `Le patient présente ${main.nom.toLowerCase()} apparue ${
      main.mode
    }, évoluant depuis ${main.duree}, d’intensité ${
      main.intensite
    }, localisée ${main.siege}, ressentie comme ${main.type}, ${
      main.irradiation
    }. Le symptôme est ${main.rythme}, aggravé par ${
      main.aggravants
    } et soulagé par ${main.calmants}.`;

    if (symptoms.length > 1) {
      symptoms.slice(1).forEach((s) => {
        summary += ` Le patient rapporte également ${s.nom.toLowerCase()} ${
          s.duree ? `depuis ${s.duree}` : ""
        }${s.siege ? `, localisée ${s.siege}` : ""}${
          s.type ? `, ressentie comme ${s.type}` : ""
        }.`;
      });
    }

    const allSignes = symptoms.map((s) => s.signes).filter((s) => s);
    if (allSignes.length > 0) {
      summary += ` L’ensemble est accompagné de ${allSignes.join(", ")}.`;
    }

    return summary;
  };

  return (
    <div className="h-screen p-4 space-y-6">
      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={() => navigate(-1)}
      >
        ← Nouveau message structuré
      </h1>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Messages structurés</h2>
        <div className="flex gap-3">
          <Button className="rounded-full px-6 text-white">Enregistrer</Button>
          <Button variant="outline" className="rounded-full px-6">
            Annuler
          </Button>
        </div>
      </div>

      {/* Ajouter un symptôme */}
      <Button
        onClick={addSymptom}
        className="flex items-center gap-2 rounded-full text-white"
      >
        <PlusCircle className="w-4 h-4 " /> Ajouter un symptôme
      </Button>

      {/* Formulaire des symptômes */}
      <div className="space-y-6">
        {symptoms.map((sym, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader>
              <CardTitle>Symptôme {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {Object.keys(sym).map((key) => (
                <div key={key} className="space-y-1">
                  <Label className="capitalize">{key}</Label>
                  <Input
                    value={sym[key as keyof Symptom]}
                    onChange={(e: any) =>
                      updateSymptom(index, key as keyof Symptom, e.target.value)
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Résumé généré */}
      <Card>
        <CardHeader>
          <CardTitle>Résumé généré</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{generateSummary()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMessage;
