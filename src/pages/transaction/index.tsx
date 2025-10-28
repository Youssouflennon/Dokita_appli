import { Banknote, ChevronDown, PlusCircle, TrendingUp } from "lucide-react";
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
import Pagination from "../../components/components/ui/pagination";

const Transaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [detailCard, setDetailCard] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const {
    AllTransactions,
    loadingAllTransactions,
    fetchAllTransactions,
    count,
  } = useStoreAllTransactions();

  console.log("AllTransactions", AllTransactions);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchAllTransactions({ page, limit: 6, q: debouncedSearch });
  }, [page, debouncedSearch, fetchAllTransactions]);

  if (loadingAllTransactions) {
    return <TotalLoad />;
  }

  return (
    <div className="flex flex-col gap-3 bg-gray-100 p-6 mt-3  h-screen">
      {/*    <div className="flex justify-end">
        <div className="flex items-center gap-2 bg-primary p-2 rounded-full my-3 cursor-pointer text-white">
          <PlusCircle className="w-4 h-4" /> Ajouter une transaction
        </div>
      </div> */}
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

      <div className="flex items-center justify-between mb-1 border border-gray-200 p-2 bg-white mt-20">
        <div className="relative flex gap-2 ">
          <input
            type="text"
            placeholder="Rechercher"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-1 rounded-md bg-white border border-gray-300 focus:outline-none"
          />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />

          <Popover>
            <PopoverTrigger className="flex bg-gray-100 text-left px-4 py-1 text-sm border rounded-md hover:bg-gray-100 gap-1">
              <img
                src="/iconFil.svg"
                // alt="Avatar"
                className="h-6 w-6 rounded-full"
              />{" "}
              <span>Type abonnement</span>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </PopoverTrigger>
            <PopoverContent className="">
              <div className="p-4 space-y-4">
                {/* Type */}
                <div className="space-y-1">
                  <Select
                    onValueChange={(value) =>
                      fetchAllTransactions({
                        type: value as "RESERVATION" | "ABONNEMENT",
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RESERVATION">RESERVATION</SelectItem>
                      <SelectItem value="ABONNEMENT">ABONNEMENT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger className="flex bg-gray-100 text-left px-4 py-1 text-sm border rounded-md hover:bg-gray-100 gap-1">
              <img
                src="/iconFil.svg"
                // alt="Avatar"
                className="h-6 w-6 rounded-full"
              />{" "}
              <span>Statut</span>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </PopoverTrigger>
            <PopoverContent className="">
              <div className="p-4 space-y-4">
                {/* Type */}
                <div className="space-y-1">
                  <Select
                    onValueChange={(value) =>
                      fetchAllTransactions({
                        status: value as "PENDING" | "PAID" | "CANCELLED",
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionner le statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="PAID">PAID</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>{" "}
        <button
          className="rounded-full text-white bg-primary"
          onClick={() => {
            fetchAllTransactions({ page, limit: 6, q: debouncedSearch });
          }}
        >
          Annuler filtre
        </button>
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
            <TableHead>Médecin</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date de Transaction</TableHead>
            <TableHead>Heure</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {AllTransactions?.map((a, i) =>
            a?.abonnements.map((ab: any, index: number) => (
              <TableRow key={`${i}-${index}`}>
                {/* Checkbox */}
                <TableCell>
                  <CustomCheckbox
                    label=""
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                </TableCell>

                {/* Médecin */}
                <TableCell>
                  {ab.medecin.firstName} {ab.medecin.lastName}
                </TableCell>

                {/* Patient */}
                <TableCell>
                  {ab.patient.firstName} {ab.patient.lastName}
                </TableCell>

                {/* Type */}
                <TableCell>
                  {" "}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
      ${
        a.type === "ABONNEMENT"
          ? "bg-blue-200 text-blue-700"
          : a.type === "RESERVATION"
          ? "bg-yellow-200 text-yellow-700"
          : "bg-gray-200 text-gray-700"
      }`}
                  >
                    {a.type}
                  </span>
                </TableCell>

                {/* Date */}
                <TableCell>
                  {new Date(a.createdAt).toLocaleDateString("fr-FR")}
                </TableCell>

                {/* Heure */}
                <TableCell>
                  {new Date(a.createdAt).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </TableCell>

                {/* Montant */}
                <TableCell className="font-semibold text-gray-700">
                  {Number(a.amount).toLocaleString("fr-FR")} FCFA
                </TableCell>

                {/* Mode */}

                {/* Statut */}
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
      ${
        a.status === "PAID"
          ? "bg-green-200 text-green-700"
          : a.status === "PENDING"
          ? "bg-yellow-200 text-yellow-700"
          : a.status === "CANCELLED"
          ? "bg-red-200 text-red-700"
          : "bg-gray-200 text-gray-700"
      }`}
                  >
                    {a.status}
                  </span>
                </TableCell>

                {/* Actions */}
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
                          }}
                        >
                          <FaEdit className="text-gray-600 text-lg cursor-pointer" />
                          <span className="font-medium text-gray-500 text-sm hover:text-gray-600 transition-colors duration-200">
                            Détail
                          </span>
                        </li>

                        <li
                          className="flex items-center gap-2 p-2 border-b last:border-none"
                          onClick={(event) => {
                            event.stopPropagation();
                            setIsOpen(true);
                          }}
                        >
                          <FaTrash className="text-red-600 text-lg cursor-pointer" />
                          <span className="font-medium text-red-500 text-sm hover:text-red-600 transition-colors duration-200">
                            Supprimer
                          </span>
                        </li>
                      </ul>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter className="bg-white">
          <TableRow>
            <TableCell colSpan={10}>
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
import useStoreAllTransactions from "src/store/transaction.ts/getAll";

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
