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
import DetailAbonnement from "./detailAbonnement";
import TMModal from "../../components/components/ui/TM_Modal";
import TotalLoad from "../../components/components/totalLoad";
import { Label } from "../../components/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/components/ui/select";
import useStoreAbonnements from "src/store/abonnement/getAll";
import Pagination from "../../components/components/ui/pagination";

export default function Abonnement() {
  const [isChecked, setIsChecked] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detailCard, setDetailCard] = useState(false);

  const [adresse, setAdresse] = useState("");
  const [date, setDate] = useState("");
  const [statut, setStatut] = useState("");

  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const { Abonnements, loadingAbonnements, fetchAbonnements, count } =
    useStoreAbonnements();

  console.log("Abonnements", Abonnements);

  useEffect(() => {
    fetchAbonnements({ page, limit: 6 });
  }, [page, fetchAbonnements]);

  if (loadingAbonnements) {
    return <TotalLoad />;
  }

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex justify-end">
        <div className="flex bg-primary p-2 rounded-full my-3 items-center gap-2 cursor-pointer text-white">
          <PlusCircle className="w-4 h-4" /> Ajouter un abonnement
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-lg">Nombre total des abonnements</p>

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

      <div className="flex items-center justify-between mb-5 border border-gray-200 p-2 bg-white">
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
            <TableHead>
              <CustomCheckbox
                label=""
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </TableHead>
            <TableHead>Patient ID</TableHead>
            <TableHead>Médecin ID</TableHead>
            <TableHead>Début</TableHead>
            <TableHead>Fin</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Abonnements.map((item) => (
            <TableRow
              key={item.abonnementId}
              // onClick={() => navigate(`/detail/${item.abonnementId}`)}
            >
              {/* Checkbox par ligne */}
              <TableCell>
                <CustomCheckbox
                  label=""
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              </TableCell>

              {/* Données */}
              <TableCell>{item.patientId}</TableCell>
              <TableCell>{item.medecinId}</TableCell>
              <TableCell>
                {new Date(item.debutDate).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell>
                {new Date(item.endDate).toLocaleDateString("fr-FR")}
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                {Number(item.amount).toLocaleString("fr-FR")} FCFA
              </TableCell>

              {/* Status */}
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium 
              ${
                item.status === "CONFIRMED"
                  ? "bg-green-200 text-green-700"
                  : "bg-yellow-200 text-yellow-700"
              }`}
                >
                  {item.status}
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Popover>
                  <PopoverTrigger className="bg-gray-200 text-left px-4 py-1 text-sm border rounded-md hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </PopoverTrigger>
                  <PopoverContent className="p-4 w-full">
                    <ul className="space-y-2 cursor-pointer">
                      <li
                        className="flex items-center gap-2 p-2 border-b last:border-none"
                        onClick={() => setDetailCard(true)}
                      >
                        <FaEdit className="text-gray-600 text-lg" />
                        <span className="font-medium text-gray-500 text-sm hover:text-gray-600">
                          Détail
                        </span>
                      </li>
                      <li
                        className="flex items-center gap-2 p-2 border-b last:border-none"
                        onClick={() => setIsOpen(true)}
                      >
                        <FaTrash className="text-red-600 text-lg" />
                        <span className="font-medium text-red-500 text-sm hover:text-red-600">
                          Supprimer
                        </span>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-white">
          <TableRow>
            <TableCell colSpan={7}>
              <div className="flex justify-center my-4">
                <Pagination
                  pages={Math.ceil((count || 1) / 7)}
                  currentPage={page}
                  onPageChange={setPage}
                  rangeLimit={5}
                />
              </div>
            </TableCell>
          </TableRow>
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
        <DetailAbonnement
        /*   idcartes={idCarte}
          descriptions={descriptions}
          nomCart={nomCart} */
        />
      </TMModal>
    </div>
  );
}
