import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/components/ui/table";
import { Badge } from "../../components/components/ui/badge";
import { Switch } from "../../components/components/ui/switch";
import { Button } from "../../components/components/ui/button";
import { Checkbox } from "../../components/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import { Input } from "../../components/components/ui/input";
import { CustomCheckbox } from "../../components/components/ui/customcheck";
import { CustomSwitch } from "../../components/components/ui/customswitch";
import React, { useEffect, useState } from "react";
import { FaEdit, FaSearch, FaTrash, FaUser } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import DetailAbonnement from "./detailRendezVous";
import TMModal from "../../components/components/ui/TM_Modal";
import DetailRendez from "./detailRendezVous";
import TotalLoad from "../../components/components/totalLoad";
import { Label } from "../../components/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/components/ui/select";


export default function RendezVous() {
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detailCard, setDetailCard] = useState(false);

  const [adresse, setAdresse] = useState("");
  const [date, setDate] = useState("");
  const [statut, setStatut] = useState("");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simule un chargement pendant 3 secondes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Nettoyage
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <TotalLoad />;
  }

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex justify-end">
        <div className="flex items-center gap-2 bg-primary p-2 rounded-full my-3 cursor-pointer text-white">
          <PlusCircle className="w-4 h-4" /> Ajouter un Rendez-vous
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-lg">Nombre total de rendez_vous</p>

                <p className="text-2xl font-bold">
                  1,822{" "}
                  <span className="text-green-500 text-sm ml-1">+5.2%</span>
                </p>
              </div>

              <Button variant="outline" size="sm">
                <FaUser className="h-5 w-5" />
              </Button>
            </div>{" "}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col  gap-4  p-2">
          <div className="flex items-center justify-between border border-gray-200 p-1 ">
            <p className="text-sm text-muted-foreground">
              +140 ce dernier mois
            </p>

            <Button variant="outline" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/*    <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button> */}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-5 border border-gray-200 p-2 ">
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher"
            className="pl-10 pr-4 py-1 rounded-md bg-white border border-gray-300 focus:outline-none"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>{" "}
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <img
              src="/Iconfleche.svg"
              // alt="Avatar"
              className="h-6 w-6 rounded-full"
            />
          </Button>

          {/*    <Button variant="outline" size="sm">
              <img
                src="/iconFil.svg"
                // alt="Avatar"
                className="h-6 w-6 rounded-full"
              />{" "}
            </Button> */}

          <Popover>
            <PopoverTrigger className=" bg-white text-left px-4 py-1 text-sm  border rounded-md hover:bg-gray-100">
              <img
                src="/iconFil.svg"
                // alt="Avatar"
                className="h-6 w-6 rounded-full"
              />{" "}
            </PopoverTrigger>
            <PopoverContent className="">
            <div className="p-4 space-y-4">
                <h2 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Filtre
                </h2>

                {/* Adresse */}
                <div className="space-y-1">
                  <Label htmlFor="adresse">Adresse</Label>
                  <Select value={adresse} onValueChange={setAdresse}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner une adresse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adresse1">Adresse 1</SelectItem>
                      <SelectItem value="adresse2">Adresse 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    id="date"
                  />
                </div>

                {/* Statut */}
                <div className="space-y-1">
                  <Label htmlFor="statut">Statut</Label>
                  <Select value={statut} onValueChange={setStatut}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valide">Validé</SelectItem>
                      <SelectItem value="en_cours">En cours</SelectItem>
                      <SelectItem value="rejeté">Rejeté</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Boutons */}
                <div className="flex justify-between pt-2 ">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAdresse("");
                      setDate("");
                      setStatut("");
                    }}
                    className="rounded-full"
                  >
                    Réinitialiser
                  </Button>
                  <Button className="bg-[#1d3557] hover:bg-[#16314e] rounded-full text-white">
                    Appliquer
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <CustomCheckbox
                label=""
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </TableHead>
            <TableHead>Nom du Docteur</TableHead>
            <TableHead>Nom du Patient</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Lieu de Rendez-vous</TableHead>
            <TableHead>Date de Rendez-vous</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 6 }).map((_, i) => (
            <TableRow
              key={i}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                // navigate("/detail_patient");
              }}
            >
              <TableCell className="w-12">
                <CustomCheckbox
                  label=""
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              </TableCell>

              {/* Docteur */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://i.pravatar.cc/40?img=3"
                      alt="Avatar"
                    />
                    <AvatarFallback>NM</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Nana Momo</span>
                </div>
              </TableCell>

              {/* Patient */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://i.pravatar.cc/40?img=3"
                      alt="Avatar"
                    />
                    <AvatarFallback>NM</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Nana Momo</span>
                </div>
              </TableCell>

              <TableCell>Nettoyage des dents</TableCell>
              <TableCell>Douala, Cameroun</TableCell>
              <TableCell>01/02/2024</TableCell>

              <TableCell>
                <span className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-medium">
                  Payé
                </span>
              </TableCell>

              <TableCell className="w-12" onClick={(e) => e.stopPropagation()}>
                <Popover>
                  <PopoverTrigger className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
                    <MoreHorizontal className="w-4 h-4" />
                  </PopoverTrigger>
                  <PopoverContent className="p-4 w-40">
                    <ul className="space-y-2">
                      <li
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDetailCard(true);
                        }}
                      >
                        <FaEdit className="text-gray-600" />
                        <span className="text-sm">Détail</span>
                      </li>

                      <li
                        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(true);
                        }}
                      >
                        <FaTrash className="text-red-600" />
                        <span className="text-sm text-red-500">Supprimer</span>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="bg-white">
          <tr>
            <td colSpan={8}>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 border-t pt-4 gap-4">
                <p className="text-sm text-gray-500">Page 1 sur 34</p>

                <div className="flex items-center gap-1 flex-wrap">
                  <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    1
                  </Button>
                  <Button variant="outline" size="icon">
                    2
                  </Button>
                  <Button variant="outline" size="icon">
                    3
                  </Button>
                  <Button variant="outline" size="icon" disabled>
                    …
                  </Button>
                  <Button variant="outline" size="icon">
                    34
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </td>
          </tr>
        </TableFooter>
      </Table>

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl">
              <Dialog.Title className="text-lg font-bold">
                {"admin.confirm_delete"}
              </Dialog.Title>
              <p className="mt-2">{"admin.confirm_delete_message"}</p>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {"admin.cancel"}
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  //  onClick={handleDeleteUser}
                  // disabled={loadingdeleteUsers}
                >
                  {/*  {loadingdeleteUsers ? t("admin.deleting") : t("admin.delete")} */}{" "}
                  supprimer
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>

      <TMModal
        isOpen={detailCard}
        onClose={() => {
          setDetailCard(false);
          // window.location.reload();
        }}
        // title="Detail carte"
        size="md"
        height={70}
      >
        <DetailRendez
        /*   idcartes={idCarte}
          descriptions={descriptions}
          nomCart={nomCart} */
        />
      </TMModal>
    </div>
  );
}
