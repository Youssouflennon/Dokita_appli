import { Banknote, PlusCircle, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/components/ui/popover";
import { Button } from "../../components/components/ui/button";
import { FaEdit, FaSearch, FaTrash, FaUser } from "react-icons/fa";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/components/ui/avatar";
import { CustomCheckbox } from "../../components/components/ui/customcheck";
import TMModal from "../../components/components/ui/TM_Modal";
import { Dialog, Transition } from "@headlessui/react";
import TotalLoad from "../../components/components/totalLoad";
import { Label } from "../../components/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/components/ui/select";
import { Input } from "../../components/components/ui/input";

const Transaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [detailCard, setDetailCard] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [adresse, setAdresse] = useState("");
  const [date, setDate] = useState("");
  const [statut, setStatut] = useState("");

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
    <div className="flex flex-col gap-3 bg-gray-100 p-6 mt-3  h-screen">
      <div className="flex justify-end">
        <div className="flex items-center gap-2 bg-primary p-2 rounded-full my-3 cursor-pointer text-white">
          <PlusCircle className="w-4 h-4" /> Ajouter une transaction
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Nombres de Transactions"
          amount="1.500"
          percentage="+43%"
          icon={<TrendingUp className="w-5 h-5 text-white" />}
        />

        <StatCard
          title="Montant Total"
          amount="1.500.700 XAF"
          percentage="+43%"
          icon={<TrendingUp className="w-5 h-5 text-white" />}
        />

        <StatCard
          title="Autre Details"
          amount="0000"
          percentage="+43%"
          icon={<TrendingUp className="w-5 h-5 text-white" />}
        />

        <StatCard
          title="Autres Details"
          amount="0000"
          percentage="+43%"
          icon={<TrendingUp className="w-5 h-5 text-white" />}
        />
      </div>

      <div className="flex items-center justify-between mb-1 border border-gray-200 p-2 bg-white">
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
              />{" "}
            </TableHead>
            <TableHead>Identification</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date de Transaction</TableHead>
            <TableHead>Heure</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 6 }).map((_, i) => (
            <TableRow
              key={i}
              //  className="cursor-pointer"
              onClick={() => {
                //  navigate("/detail_patient");
              }}
            >
              <TableCell>
                <CustomCheckbox
                  label=""
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />{" "}
              </TableCell>
              <TableCell className="flex items-center gap-2">6sd541c</TableCell>
              <TableCell className="text-blue-600 ">Nana Momo </TableCell>
              <TableCell>Rendez vous</TableCell>
              <TableCell>01/02/2024</TableCell>
              <TableCell>20:50 (GMT +1)</TableCell>
              <TableCell>1 000.000 FCFA</TableCell>
              <TableCell>Orange Money</TableCell>

              <TableCell className="bg-green-200 text-green-600 rounded-full p-2 inline-block">
                * Payé
              </TableCell>

              <TableCell onClick={(e) => e.stopPropagation()}>
                <Popover>
                  <PopoverTrigger className=" bg-gray-200 text-left px-4 py-1 text-sm  border rounded-md hover:bg-gray-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </PopoverTrigger>
                  <PopoverContent className="p-4 w-full">
                    <ul className="space-y-2 cursor-pointer">
                      <li
                        className="flex items-center gap-2 p-2 border-b last:border-none"
                        onClick={(event) => {
                          event.stopPropagation();
                          setDetailCard(true);

                          //  handleRowClick(item.id);
                        }}
                        // navigate(0);
                      >
                        <FaEdit
                          className="text-gray-600 text-lg cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            setDetailCard(true);

                            //  handleRowClick(item.id);
                          }}
                        />
                        <span className="font-medium text-gray-500 text-sm hover:text-gray-600 transition-colors duration-200">
                          Detail
                        </span>
                      </li>

                      <li
                        className="flex items-center gap-2 p-2 border-b last:border-none"
                        onClick={(event) => {
                          event.stopPropagation();

                          // setSelectedUser(item.id);
                          setIsOpen(true);
                        }}
                        // navigate(0);
                      >
                        <FaTrash className="text-red-600 text-lg cursor-pointer" />
                        <span className="font-medium text-red-500 text-sm hover:text-red-600 transition-colors duration-200">
                          supprimer
                        </span>
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-white">
          <tr>
            <td colSpan={8}>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4 border-t border-gray-200 pt-4 gap-4">
                {/* Infos de page */}
                <p className="text-sm text-muted-foreground">Page 1 sur 34</p>

                {/* Pagination */}
                <div className="flex items-center gap-1 flex-wrap">
                  {/* Précédent */}
                  <Button variant="outline" size="lg" disabled>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  {/* Pages */}
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

                  {/* Suivant */}
                  <Button variant="outline" size="lg">
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
        <DetailTrans
        /*   idcartes={idCarte}
          descriptions={descriptions}
          nomCart={nomCart} */
        />
      </TMModal>
    </div>
  );
};

export default Transaction;

import { ReactNode } from "react";
import DetailTrans from "./detailTrans";

interface StatCardProps {
  title: string;
  amount: string;
  percentage: string;
  icon: ReactNode;
  bgColor?: string; // facultatif : bg-primary par défaut
}

function StatCard({
  title,
  amount,
  percentage,
  icon,
  bgColor = "bg-primary",
}: StatCardProps) {
  return (
    <div
      className={`flex flex-col ${bgColor} text-white p-4 rounded-lg shadow-sm border`}
    >
      <div className="flex justify-between items-center">
        <p className="text-md">{title}</p>

        <span className="flex items-center gap-2">
          {icon}
          <span>{percentage}</span>
        </span>
      </div>

      <p className="text-xl font-bold text-white mt-3">{amount}</p>
    </div>
  );
}
