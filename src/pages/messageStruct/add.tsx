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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/components/ui/select";

// Type d’un symptôme
type Symptom = {
  nom: string;
  mode: string;
  intensite: string;
  siege: string;
  type: string;
  irradiation: string;
  duree: string;
  rythme: string;
  aggravants: string;
  calmants: string;
  signes: string;
};

// Définition des champs MISTIDRACS
type SymptomField = {
  key: keyof Symptom;
  labelAdmin: string; // Vue admin
  question: string; // Vue patient
  options?: string[]; // Choix possibles
};

const fields: SymptomField[] = [
  {
    key: "nom",
    labelAdmin: "Nom du symptôme principal",
    question: "Quel est le symptôme principal ?",
  },
  {
    key: "mode",
    labelAdmin: "Mode d’apparition (Comment ça a commencé ?)",
    question: "Comment ça a commencé ?",
    options: ["D’un coup", "Petit à petit", "Depuis longtemps"],
  },
  {
    key: "intensite",
    labelAdmin: "Intensité (À quel point c’est fort ?)",
    question: "À quel point c’est fort ?", 
    options: ["Pas fort (1–3)", "Moyennement fort (4–6)", "Très fort (7–10)"],
  },
  {
    key: "siege",
    labelAdmin: "Endroit (Où exactement ?)",
    question: "Où exactement ?",
  },
  {
    key: "type",
    labelAdmin: "Type (Comment vous sentez la douleur ?)",
    question: "Comment vous sentez la douleur ?",
    options: [
      "Comme une brûlure",
      "Comme un serrement",
      "Comme un coup d’aiguille",
      "Comme une lourdeur",
      "Autre",
    ],
  },
  {
    key: "irradiation",
    labelAdmin: "Irradiation (Est-ce que ça se propage ailleurs ?)",
    question: "Est-ce que ça se propage ailleurs ?",
    options: ["Oui → préciser", "Non"],
  },
  {
    key: "duree",
    labelAdmin: "Durée (Depuis combien de temps ?)",
    question: "Depuis combien de temps ça dure ?",
    options: ["Minutes", "Heures", "Jours", "Semaines", "Mois"],
  },
  {
    key: "rythme",
    labelAdmin: "Rythme (Quand apparaît le plus souvent ?)",
    question: "À quel moment ça apparaît le plus souvent ?",
    options: [
      "La journée",
      "La nuit",
      "Quand vous bougez",
      "Au repos",
      "Après avoir mangé",
      "Quand vous êtes fatigué",
    ],
  },
  {
    key: "aggravants",
    labelAdmin: "Aggravants (Qu’est-ce qui rend ça pire ?)",
    question: "Qu’est-ce qui rend ça pire ?",
    options: ["Effort", "Marche", "Position", "Nourriture", "Stress"],
  },
  {
    key: "calmants",
    labelAdmin: "Calmants (Qu’est-ce qui soulage ?)",
    question: "Qu’est-ce qui soulage ?",
    options: ["Repos", "Médicaments", "Massage", "Position particulière"],
  },
  {
    key: "signes",
    labelAdmin: "Signes associés (Autres symptômes observés ?)",
    question: "Avez-vous remarqué d’autres signes en même temps ?",
    options: [
      "Fièvre",
      "Nausées / vomissements",
      "Vertiges",
      "Amaigrissement",
      "Sueurs",
      "Toux",
      "Autre",
    ],
  },
];

const AddMessage = () => {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      nom: "",
      mode: "",
      intensite: "",
      siege: "",
      type: "",
      irradiation: "",
      duree: "",
      rythme: "",
      aggravants: "",
      calmants: "",
      signes: "",
    },
  ]);

  // Ajouter un symptôme
  const addSymptom = () => {
    setSymptoms([
      ...symptoms,
      {
        nom: "",
        mode: "",
        intensite: "",
        siege: "",
        type: "",
        irradiation: "",
        duree: "",
        rythme: "",
        aggravants: "",
        calmants: "",
        signes: "",
      },
    ]);
  };

  // Mise à jour d’un champ
  const updateSymptom = (
    index: number,
    field: keyof Symptom,
    value: string
  ) => {
    const updated = [...symptoms];
    updated[index][field] = value;
    setSymptoms(updated);
  };

  // Générer le résumé médical
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
      {/* En-tête */}
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

      {/* Formulaire */}
      <div className="space-y-6">
        {symptoms.map((sym, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader>
              <CardTitle>Symptôme {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key} className="space-y-1">
                  <Label>{f.labelAdmin}</Label>
                  <p className="text-xs text-gray-500 italic">{f.question}</p>

                  {f.options ? (
                    <Select
                      value={sym[f.key]}
                      onValueChange={(value) =>
                        updateSymptom(index, f.key, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {f.options.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      value={sym[f.key]}
                      onChange={(e) =>
                        updateSymptom(index, f.key, e.target.value)
                      }
                    />
                  )}
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
